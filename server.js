const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const dataDir = path.join(root, "_data");
const storeFile = path.join(dataDir, "records.json");
const backupDir = path.join(dataDir, "backups");
const MAX_BODY = 80 * 1024 * 1024;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

function ensureStore() {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.mkdirSync(backupDir, { recursive: true });
  } catch (error) {}
}

function emptyStore() {
  return { records: [], deleted: {}, updatedAt: "" };
}

function readStore() {
  try {
    const parsed = JSON.parse(fs.readFileSync(storeFile, "utf8"));
    if (!parsed || typeof parsed !== "object") return emptyStore();
    return {
      records: Array.isArray(parsed.records) ? parsed.records : [],
      deleted: parsed.deleted && typeof parsed.deleted === "object" ? parsed.deleted : {},
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : ""
    };
  } catch (error) {
    return emptyStore();
  }
}

function stampOf(record) {
  const value = record && record.createdAt ? new Date(record.createdAt).getTime() : 0;
  return isNaN(value) ? 0 : value;
}

function dailyBackup() {
  try {
    const day = new Date().toISOString().slice(0, 10);
    const target = path.join(backupDir, "records-" + day + ".json");
    if (!fs.existsSync(target) && fs.existsSync(storeFile)) { fs.copyFileSync(storeFile, target); }
    const files = fs.readdirSync(backupDir).filter(function (name) { return /^records-\d{4}-\d{2}-\d{2}\.json$/.test(name); }).sort();
    while (files.length > 60) { fs.unlinkSync(path.join(backupDir, files.shift())); }
  } catch (error) {}
}

function writeStore(store) {
  ensureStore();
  const temp = storeFile + ".tmp";
  fs.writeFileSync(temp, JSON.stringify(store, null, 2), "utf8");
  fs.renameSync(temp, storeFile);
  dailyBackup();
}

function mergeStores(base, incoming) {
  const byId = new Map();
  const put = function (record) {
    if (!record || typeof record !== "object" || !record.id) return;
    const current = byId.get(record.id);
    if (!current || stampOf(record) >= stampOf(current)) byId.set(record.id, record);
  };
  (base.records || []).forEach(put);
  (incoming.records || []).forEach(put);
  const deleted = Object.assign({}, base.deleted || {}, incoming.deleted || {});
  Object.keys(deleted).forEach(function (id) {
    const record = byId.get(id);
    if (!record) return;
    const when = new Date(deleted[id]).getTime();
    if (!isNaN(when) && stampOf(record) <= when) byId.delete(id);
  });
  return { records: Array.from(byId.values()), deleted: deleted, updatedAt: new Date().toISOString() };
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*" });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(function (request, response) {
  if (request.method === "OPTIONS") { response.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "content-type, authorization", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }); response.end(); return; }
const requestPath = decodeURIComponent(String(request.url || "/").split("?")[0]);

  if (requestPath === "/api/records" || requestPath === "/api/records/") {
    if (request.method === "GET") { sendJson(response, 200, readStore()); return; }
    if (request.method === "POST") {
      let body = "";
      let size = 0;
      request.on("data", function (chunk) {
        size += chunk.length;
        if (size > MAX_BODY) { request.destroy(); return; }
        body += chunk;
      });
      request.on("end", function () {
        let incoming = null;
        try { incoming = JSON.parse(body || "{}"); } catch (error) { sendJson(response, 400, { error: "invalid json" }); return; }
        const merged = mergeStores(readStore(), incoming && typeof incoming === "object" ? incoming : {});
        writeStore(merged);
        sendJson(response, 200, merged);
      });
      return;
    }
    sendJson(response, 405, { error: "method not allowed" });
    return;
  }

  if (requestPath === "/api/ai/config" || requestPath === "/api/ai/config/") {
    if (request.method === "GET") { sendJson(response, 200, publicAiConfig()); return; }
    if (request.method === "POST") {
      readBody(request, function (body) {
        let incoming = null;
        try { incoming = JSON.parse(body || "{}"); } catch (error) { sendJson(response, 400, { error: "invalid json" }); return; }
        const cfg = readAiConfig();
        if (typeof incoming.base === "string" && incoming.base.trim()) cfg.base = incoming.base.trim();
        if (typeof incoming.model === "string" && incoming.model.trim()) cfg.model = incoming.model.trim();
        if (typeof incoming.scope === "string" && incoming.scope.trim()) cfg.scope = incoming.scope.trim();
        if (typeof incoming.key === "string" && incoming.key.trim()) cfg.key = incoming.key.trim();
        if (incoming.clearKey) cfg.key = "";
        writeAiConfig(cfg);
        sendJson(response, 200, publicAiConfig());
      });
      return;
    }
    sendJson(response, 405, { error: "method not allowed" });
    return;
  }

  if (requestPath === "/api/ai" || requestPath === "/api/ai/") {
    if (request.method !== "POST") { sendJson(response, 405, { error: "method not allowed" }); return; }
    readBody(request, function (body) {
      let incoming = null;
      try { incoming = JSON.parse(body || "{}"); } catch (error) { sendJson(response, 400, { error: "invalid json" }); return; }
      const cfg = readAiConfig();
      if (!cfg.key) { sendJson(response, 200, { ok: false, status: 0, error: "尚未保存 API Key" }); return; }
      const payload = { model: cfg.model || "deepseek-chat", temperature: 0, messages: Array.isArray(incoming.messages) ? incoming.messages : [{ role: "user", content: String(incoming.text || "") }] };
      payload.messages.push({ role: "system", content: "补充要求：1) 去掉汉字之间、汉字与数字之间被 OCR 插入的多余空格（如“右 眼 结 膜”→“右眼结膜”，“Vod 0. 1”→“Vod 0.1”）；2) 删除软件界面上的按钮与标签等杂字（同步病历内容、操作记录、审签记录、刷新、VTE、生命体征、检查报告、机器名、本机IP、版本号）；3) 不要解释、不要代码块，只输出正文。" });
      aiRequest(cfg.base, cfg.key, payload, function (status, text) {
        let content = String(text || "");
        let rawText = content;
        let ok = status >= 200 && status < 300;
        let errText = "";
        try {
          const parsed = JSON.parse(content);
          if (parsed && parsed.choices && parsed.choices[0] && parsed.choices[0].message && typeof parsed.choices[0].message.content === "string") {
            content = parsed.choices[0].message.content;
          } else if (parsed && parsed.error && parsed.error.message) {
            errText = String(parsed.error.message);
          }
        } catch (error) {}
        if (!ok && !errText) { errText = rawText.slice(0, 300); }
        sendJson(response, 200, { ok: ok && !errText, status: status, content: ok ? content : "", error: errText });
      });
    });
    return;
  }
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const firstSegment = relativePath.split("/")[0];
  const filePath = path.resolve(root, relativePath);

  if (firstSegment === "_data" || firstSegment.charAt(0) === "." || (!filePath.startsWith(root + path.sep) && filePath !== path.join(root, "index.html"))) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, function (error, data) {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    response.writeHead(200, { "Content-Type": types[path.extname(filePath).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(data);
  });
});

server.listen(port, "0.0.0.0", function () {
  console.log("案例册 running at http://127.0.0.1:" + port + " (LAN ok, data in _data/records.json)");
});
/* ---- AI 配置与本机代理（Key 只存在这台电脑的 _data/ai-config.json） ---- */
function readBody(request, done) {
  let body = ""; let size = 0;
  request.on("data", function (chunk) { size += chunk.length; if (size > MAX_BODY) { request.destroy(); return; } body += chunk; });
  request.on("end", function () { done(body); });
}
function aiConfigFile() { ensureStore(); return path.join(dataDir, "ai-config.json"); }
function readAiConfig() {
  try {
    const parsed = JSON.parse(fs.readFileSync(aiConfigFile(), "utf8"));
    if (parsed && typeof parsed === "object") {
      return { base: String(parsed.base || "https://api.deepseek.com/v1/chat/completions"), model: String(parsed.model || "deepseek-chat"), scope: String(parsed.scope || "correct_full"), key: String(parsed.key || "") };
    }
  } catch (error) {}
  return { base: "https://api.deepseek.com/v1/chat/completions", model: "deepseek-chat", scope: "correct_full", key: "" };
}
function writeAiConfig(cfg) {
  ensureStore();
  const temp = aiConfigFile() + ".tmp";
  fs.writeFileSync(temp, JSON.stringify(cfg, null, 2), "utf8");
  fs.renameSync(temp, aiConfigFile());
}
function publicAiConfig() {
  const cfg = readAiConfig();
  return { configured: !!cfg.key, base: cfg.base, model: cfg.model, scope: cfg.scope, keyTail: cfg.key ? cfg.key.slice(-4) : "" };
}
function aiRequest(base, key, payload, done) {
  let target = null;
  try { target = new URL(base); } catch (error) { done(0, "API 地址不正确"); return; }
  const lib = target.protocol === "http:" ? require("http") : require("https");
  const data = JSON.stringify(payload);
  const options = {
    method: "POST",
    hostname: target.hostname,
    port: target.port || (target.protocol === "http:" ? 80 : 443),
    path: (target.pathname || "/") + (target.search || ""),
    headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data), Authorization: "Bearer " + key }
  };
  const request = lib.request(options, function (response) {
    let text = "";
    response.on("data", function (chunk) { text += chunk; });
    response.on("end", function () { done(response.statusCode || 0, text); });
  });
  request.setTimeout(90000, function () { try { request.destroy(); } catch (error) {} done(0, "请求超时"); });
  request.on("error", function (error) { done(0, String((error && error.message) || error)); });
  request.write(data);
  request.end();
}