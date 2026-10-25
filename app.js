const STORAGE_KEY = "vision-logbook-v1";
const NOTE_KEY = "vision-logbook-note-v1";
const EXAM_LAST_KEY = "vision-logbook-exam-last-v1";
const EXAM_RECENT_KEY = "vision-logbook-exam-recent-v1";

const ORG = "广东省人民医院眼科";

const seedRecords = [
  {id:"r-001",date:"2026-10-18",type:"住院",status:"已完成",patientNo:"样例-0001",name:"示例患者甲",gender:"女",age:68,eye:"OU 双眼",diagnosis:"年龄相关性白内障",chiefComplaint:"双眼视物模糊半年，右眼较重。",exams:["视力","眼压","裂隙灯","眼底"],examDetails:"OD 0.3 / OS 0.5，矫正视力 OD 0.5 / OS 0.8；眼压 14 / 15 mmHg。双眼晶状体核性混浊。",treatment:"手术治疗",surgeryName:"超声乳化白内障吸除 + IOL 植入术",surgeryDate:"2026-10-19",anesthesia:"局麻",role:"助手",postop:"术后第 1 天，角膜轻度水肿，前房清，眼压正常。",followupDate:"2026-10-26",readmission:"否",notes:"术前宣教完整，术后按时点眼。",tags:["手术","教学"]},
  {id:"r-002",date:"2026-10-16",type:"门诊",status:"待复诊",patientNo:"样例-0002",name:"示例患者乙",gender:"男",age:57,eye:"OS 左眼",diagnosis:"原发性开角型青光眼",chiefComplaint:"左眼视物模糊，偶有眼胀。",exams:["眼压","视野","OCT"],examDetails:"OS 眼压 24 mmHg；视野 MD -8.42 dB，弓形缺损；RNFL 变薄。",treatment:"药物治疗",surgeryName:"",surgeryDate:"",anesthesia:"未记录",role:"未记录",postop:"",followupDate:"2026-11-02",readmission:"未记录",notes:"调整为前列腺素类滴眼液，观察眼压反应。",tags:["随访"]},
  {id:"r-003",date:"2026-10-11",type:"急诊",status:"已完成",patientNo:"样例-0003",name:"示例患者丙",gender:"女",age:34,eye:"OD 右眼",diagnosis:"角膜异物",chiefComplaint:"右眼异物感、流泪 4 小时，工作时飞入金属屑。",exams:["视力","裂隙灯"],examDetails:"OD 裸眼视力 0.8，角膜 7 点位见浅层金属异物，前房清。",treatment:"其他",surgeryName:"裂隙灯下角膜异物取出",surgeryDate:"2026-10-11",anesthesia:"表面麻醉",role:"主刀",postop:"取出顺利，予抗生素滴眼液，次日复查。",followupDate:"2026-10-12",readmission:"否",notes:"已完成破伤风相关询问。",tags:["急诊","外伤"]},
  {id:"r-004",date:"2026-09-29",type:"住院",status:"已完成",patientNo:"样例-0004",name:"示例患者丁",gender:"男",age:62,eye:"OD 右眼",diagnosis:"孔源性视网膜脱离",chiefComplaint:"右眼视野缺损伴闪光感 3 天。",exams:["视力","眼底","超声/UBM"],examDetails:"OD 视力 0.05，颞下方视网膜脱离累及黄斑，裂孔位于 11 点。",treatment:"手术治疗",surgeryName:"玻璃体切割 + 眼内气体填充",surgeryDate:"2026-09-30",anesthesia:"全麻",role:"助手",postop:"术后第 7 天视网膜复位，眼压 16 mmHg，继续俯卧位。",followupDate:"2026-10-21",readmission:"否",notes:"已向患者说明体位及气体注意事项。",tags:["手术","典型病例"]},
  {id:"r-005",date:"2026-09-18",type:"门诊",status:"已完成",patientNo:"样例-0005",name:"示例患者戊",gender:"女",age:45,eye:"OU 双眼",diagnosis:"糖尿病视网膜病变",chiefComplaint:"糖尿病 8 年，复查眼底。",exams:["视力","眼底","OCT"],examDetails:"双眼散在微血管瘤及点状出血，黄斑 OCT 未见明显水肿。",treatment:"观察",surgeryName:"",surgeryDate:"",anesthesia:"未记录",role:"未记录",postop:"",followupDate:"2026-12-18",readmission:"未记录",notes:"建议控制血糖，半年复查眼底及 OCT。",tags:["慢病"]},
  {id:"r-006",date:"2026-08-27",type:"住院",status:"已完成",patientNo:"样例-0006",name:"示例患者己",gender:"男",age:71,eye:"OS 左眼",diagnosis:"黄斑前膜",chiefComplaint:"左眼视物变形、视力下降半年。",exams:["视力","眼底","OCT"],examDetails:"OS 视力 0.25，OCT 示黄斑前膜伴中心凹结构紊乱。",treatment:"手术治疗",surgeryName:"玻璃体切割 + 黄斑前膜剥除",surgeryDate:"2026-08-28",anesthesia:"局麻",role:"观摩",postop:"术后 1 月视物变形减轻，视力 0.4，黄斑结构逐步恢复。",followupDate:"2026-11-28",readmission:"否",notes:"术中剥膜过程值得复盘。",tags:["手术","教学"]}
];

const titles = {
  dashboard: ["总览", "病例总览", "把每次接诊留下来，之后还能按诊断和日期回看。"],
  timeline: ["病例时间线", "病例时间线", "按就诊日期浏览门诊、急诊、住院与随访记录。"],
  diagnosis: ["诊断索引", "诊断索引", "按诊断聚合病例，快速回看同类疾病的临床路径。"],
  surgery: ["手术与随访", "手术与随访", "手术参与、术后恢复和下次复诊放在同一个视图。"],

};

const TYPE_CLASS = { "门诊": "outpatient", "急诊": "emergency", "住院": "inpatient", "随访": "followup" };

const SEGMENTS = [
  { key: "lid", label: "眼睑泪器", options: ["正常", "睑内翻", "睑外翻", "倒睫", "上睑下垂", "眼睑红肿", "泪道冲洗通畅", "泪道阻塞"] },
  { key: "conj", label: "结膜", options: ["正常", "轻度充血", "混合充血", "结膜下出血", "滤泡增生", "乳头增生", "翼状胬肉"] },
  { key: "cornea", label: "角膜", options: ["透明", "上皮缺损", "角膜水肿", "角膜混浊", "角膜瘢痕", "角膜溃疡", "KP(+)"] },
  { key: "ac", label: "前房", options: ["深浅正常，房闪(-)", "浅前房", "房闪(+)", "前房积血", "前房积脓", "纤维素性渗出"] },
  { key: "iris", label: "虹膜瞳孔", options: ["瞳孔圆，对光反射存在", "瞳孔散大", "瞳孔后粘连", "虹膜新生血管", "瞳孔区机化膜"] },
  { key: "lens", label: "晶状体", options: ["皮质、核透明，位置正", "皮质性混浊", "核性混浊", "后囊下混浊", "人工晶体位正", "晶体半脱位"] },
  { key: "vitreous", label: "玻璃体", options: ["透明", "玻璃体混浊", "玻璃体积血", "玻璃体后脱离", "增殖膜"] },
  { key: "fundus", label: "眼底", options: ["视网膜平伏，黄斑中心凹反光存在", "黄斑水肿", "视网膜脱离", "视网膜出血", "硬性渗出", "视盘边界清、色淡红", "视盘水肿", "C/D 扩大", "RNFL 变薄"] }
];

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

let records = readRecords();
let currentView = "dashboard";
let timelineFilter = "全部";
let dateFilter = "";
let yearFilter = "全部";
let selectedDetailId = "";
let noteTimer;
let toastTimer;
let examState = emptyExam();

function emptyExam() {
  return { vision: { od: "", os: "", corrOd: "", corrOs: "" }, refraction: { od: "", os: "" }, iop: { od: "", os: "" }, segments: {}, extra: "" };
}
function cloneExam(state) { return JSON.parse(JSON.stringify(state || emptyExam())); }

function readRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : seedRecords;
  } catch (error) { return seedRecords; }
}
function saveRecords() { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
function readJson(key, fallback) {
  try {
    const raw = JSON.parse(localStorage.getItem(key));
    return raw == null ? fallback : raw;
  } catch (error) { return fallback; }
}
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* 本机存储不可用时忽略 */ }
}

function escapeHtml(value) {
  return String(value == null ? "" : value).replace(/[&<>'"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c];
  });
}
function formatDate(value, long) {
  if (!value) return "未记录";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", long ? { year: "numeric", month: "long", day: "numeric" } : { month: "2-digit", day: "2-digit" }).format(d);
}
function dateValue(value) { return value ? new Date(value + "T00:00:00").getTime() : 0; }
function eyeLabel(value) { const v = String(value == null ? "" : value).trim(); return v ? v.replace(/\s*(右眼|左眼|双眼)$/, "") : "未明确"; }
function monthLabel(value) {
  if (!value) return "未记录日期";
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return "未记录日期";
  return d.getFullYear() + "年" + (d.getMonth() + 1) + "月";
}
function isSurgery(r) { return r.treatmentType ? r.treatmentType === "手术治疗" : Boolean(r.surgeryName || r.treatment === "手术治疗"); }
function todayIso() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
}

/* ---------------- 专科查体快捷录入 ---------------- */

function renderSegments() {
  $("#examSegments").innerHTML = SEGMENTS.map(function (group) {
    const picked = examState.segments[group.key] || [];
    const chips = group.options.map(function (option) {
      const on = picked.indexOf(option) >= 0 ? " active" : "";
      return '<button type="button" class="chip' + on + '" data-seg="' + group.key + '" data-val="' + escapeHtml(option) + '">' + escapeHtml(option) + "</button>";
    }).join("");
    return '<div class="seg-group"><span class="seg-label">' + group.label + '</span><div class="seg-chips">' + chips + "</div></div>";
  }).join("");
}

function renderExamRecent() {
  const recents = readJson(EXAM_RECENT_KEY, []);
  const box = $("#examRecent");
  if (!Array.isArray(recents) || !recents.length) { box.innerHTML = ""; return; }
  box.innerHTML = recents.map(function (text) {
    return '<button type="button" class="chip" data-recent="' + escapeHtml(text) + '">＋ ' + escapeHtml(text) + "</button>";
  }).join("");
}

function renderExamInputs() {
  $("#examVisionOd").value = examState.vision.od;
  $("#examVisionOs").value = examState.vision.os;
  $("#examVisionCorrOd").value = examState.vision.corrOd;
  $("#examVisionCorrOs").value = examState.vision.corrOs;
  $("#examIopOd").value = examState.iop.od;
  $("#examRefractionOd").value = (examState.refraction || {}).od || "";
  $("#examRefractionOs").value = (examState.refraction || {}).os || "";
  $("#examIopOs").value = examState.iop.os;
}

function collectExamInputs() {
  examState.vision = {
    od: $("#examVisionOd").value.trim(),
    os: $("#examVisionOs").value.trim(),
    corrOd: $("#examVisionCorrOd").value.trim(),
    corrOs: $("#examVisionCorrOs").value.trim()
  };
  examState.refraction = { od: $("#examRefractionOd").value.trim(), os: $("#examRefractionOs").value.trim() };
  examState.iop = { od: $("#examIopOd").value.trim(), os: $("#examIopOs").value.trim() };
  examState.extra = $("#examDetails").value.trim();
}

function eyePrefix() {
  const eye = $("#recordEye").value;
  if (eye === "OD 右眼") return "右眼 ";
  if (eye === "OS 左眼") return "左眼 ";
  return "";
}
function joinPair(a, b) {
  if (a && b) return "OD " + a + " / OS " + b;
  if (a) return "OD " + a;
  if (b) return "OS " + b;
  return "";
}

function composeExamText() {
  const parts = [];
  const vision = joinPair(examState.vision.od, examState.vision.os);
  if (vision) parts.push("裸眼视力 " + vision);
  const corrected = joinPair(examState.vision.corrOd, examState.vision.corrOs);
  if (corrected) parts.push("矫正视力 " + corrected);
  const refraction = joinPair((examState.refraction || {}).od, (examState.refraction || {}).os);
  if (refraction) parts.push("验光 " + refraction);
  const iop = joinPair(examState.iop.od, examState.iop.os);
  if (iop) parts.push("眼压 " + iop + " mmHg");
  const prefix = "";
  SEGMENTS.forEach(function (group) {
    const picked = examState.segments[group.key] || [];
    if (picked.length) parts.push(prefix + group.label + "：" + picked.join("、"));
  });
  if (examState.extra) parts.push(examState.extra);
  return parts.join("；");
}

function loadExamFromRecord(record) {
  const quick = record && record.examQuick;
  if (quick && typeof quick === "object") {
    examState = emptyExam();
    examState.vision = Object.assign(examState.vision, quick.vision || {});
    examState.iop = Object.assign(examState.iop, quick.iop || {});
    examState.refraction = Object.assign(emptyExam().refraction, quick.refraction || {});
    examState.segments = cloneExam({ segments: quick.segments || {} }).segments;
    examState.extra = quick.extra || "";
  } else {
    examState = emptyExam();
    examState.extra = record ? (record.examDetails || "") : "";
  }
  renderExamInputs();
  renderSegments();
  $("#examDetails").value = examState.extra;
}

function applyExamNormal() {
  collectExamInputs();
  SEGMENTS.forEach(function (group) { examState.segments[group.key] = [group.options[0]]; });
  renderSegments();
  toast("已按常规查体填入，可按需修改");
}

function applyLastExam() {
  const last = readJson(EXAM_LAST_KEY, null);
  if (!last || typeof last !== "object") { toast("还没有可套用的查体记录"); return; }
  collectExamInputs();
  examState.vision = Object.assign(emptyExam().vision, last.vision || {});
  examState.iop = Object.assign(emptyExam().iop, last.iop || {});
  examState.refraction = Object.assign(emptyExam().refraction, last.refraction || {});
  examState.segments = cloneExam({ segments: last.segments || {} }).segments;
  renderExamInputs();
  renderSegments();
  toast("已套用上次查体");
}

function clearExam() {
  examState = emptyExam();
  renderExamInputs();
  renderSegments();
  $("#examDetails").value = "";
  toast("已清空查体内容");
}

function rememberExam() {
  writeJson(EXAM_LAST_KEY, { vision: examState.vision, refraction: examState.refraction, iop: examState.iop, segments: examState.segments });
  const extra = (examState.extra || "").trim();
  if (extra) {
    const recents = readJson(EXAM_RECENT_KEY, []);
    const list = Array.isArray(recents) ? recents.filter(function (t) { return t !== extra; }) : [];
    list.unshift(extra);
    writeJson(EXAM_RECENT_KEY, list.slice(0, 6));
  }
}

/* ---------------- 列表与检索 ---------------- */

function getFilteredRecords(type, sort) {
  type = type || timelineFilter;
  sort = sort || "latest";
  const query = $("#globalSearch").value.trim().toLowerCase();
  const list = records.filter(function (r) {
    const haystack = [r.name, r.patientNo, r.diagnosis, r.notes, r.chiefComplaint, r.pastHistory, r.surgeryName, r.examDetails, r.auxExam, r.postopExam, r.surgeon, r.attendingDoctor, r.generalAdmission, r.generalAfter, (r.secondaryDiagnoses || []).join(" ")].concat(r.tags || []).join(" ").toLowerCase();
    const typeMatch = type === "全部" || r.type === type || (type === "随访" && r.followupDate) || (type === "疑难" && Boolean(r.difficult));
    const dateMatch = !dateFilter || r.date === dateFilter;
    return typeMatch && dateMatch && (!query || haystack.indexOf(query) >= 0);
  });
  list.sort(function (a, b) {
    if (sort === "name") return String(a.name || "").localeCompare(String(b.name || ""), "zh-CN");
    return sort === "oldest" ? dateValue(a.date) - dateValue(b.date) : dateValue(b.date) - dateValue(a.date);
  });
  return list;
}

function setView(view) {
  currentView = view;
  const meta = titles[view] || titles.dashboard;
  $("#viewEyebrow").textContent = meta[0] + " · " + ORG;
  $("#pageTitle").textContent = meta[1];
  if ($("#pageSubtitle")) $("#pageSubtitle").textContent = meta[2];
  $$(".nav-item").forEach(function (b) { b.classList.toggle("active", b.dataset.view === view); });
  $("#dashboardView").classList.toggle("hidden", view !== "dashboard");
  $("#timelineView").classList.toggle("hidden", view !== "timeline");
  $("#diagnosisView").classList.toggle("hidden", view !== "diagnosis");
  $("#surgeryView").classList.toggle("hidden", view !== "surgery");

  renderAll();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function doctorTone(name) {
  const key = String(name || "").trim();
  if (!key) return 0;
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 10007;
  return hash % 6;
}
function doctorChip(label, toneName) {
  return '<span class="record-doctor doc-c' + doctorTone(toneName || label) + '">' + escapeHtml(label) + "</span>";
}
function recordRow(r) {
  const statusClass = r.status === "待复诊" ? "pending" : r.status === "进行中" ? "progress" : "";
  const typeClass = TYPE_CLASS[r.type] || "outpatient";
  const surgery = isSurgery(r) ? '<span class="badge-surgery">手术</span>' : '<span class="badge-conservative">保守</span>';
  const attending = String(r.attendingDoctor || "").trim();
  const leadSurgeon = String(r.surgeon || "").trim();
  const doctorParts = [];
  if (attending && leadSurgeon && attending !== leadSurgeon) {
    doctorParts.push(doctorChip(attending, attending));
    doctorParts.push(doctorChip("主刀：" + leadSurgeon, leadSurgeon));
  } else if (attending) doctorParts.push(doctorChip(attending, attending));
  else if (leadSurgeon) doctorParts.push(doctorChip(leadSurgeon, leadSurgeon));
  const doctorLine = doctorParts.length ? '<span class="record-doctors">' + doctorParts.join("") + "</span>" : "";

  const difficult = r.difficult ? '<span class="badge-difficult">疑难</span>' : "";
  return '<button class="record-row type-accent-' + typeClass + '" type="button" data-open-record="' + escapeHtml(r.id) + '">' +
    '<span class="record-date">' + formatDate(r.date) + '</span>' +
    '<span class="record-main"><span class="record-title"><span class="type-badge type-' + typeClass + '">' + escapeHtml(r.type) + '</span><strong>' + escapeHtml(r.name) + '</strong></span>' +
    '<span class="record-sub"><span>' + escapeHtml(r.diagnosis || "未记录诊断") + '</span><span>·</span><span>' + escapeHtml(r.patientNo || "无病案号") + "</span>" + doctorLine + '</span></span>' +
    '<span class="record-side">' + difficult + '<span class="eye-badge">' + escapeHtml(eyeLabel(r.eye)) + "</span>" + surgery +
    '<span class="status-badge ' + statusClass + '">' + escapeHtml(r.status || "已完成") + "</span></span></button>";
}

function emptyState(title, msg) {
  return '<div class="empty-state"><strong>' + title + "</strong><span>" + (msg || "还没有符合条件的记录") + '</span><br><button class="text-btn" data-open-new type="button">新增一条记录 →</button></div>';
}

function diagnosisSummary() {
  const groups = new Map();
  records.forEach(function (r) {
    const name = r.diagnosis || "未分类诊断";
    if (!groups.has(name)) groups.set(name, { name: name, records: [], patients: new Set(), recent: 0 });
    const g = groups.get(name);
    g.records.push(r);
    g.patients.add(r.patientNo || r.name);
    g.recent = Math.max(g.recent, dateValue(r.date));
  });
  return Array.from(groups.values());
}

/* ---------------- 渲染 ---------------- */

function renderMetrics() {
  $("#metricPatients").textContent = new Set(records.map(function (r) { return r.patientNo || r.name; })).size;
  $("#metricRecords").textContent = records.length;
  $("#metricSurgeries").textContent = records.filter(isSurgery).length;
  const pendingFollowups = followupBuckets().pending;
  const today = new Date();
  const end = new Date(today.getTime() + 30 * 86400000);
  const start = new Date(today.toDateString());
  const soonCount = pendingFollowups.filter(function (r) {
    if (!r.followupDate) return false;
    const d = new Date(r.followupDate + "T00:00:00");
    return d >= start && d <= end;
  }).length;
  $("#metricFollowups").textContent = pendingFollowups.length;
  $("#metricFollowupCaption").textContent = pendingFollowups.length ? (soonCount ? "30 天内 " + soonCount + " 人 · 点开看名单" : "待随访 · 点开看名单") : "暂无待随访";
  $("#allCount").textContent = records.length;
}

function renderDashboard() {
  const _recentAll = getFilteredRecords("全部"); _recentAll.sort(function (a, b) { return createdValue(b.createdAt) - createdValue(a.createdAt); }); const recent = _recentAll.slice(0, 6);
  $("#recentList").innerHTML = recent.length ? recent.map(recordRow).join("") : emptyState("暂时没有病例", "先新增一条病例记录");
  const groups = diagnosisSummary().sort(function (a, b) { return b.records.length - a.records.length; }).slice(0, 5);
  $("#diagnosisMini").innerHTML = groups.length
    ? groups.map(function (g) { return '<div class="diagnosis-mini-row"><strong>' + escapeHtml(g.name) + "</strong><span>" + g.records.length + " 例</span></div>"; }).join("")
    : emptyState("暂无诊断");
}

function renderTimeline() {
  const list = getFilteredRecords(timelineFilter, $("#sortSelect").value);
  if (!list.length) {
    $("#timelineList").innerHTML = emptyState("没有匹配病例", "可以尝试清空搜索或切换分类");
  } else {
    const groups = new Map();
    list.forEach(function (r) {
      const k = monthLabel(r.date);
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(r);
    });
    $("#timelineList").innerHTML = Array.from(groups.entries()).map(function (entry) {
      return '<div class="timeline-month"><div class="month-label">' + entry[0] + '</div><div class="timeline-stack">' + entry[1].map(recordRow).join("") + "</div></div>";
    }).join("");
  }
  $$("[data-type-filter]").forEach(function (b) { b.classList.toggle("active", b.dataset.typeFilter === timelineFilter); });
  const keyword = $("#globalSearch").value.trim();
  if ($("#allCount")) $("#allCount").textContent = keyword && timelineFilter === "全部" ? list.length : records.length;
}

function renderDiagnosis() {
  let groups = diagnosisSummary();
  const q = $("#globalSearch").value.trim().toLowerCase();
  if (q) {
    groups = groups.filter(function (g) {
      return g.name.toLowerCase().indexOf(q) >= 0 || g.records.some(function (r) { return String(r.name || "").toLowerCase().indexOf(q) >= 0; });
    });
  }
  const sort = $("#diagnosisSort").value;
  if (sort === "recent") groups.sort(function (a, b) { return b.recent - a.recent; });
  else if (sort === "alpha") groups.sort(function (a, b) { return a.name.localeCompare(b.name, "zh-CN"); });
  else groups.sort(function (a, b) { return b.records.length - a.records.length; });
  $("#diagnosisGrid").innerHTML = groups.length
    ? groups.map(function (g) {
        return '<button class="diagnosis-card" data-diagnosis="' + escapeHtml(g.name) + '" type="button">' +
          '<span class="diagnosis-card-top"><span><span class="section-kicker">诊断</span><h3>' + escapeHtml(g.name) + '</h3></span><strong class="diagnosis-card-count">' + g.records.length + "</strong></span>" +
          '<span class="diagnosis-card-bottom"><span><b>' + g.patients.size + "</b> 位患者</span><span><b>" + g.records.filter(isSurgery).length + "</b> 例手术</span><span>" + formatDate(new Date(g.recent).toISOString().slice(0, 10)) + "</span></span></button>";
      }).join("")
    : emptyState("暂无诊断索引", "病例保存后会自动归类");
}

function patientKeyOf(r) {
  return String(r.name || "").trim() + "|" + String(r.patientNo || "").trim();
}
function followupHint(value) {
  if (!value) return "待安排";
  const days = Math.round((dateValue(value) - dateValue(todayIso())) / 86400000);
  const label = formatDate(value);
  if (days === 0) return label + " · 今天";
  if (days > 0) return label + " · 还有 " + days + " 天";
  return label + " · 已逾期 " + Math.abs(days) + " 天";
}
function followupPendingCard(r) {
  return '<div class="followup-row"><button class="followup-item is-pending" data-open-record="' + escapeHtml(r.id) + '" type="button"><span class="followup-top"><strong>' + escapeHtml(r.name) + " · " + escapeHtml(r.diagnosis || "未记录诊断") + '</strong><span class="followup-date">' + escapeHtml(followupHint(r.followupDate)) + '</span></span><span class="followup-meta">' + escapeHtml(eyeLabel(r.eye)) + " · " + escapeHtml(r.surgeryName || r.treatment || "随访") + '</span><span class="followup-result">' + escapeHtml(r.postop || "尚未补充术后恢复") + '</span></button><button class="followup-action" data-quick-followup="' + escapeHtml(r.id) + '" type="button">记录随访</button></div>';
}
function followupBuckets() {
  const todayVal = dateValue(todayIso());
  const groups = new Map();
  records.forEach(function (r) {
    if (!(r.type === "随访" || r.followupDate || r.postop || r.status === "待复诊")) return;
    const key = patientKeyOf(r);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  });
  const pending = [];
  const done = [];
  groups.forEach(function (list) {
    let followupRecord = null;
    let upcomingCase = null;
    let doneCase = null;
    let looseCase = null;
    list.forEach(function (r) {
      if (r.type === "随访") {
        if (!followupRecord || dateValue(r.date) > dateValue(followupRecord.date)) followupRecord = r;
        return;
      }
      if (r.followupDate && dateValue(r.followupDate) >= todayVal) {
        if (!upcomingCase || dateValue(r.followupDate) < dateValue(upcomingCase.followupDate)) upcomingCase = r;
        return;
      }
      if (r.postop) {
        if (!doneCase || dateValue(r.date) > dateValue(doneCase.date)) doneCase = r;
        return;
      }
      if (!looseCase || dateValue(r.followupDate || r.date) < dateValue(looseCase.followupDate || looseCase.date)) looseCase = r;
    });
    const followupUpcoming = followupRecord && followupRecord.followupDate && dateValue(followupRecord.followupDate) >= todayVal ? followupRecord : null;
    if (followupUpcoming) pending.push(followupUpcoming);
    else if (followupRecord) done.push(followupRecord);
    else if (upcomingCase) pending.push(upcomingCase);
    else if (doneCase) done.push(doneCase);
    else if (looseCase) pending.push(looseCase);
  });
  pending.sort(function (a, b) { return dateValue(a.followupDate || a.date) - dateValue(b.followupDate || b.date); });
  done.sort(function (a, b) { return dateValue(b.date) - dateValue(a.date); });
  return { pending: pending, done: done };
}
function renderSurgery() {
  const surgeries = records.filter(isSurgery).sort(function (a, b) { return dateValue(b.surgeryDate || b.date) - dateValue(a.surgeryDate || a.date); });
  const buckets = followupBuckets();
  const pendingList = buckets.pending;
  const doneList = buckets.done;
  $("#surgeryCountLabel").textContent = surgeries.length + " 例";
  $("#followupCountLabel").textContent = doneList.length + " 人";
  if ($("#pendingFollowupCountLabel")) $("#pendingFollowupCountLabel").textContent = pendingList.length + " 人";
  $("#surgeryList").innerHTML = surgeries.length ? surgeries.map(recordRow).join("") : emptyState("还没有手术病例");
  if ($("#pendingFollowupList")) $("#pendingFollowupList").innerHTML = pendingList.length
    ? pendingList.map(followupPendingCard).join("")
    : emptyState("没有待随访病人", "录入病例时填写「下次随访」日期，随访后就自动移到下面的随访记录");
  $("#followupList").innerHTML = doneList.length
    ? doneList.map(function (r) {
        return '<button class="followup-item" data-open-record="' + escapeHtml(r.id) + '" type="button"><span class="followup-top"><strong>' + escapeHtml(r.name) + " · " + escapeHtml(r.diagnosis) + '</strong><span class="followup-date">' + (r.followupDate ? formatDate(r.followupDate) : formatDate(r.date)) + '</span></span><span class="followup-meta">' + escapeHtml(eyeLabel(r.eye)) + " · " + escapeHtml(r.surgeryName || r.treatment || "随访") + '</span><span class="followup-result">' + escapeHtml(r.postop || "尚未补充术后恢复") + "</span></button>";
      }).join("")
    : emptyState("还没有已完成的随访");
}

function renderDateFilterChip() {
  const chip = $("#dateFilterChip");
  if (!chip) return;
  chip.classList.toggle("hidden", !dateFilter);
  chip.textContent = dateFilter ? formatDate(dateFilter, true) + "  ×" : "日期";
}
function weekdayLabel(value) {
  const d = new Date(value + "T00:00:00");
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("zh-CN", { weekday: "short" }).format(d);
}
function renderDateIndex() {
  const box = $("#dateIndexList");
  if (!box) return;
  const list = getFilteredRecords("全部").filter(function (r) { return r.date; });
  const years = Array.from(new Set(list.map(function (r) { return r.date.slice(0, 4); }))).sort().reverse();
  $("#yearTabs").innerHTML = ['<button class="filter-tab' + (yearFilter === "全部" ? " active" : "") + '" data-year="全部" type="button">全部年份</button>']
    .concat(years.map(function (y) { return '<button class="filter-tab' + (yearFilter === y ? " active" : "") + '" data-year="' + y + '" type="button">' + y + ' 年</button>'; }))
    .join("");
  const scoped = yearFilter === "全部" ? list : list.filter(function (r) { return r.date.slice(0, 4) === yearFilter; });
  if (!scoped.length) { box.innerHTML = emptyState("暂无日期记录", "新增病例后会自动出现在这里"); return; }
  const byMonth = new Map();
  scoped.forEach(function (r) {
    const key = r.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, new Map());
    const days = byMonth.get(key);
    if (!days.has(r.date)) days.set(r.date, []);
    days.get(r.date).push(r);
  });
  const months = Array.from(byMonth.keys()).sort().reverse();
  box.innerHTML = months.map(function (monthKey) {
    const days = Array.from(byMonth.get(monthKey).entries()).sort(function (a, b) { return a[0] < b[0] ? 1 : -1; });
    const total = days.reduce(function (n, e) { return n + e[1].length; }, 0);
    const label = monthKey.slice(0, 4) + " 年 " + Number(monthKey.slice(5, 7)) + " 月 · " + total + " 例";
    const dayCards = days.map(function (entry) {
      const day = entry[0];
      const items = entry[1];
      const types = Array.from(new Set(items.map(function (r) { return r.type; }))).join(" · ");
      return '<div class="date-day"><button class="date-day-head" data-day="' + day + '" type="button"><span class="date-day-num">' + Number(day.slice(8, 10)) + '</span><span class="date-day-meta">' + weekdayLabel(day) + " · " + items.length + " 例 · " + escapeHtml(types) + '</span></button><div class="date-day-list">' + items.map(recordRow).join("") + "</div></div>";
    }).join("");
    return '<div class="date-month"><div class="month-label">' + label + '</div><div class="date-days">' + dayCards + "</div></div>";
  }).join("");
}
function renderAll() {
  renderMetrics();
  renderDashboard();
  renderTimeline();
  renderDiagnosis();
  renderSurgery();

  renderDateFilterChip();
}

/* ---------------- 表单 ---------------- */

function setField(id, value) {
  const e = document.getElementById(id);
  if (e) e.value = value == null ? "" : value;
}

function openForm(record) {
  record = record || null;
  $("#recordForm").reset();
  $("#recordId").value = record ? record.id : "";
  $("#modalTitle").textContent = record ? "编辑病例记录" : "新增病例记录";
  setField("encounterDate", record ? record.date : todayIso());
  setField("encounterType", record ? record.type : "门诊");
  setField("recordStatus", record ? record.status : "进行中");
  setField("recordEye", record ? record.eye : "OU"); $("#recordDifficult").checked = Boolean(record && record.difficult);
  setField("patientName", record ? record.name : "");
  setField("patientNo", record ? record.patientNo : "");
  setField("patientGender", record ? record.gender : "女");
  setField("patientAge", record ? record.age : "");
  setField("recordDiagnosis", record ? record.diagnosis : "");
  setField("chiefComplaint", record ? record.chiefComplaint : ""); setField("pastHistory", record ? (record.pastHistory || "") : "");
  setField("treatment", record ? record.treatment : "观察");
  setField("recordTags", record ? (record.tags || []).join(", ") : "");
  setField("surgeryName", record ? record.surgeryName : "");
  setField("surgeryDate", record ? record.surgeryDate : "");
  setField("anesthesia", record ? record.anesthesia : "未记录");
  setField("surgeryRole", record ? record.role : "未记录");
  setField("postop", record ? record.postop : "");
  setField("followupDate", record ? record.followupDate : "");
  setField("readmission", record ? record.readmission : "未记录");
  setField("recordNotes", record ? record.notes : "");
  const exams = record ? (record.exams || []) : [];
  $$("[data-exam]").forEach(function (c) { c.checked = exams.indexOf(c.value) >= 0; });
  loadExamFromRecord(record);
  renderExamRecent();
  $("#recordModal").classList.remove("hidden");
  $("#recordModal").setAttribute("aria-hidden", "false");
  setTimeout(function () { $("#patientName").focus(); }, 30);
}

function closeForm() {
  $("#recordModal").classList.add("hidden");
  $("#recordModal").setAttribute("aria-hidden", "true");
}

function handleSubmit(event) {
  event.preventDefault();
  collectExamInputs();
  const existing = $("#recordId").value;
  const record = {
    id: existing || "r-" + Date.now().toString(36),
    date: $("#encounterDate").value,
    type: $("#encounterType").value,
    status: $("#recordStatus").value,
    patientNo: $("#patientNo").value.trim(),
    name: $("#patientName").value.trim(),
    gender: $("#patientGender").value,
    age: $("#patientAge").value ? Number($("#patientAge").value) : "",
    eye: $("#recordEye").value, difficult: Boolean($("#recordDifficult").checked),
    diagnosis: $("#recordDiagnosis").value.trim(),
    chiefComplaint: $("#chiefComplaint").value.trim(), pastHistory: $("#pastHistory").value.trim(),
    exams: $$("[data-exam]").filter(function (c) { return c.checked; }).map(function (c) { return c.value; }),
    examQuick: cloneExam(examState),
    examDetails: composeExamText(),
    treatment: $("#treatment").value,
    surgeryName: $("#surgeryName").value.trim(),
    surgeryDate: $("#surgeryDate").value,
    anesthesia: $("#anesthesia").value,
    role: $("#surgeryRole").value,
    postop: $("#postop").value.trim(),
    followupDate: $("#followupDate").value,
    readmission: $("#readmission").value,
    notes: $("#recordNotes").value.trim(),
    tags: $("#recordTags").value.split(/[,，、\s]+/).filter(Boolean)
  };
  if (!record.date || !record.name || !record.diagnosis) {
    toast("就诊日期、姓名、主要诊断为必填");
    return;
  }
  if (existing) {
    const index = records.findIndex(function (r) { return r.id === existing; });
    if (index >= 0) { records[index] = Object.assign({}, records[index], record); records[index].createdAt = new Date().toISOString(); }
    else { record.createdAt = record.createdAt || new Date().toISOString(); records.unshift(record); }
  } else {
    record.createdAt = record.createdAt || new Date().toISOString(); records.unshift(record);
  }
  saveRecords();
  rememberExam();
  renderExamRecent();
  closeForm();
  renderAll();
  toast(existing ? "记录已更新" : "记录已保存");
}

/* ---------------- 详情 ---------------- */

function detailRow(label, value) {
  return '<div class="detail-row"><span class="detail-label">' + label + "</span><span>" + escapeHtml(value || "未记录") + "</span></div>";
}

function openDetail(id) {
  const r = records.find(function (x) { return x.id === id; });
  if (!r) return;
  selectedDetailId = id;
  $("#detailTitle").textContent = (r.name || "病例") + " · " + (r.diagnosis || "未记录诊断");
  const tags = (r.tags || []).length ? (r.tags || []).join("、") : "未记录";
  $("#detailContent").innerHTML =
    '<div class="detail-section"><h3>就诊信息</h3>' +
      detailRow("就诊日期", formatDate(r.date, true)) +
      detailRow("就诊类型", r.type) +
      detailRow("病例状态", r.status) +
      detailRow("眼别", eyeLabel(r.eye)) +
      detailRow("主管医生", r.attendingDoctor) +
      detailRow("疑难病例", r.difficult ? "是" : "否") +
    "</div>" +
    '<div class="detail-section"><h3>患者与诊断</h3>' +
      detailRow("姓名", r.name) +
      detailRow("病案号", r.patientNo) +
      detailRow("性别 / 年龄", (r.gender || "未记录") + " / " + (r.age === "" || r.age == null ? "未记录" : r.age + " 岁")) +
      detailRow("主要诊断", r.diagnosis) +
      detailRow("主诉", r.chiefComplaint) + detailRow("既往病史", r.pastHistory) +
    "</div>" +
    '<div class="detail-section"><h3>专科查体</h3>' +
      detailRow("检查项目", (r.exams || []).join("、")) +
      detailRow("查体所见", r.examDetails) +
    "</div>" +
    '<div class="detail-section"><h3>处理与随访</h3>' +
      detailRow("治疗类型", r.treatmentType || (isSurgery(r) ? "手术治疗" : "保守治疗")) +
      detailRow("治疗方式", r.treatment) +
      detailRow("手术 / 操作", r.surgeryName) +
      detailRow("手术日期", r.surgeryDate ? formatDate(r.surgeryDate, true) : "") +
      detailRow("参与角色", r.role) +
      detailRow("麻醉方式", r.anesthesia) +
      detailRow("术后恢复", r.postop) +
      detailRow("下次随访", r.followupDate ? formatDate(r.followupDate, true) : "") +
      detailRow("是否再次入院", r.readmission) +
      detailRow("标签", tags) +
      detailRow("备注", r.notes) +
    "</div>";
  $("#detailModal").classList.remove("hidden");
  $("#detailModal").setAttribute("aria-hidden", "false");
}

function closeDetail() {
  $("#detailModal").classList.add("hidden");
  $("#detailModal").setAttribute("aria-hidden", "true");
}

function deleteRecord() {
  const r = records.find(function (x) { return x.id === selectedDetailId; });
  if (!r) return;
  if (!window.confirm("删除这条病例记录？此操作不可撤销。")) return;
  records = records.filter(function (x) { return x.id !== selectedDetailId; });
  saveRecords();
  closeDetail();
  renderAll();
  toast("记录已删除");
}

/* ---------------- 其他 ---------------- */

function exportData() {
  const payload = { org: ORG, exportedAt: new Date().toISOString(), count: records.length, records: records };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "眼科病例册_广东省人民医院眼科_" + todayIso() + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  toast("已导出 " + records.length + " 条记录");
}

function initNote() {
  const saved = localStorage.getItem(NOTE_KEY) || "";
  $("#quickNote").value = saved;
  $("#noteSavedAt").textContent = saved ? "已保存" : "—";
  $("#quickNote").addEventListener("input", function () {
    clearTimeout(noteTimer);
    noteTimer = setTimeout(function () {
      localStorage.setItem(NOTE_KEY, $("#quickNote").value);
      const d = new Date();
      $("#noteSavedAt").textContent = "已保存 " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    }, 500);
  });
}

function renderDateStamp() {
  const d = new Date();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  $("#headerDay").textContent = String(d.getDate()).padStart(2, "0");
  $("#headerMonth").textContent = months[d.getMonth()];
  $("#headerYear").textContent = d.getFullYear();
}

function bindEvents() {
  $$(".nav-item").forEach(function (b) { b.addEventListener("click", function () { setView(b.dataset.view); }); });
  $("#addRecordBtn").addEventListener("click", function () { openForm(null); });
  $("#exportBtn").addEventListener("click", exportData);
  $("#closeModal").addEventListener("click", closeForm);
  $("#cancelModal").addEventListener("click", closeForm);
  $("#recordForm").addEventListener("submit", handleSubmit);
  $("#closeDetail").addEventListener("click", closeDetail);
  $("#editDetail").addEventListener("click", function () {
    const r = records.find(function (x) { return x.id === selectedDetailId; });
    if (r) { closeDetail(); openForm(r); }
  });
  $("#deleteDetail").addEventListener("click", deleteRecord);
  $("#globalSearch").addEventListener("input", function () {
    const q = $("#globalSearch").value.trim();
    if (q) {
      timelineFilter = "全部";
      dateFilter = "";
      if ($("#datePick")) $("#datePick").value = "";
      if (typeof renderDateFilterChip === "function") renderDateFilterChip();
      if (currentView !== "timeline") { setView("timeline"); return; }
    }
    renderAll();
  });
  $("#sortSelect").addEventListener("change", renderTimeline);
  $("#diagnosisSort").addEventListener("change", renderDiagnosis);
  $("#examNormalAll").addEventListener("click", applyExamNormal);
  bindRoundThree();
  $("#examApplyLast").addEventListener("click", applyLastExam);
  $("#examClearExam").addEventListener("click", clearExam);

  $("#examSegments").addEventListener("click", function (event) {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    const key = chip.dataset.seg;
    const value = chip.dataset.val;
    const picked = examState.segments[key] || [];
    examState.segments[key] = picked.indexOf(value) >= 0 ? picked.filter(function (v) { return v !== value; }) : picked.concat(value);
    chip.classList.toggle("active");
  });

  $("#examRecent").addEventListener("click", function (event) {
    const chip = event.target.closest("[data-recent]");
    if (!chip) return;
    const box = $("#examDetails");
    const text = chip.dataset.recent;
    box.value = box.value.trim() ? box.value.trim().replace(/[；;]$/, "") + "；" + text : text;
    collectExamInputs();
  });

  document.addEventListener("click", function (event) {
    const openBtn = event.target.closest("[data-open-record]");
    if (openBtn) { openDetail(openBtn.dataset.openRecord); return; }
    const dayBtn = event.target.closest("[data-day]");
    if (dayBtn) { dateFilter = dayBtn.dataset.day; timelineFilter = "全部"; setView("timeline"); return; }
    const yearBtn = event.target.closest("[data-year]");
    if (yearBtn) { yearFilter = yearBtn.dataset.year; renderDateIndex(); return; }
    if (event.target.closest("[data-clear-date]")) { dateFilter = ""; if ($("#datePick")) $("#datePick").value = ""; renderAll(); return; }
    const goBtn = event.target.closest("[data-go-view]");
    if (goBtn) { setView(goBtn.dataset.goView); return; }
    if (event.target.closest("[data-open-new]")) { openForm(null); return; }
    const diagnosisBtn = event.target.closest("[data-diagnosis]");
    if (diagnosisBtn) {
      $("#globalSearch").value = diagnosisBtn.dataset.diagnosis;
      timelineFilter = "全部";
      setView("timeline");
      toast("已按诊断筛选：" + diagnosisBtn.dataset.diagnosis);
      return;
    }
    if (event.target.classList.contains("modal-backdrop")) {
      closeForm();
      closeDetail();
    }
  });

  $$("[data-type-filter]").forEach(function (b) {
    b.addEventListener("click", function () {
      timelineFilter = b.dataset.typeFilter;
      dateFilter = "";
      renderDateFilterChip();
      renderTimeline();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { closeForm(); closeDetail(); }
    if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      event.preventDefault();
      $("#globalSearch").focus();
    }
  });
}

/* ---------------- 第三轮：次要诊断 / 治疗类型 / 术后查体 / 辅助检查附件 ---------------- */

const FILE_DB = "vision-logbook-files";
const FILE_STORE = "files";
let pendingFiles = [];
let removedFiles = [];
let currentExistingFiles = [];
let postSegments = { segments: {} };
let secondaryDiagnoses = [];

function openDb() {
  return new Promise(function (resolve, reject) {
    if (!window.indexedDB) { reject(new Error("浏览器不支持本地文件存储")); return; }
    const req = indexedDB.open(FILE_DB, 1);
    req.onupgradeneeded = function () {
      const db = req.result;
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        const store = db.createObjectStore(FILE_STORE, { keyPath: "id" });
        store.createIndex("recordId", "recordId", { unique: false });
      }
    };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error || new Error("本地数据库打开失败")); };
  });
}
function idbPut(value) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(FILE_STORE, "readwrite");
      tx.objectStore(FILE_STORE).put(value);
      tx.oncomplete = function () { resolve(true); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}
function idbGet(id) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(FILE_STORE, "readonly");
      const req = tx.objectStore(FILE_STORE).get(id);
      req.onsuccess = function () { resolve(req.result || null); };
      req.onerror = function () { reject(req.error); };
    });
  });
}
function idbByRecord(recordId) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const out = [];
      const tx = db.transaction(FILE_STORE, "readonly");
      const req = tx.objectStore(FILE_STORE).index("recordId").openCursor(IDBKeyRange.only(recordId));
      req.onsuccess = function () { const cursor = req.result; if (cursor) { out.push(cursor.value); cursor.continue(); } else { resolve(out); } };
      req.onerror = function () { reject(req.error); };
    });
  });
}
function idbDelete(id) {
  return openDb().then(function (db) {
    return new Promise(function (resolve, reject) {
      const tx = db.transaction(FILE_STORE, "readwrite");
      tx.objectStore(FILE_STORE).delete(id);
      tx.oncomplete = function () { resolve(true); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}
function readAsDataUrl(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = function () { reject(reader.error || new Error("文件读取失败")); };
    reader.readAsDataURL(file);
  });
}
function prepareFile(file) {
  if (!/^image\//.test(file.type) || /tif/.test(file.type)) {
    return readAsDataUrl(file).then(function (url) { return { dataUrl: url, type: file.type }; });
  }
  return new Promise(function (resolve) {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = function () {
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);
      resolve({ dataUrl: canvas.toDataURL("image/jpeg", 0.72), type: "image/jpeg" });
    };
    img.onerror = function () {
      URL.revokeObjectURL(objectUrl);
      readAsDataUrl(file).then(function (url) { resolve({ dataUrl: url, type: file.type }); });
    };
    img.src = objectUrl;
  });
}
function sizeLabel(size) {
  const bytes = Number(size) || 0;
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + " MB";
  return Math.max(1, Math.round(bytes / 1024)) + " KB";
}
function renderAttachList() {
  const box = $("#attachList");
  if (!box) return;
  const parts = [];
  currentExistingFiles.forEach(function (file) {
    parts.push('<div class="attach-item"><span class="attach-meta"><span class="attach-name">' + escapeHtml(file.name) + '</span><span class="attach-size">' + escapeHtml(sizeLabel(file.size)) + '</span></span><span class="attach-actions"><button type="button" data-drop-existing="' + escapeHtml(file.id) + '">移除</button></span></div>');
  });
  pendingFiles.forEach(function (file, index) {
    parts.push('<div class="attach-item"><span class="attach-meta"><span class="attach-name">' + escapeHtml(file.name) + '</span><span class="attach-size">待上传 · ' + escapeHtml(sizeLabel(file.size)) + '</span></span><span class="attach-actions"><button type="button" data-drop-pending="' + index + '">取消</button></span></div>');
  });
  box.innerHTML = parts.join("");
}
function onAttachPick(event) {
  Array.from(event.target.files || []).forEach(function (file) {
    if (file.size > 8 * 1024 * 1024 && !/^image\//.test(file.type)) { toast("「" + file.name + "」超过 8MB，建议压缩后再传"); return; }
    pendingFiles.push(file);
  });
  event.target.value = "";
  renderAttachList();
}
function onAttachAction(event) {
  const dropExisting = event.target.closest("[data-drop-existing]");
  if (dropExisting) {
    const id = dropExisting.dataset.dropExisting;
    currentExistingFiles = currentExistingFiles.filter(function (file) { return file.id !== id; });
    if (removedFiles.indexOf(id) < 0) removedFiles.push(id);
    renderAttachList();
    return;
  }
  const dropPending = event.target.closest("[data-drop-pending]");
  if (dropPending) { pendingFiles.splice(Number(dropPending.dataset.dropPending), 1); renderAttachList(); }
}
function savePendingFiles(recordId) {
  const jobs = pendingFiles.map(function (file) {
    return prepareFile(file).then(function (prepared) {
      return idbPut({
        id: "f-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
        recordId: recordId,
        name: file.name,
        type: prepared.type || file.type,
        size: Math.round((prepared.dataUrl.length - 22) * 0.75),
        dataUrl: prepared.dataUrl,
        createdAt: new Date().toISOString()
      });
    });
  });
  const drops = removedFiles.map(function (id) { return idbDelete(id); });
  return Promise.all(jobs.concat(drops)).then(function () { pendingFiles = []; removedFiles = []; });
}
function openStoredFile(id, download) {
  idbGet(id).then(function (file) {
    if (!file) { toast("附件不存在"); return; }
    if (download) {
      const link = document.createElement("a");
      link.href = file.dataUrl;
      link.download = file.name || "附件";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    fetch(file.dataUrl).then(function (res) { return res.blob(); }).then(function (blob) {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
    }).catch(function () { toast("附件打开失败"); });
  }).catch(function () { toast("附件读取失败"); });
}
function renderDetailAttachments(files) {
  const box = $("#detailAttachments");
  if (!box) return;
  if (!files.length) { box.innerHTML = '<p class="attach-empty">尚无附件</p>'; return; }
  box.innerHTML = files.map(function (file) {
    return '<div class="attach-item"><span class="attach-meta"><span class="attach-name">' + escapeHtml(file.name) + '</span><span class="attach-size">' + escapeHtml(sizeLabel(file.size)) + '</span></span><span class="attach-actions"><button type="button" data-view-file="' + escapeHtml(file.id) + '">查看</button><button type="button" data-save-file="' + escapeHtml(file.id) + '">下载</button></span></div>';
  }).join("");
}

function renderSecondary() {
  const box = $("#secondaryList");
  if (!box) return;
  box.innerHTML = secondaryDiagnoses.map(function (name, index) {
    return '<span class="tag-item">' + escapeHtml(name) + '<button type="button" data-drop-secondary="' + index + '" title="删除">×</button></span>';
  }).join("");
}
function addSecondaryDiagnosis() {
  const input = $("#secondaryInput");
  if (!input) return;
  String(input.value || "").split(/[,，、;；]+/).forEach(function (part) {
    const value = part.trim();
    if (value && secondaryDiagnoses.indexOf(value) < 0) secondaryDiagnoses.push(value);
  });
  input.value = "";
  renderSecondary();
}

function postExamSegmentParts() {
  const parts = [];
  SEGMENTS.forEach(function (group) {
    const picked = postSegments.segments[group.key] || [];
    if (picked.length) parts.push(group.label + "：" + picked.join("、"));
  });
  return parts;
}
function composePostExamText() {
  const parts = [];
  const uc = $("#postVisionUc") ? $("#postVisionUc").value.trim() : "";
  const corr = $("#postVisionCorr") ? $("#postVisionCorr").value.trim() : "";
  const refraction = $("#postRefraction") ? $("#postRefraction").value.trim() : "";
  const iopOd = $("#postIopOd") ? $("#postIopOd").value.trim() : "";
  const iopOs = $("#postIopOs") ? $("#postIopOs").value.trim() : "";
  const extra = $("#postExtra") ? $("#postExtra").value.trim() : "";
  if (uc) parts.push("裸眼视力 " + uc);
  if (corr) parts.push("矫正视力 " + corr);
  if (refraction) parts.push("验光 " + refraction);
  if (iopOd || iopOs) parts.push("眼压 OD " + (iopOd || "—") + "、OS " + (iopOs || "—") + " mmHg");
  parts.push.apply(parts, postExamSegmentParts());
  if (extra) parts.push("术后补充：" + extra);
  return parts.join("；");
}
function renderPostSegments() {
  const box = $("#postSegments");
  if (!box) return;
  box.innerHTML = SEGMENTS.map(function (group) {
    const picked = postSegments.segments[group.key] || [];
    return '<div class="seg-group"><span class="seg-label">' + escapeHtml(group.label) + '</span><span class="seg-chips">' + group.options.map(function (option) {
      const on = picked.indexOf(option) >= 0 ? " active" : "";
      return '<button type="button" class="chip' + on + '" data-post-key="' + group.key + '" data-val="' + escapeHtml(option) + '">' + escapeHtml(option) + "</button>";
    }).join("") + "</span></div>";
  }).join("");
}
function applyPostNormalAll() {
  SEGMENTS.forEach(function (group) { postSegments.segments[group.key] = [group.options[0]]; });
  renderPostSegments();
  toast("术后查体已按常规填入");
}
function clearPostExam() {
  ["#postVisionUc", "#postVisionCorr", "#postRefraction", "#postIopOd", "#postIopOs", "#postExtra"].forEach(function (sel) { if ($(sel)) $(sel).value = ""; });
  postSegments = { segments: {} };
  renderPostSegments();
  toast("已清空术后查体");
}
function showPostSection() {
  const box = $("#postExamSection");
  if (!box) return;
  const isSurgeryType = $("#treatmentType") && $("#treatmentType").value === "手术治疗";
  box.classList.toggle("hidden", !isSurgeryType && !composePostExamText());
  updatePostEyeHint();
}
function updatePostEyeHint() {
  const hint = $("#postEyeHint");
  if (!hint) return;
  const eye = $("#recordEye") ? $("#recordEye").value : "";
  hint.textContent = (!eye || eye === "未明确") ? "术眼" : "术眼 · " + eyeLabel(eye);
}

function extraDetailHtml(r) {
  let html = "";
  if (r.surgeon) html += detailRow("主刀医师", r.surgeon);
  if ((r.secondaryDiagnoses || []).length) html += detailRow("次要诊断", r.secondaryDiagnoses.join("、"));
  html += detailRow("辅助检查", r.auxExam || "未记录");
  html += detailRow("术后查体", r.postopExam || "未记录");
  const generalSection = '<div class="detail-section"><h3>全身情况</h3>' + detailRow("入院时", r.generalAdmission || "未记录") + detailRow("术后 / 保守治疗后", r.generalAfter || "未记录") + "</div>";
  return generalSection + '<div class="detail-section"><h3>手术与检查</h3>' + html + '<div class="attach-block"><span class="field-label">辅助检查附件</span><div id="detailAttachments" class="attach-list"><p class="attach-empty">读取中…</p></div></div></div>';
}

const baseOpenForm = openForm;
openForm = function (record) {
  baseOpenForm(record);
  const r = record || {};
  if ($("#treatmentType")) $("#treatmentType").value = r.treatmentType || (isSurgery(r) ? "手术治疗" : "保守治疗");
  if ($("#attendingDoctor")) $("#attendingDoctor").value = r.attendingDoctor || "";
  if ($("#surgeon")) $("#surgeon").value = r.surgeon || "";
  if ($("#auxExam")) $("#auxExam").value = r.auxExam || "";
  if ($("#generalAdmission")) $("#generalAdmission").value = r.generalAdmission || "";
  if ($("#generalAfter")) $("#generalAfter").value = r.generalAfter || "";
  secondaryDiagnoses = Array.isArray(r.secondaryDiagnoses) ? r.secondaryDiagnoses.slice() : [];
  const post = r.examQuickPost || {};
  postSegments = { segments: Object.assign({}, post.segments || {}) };
  setField("postVisionUc", post.visionUc || post.vision || "");
  setField("postVisionCorr", post.visionCorr || "");
  setField("postRefraction", post.refraction || "");
  setField("postIopOd", post.iopOd || "");
  setField("postIopOs", post.iopOs || "");
  setField("postExtra", post.extra || "");
  pendingFiles = [];
  removedFiles = [];
  currentExistingFiles = [];
  renderSecondary();
  renderPostSegments();
  renderAttachList();
  showPostSection();
  if (r.id) {
    idbByRecord(r.id).then(function (files) { currentExistingFiles = files; renderAttachList(); }).catch(function () {});
  }
};

const baseHandleSubmit = handleSubmit;
handleSubmit = async function (event) {
  const beforeIds = records.map(function (r) { return r.id; });
  const beforeMap = {};
  records.forEach(function (r) { beforeMap[r.id] = JSON.stringify(r); });
  baseHandleSubmit(event);
  const knownId = $("#recordId") ? $("#recordId").value : "";
  let target = records.filter(function (r) { return r.id === knownId; })[0];
  if (!target) target = records.filter(function (r) { return beforeIds.indexOf(r.id) < 0; })[0];
  if (!target) target = records.filter(function (r) { return beforeMap[r.id] !== JSON.stringify(r); })[0];
  if (!target) return;
  target.secondaryDiagnoses = secondaryDiagnoses.slice();
  target.treatmentType = $("#treatmentType") ? $("#treatmentType").value : (isSurgery(target) ? "手术治疗" : "保守治疗");
  target.attendingDoctor = $("#attendingDoctor") ? $("#attendingDoctor").value.trim() : "";
  target.surgeon = $("#surgeon") ? $("#surgeon").value.trim() : "";
  target.auxExam = $("#auxExam") ? $("#auxExam").value.trim() : "";
  target.generalAdmission = $("#generalAdmission") ? $("#generalAdmission").value.trim() : "";
  target.generalAfter = $("#generalAfter") ? $("#generalAfter").value.trim() : "";
  target.examQuickPost = {
    visionUc: $("#postVisionUc") ? $("#postVisionUc").value.trim() : "",
    visionCorr: $("#postVisionCorr") ? $("#postVisionCorr").value.trim() : "",
    refraction: $("#postRefraction") ? $("#postRefraction").value.trim() : "",
    iopOd: $("#postIopOd") ? $("#postIopOd").value.trim() : "",
    iopOs: $("#postIopOs") ? $("#postIopOs").value.trim() : "",
    segments: Object.assign({}, postSegments.segments),
    extra: $("#postExtra") ? $("#postExtra").value.trim() : ""
  };
  target.postopExam = composePostExamText();
  target.attachCount = Number(target.attachCount) || 0;
  saveRecords();
  try {
    await savePendingFiles(target.id);
    const files = await idbByRecord(target.id);
    target.attachCount = files.length;
    saveRecords();
  } catch (err) {
    toast("附件保存失败：" + ((err && err.message) || "浏览器不支持本地文件存储"));
  }
  pendingFiles = [];
  removedFiles = [];
  renderAll();
};

const baseOpenDetail = openDetail;
openDetail = function (id) {
  baseOpenDetail(id);
  const r = records.filter(function (x) { return x.id === id; })[0];
  const box = $("#detailContent");
  if (!r || !box) return;
  box.insertAdjacentHTML("beforeend", extraDetailHtml(r));
  idbByRecord(id).then(function (files) { renderDetailAttachments(files); }).catch(function () { renderDetailAttachments([]); });
};

const baseDeleteRecord = deleteRecord;
deleteRecord = function () {
  const id = selectedDetailId;
  baseDeleteRecord();
  if (id) {
    idbByRecord(id).then(function (files) {
      return Promise.all(files.map(function (file) { return idbDelete(file.id); }));
    }).catch(function () {});
  }
};

function bindRoundThree() {
  $$(".metric-card").forEach(function (card, index) {
    card.classList.add("metric-link");
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    const openFollowup = index === 3;
    const openSurgery = index === 2;
    card.setAttribute("title", openFollowup ? "点开看还有哪些病人待随访" : (openSurgery ? "点开查看手术记录与随访名单" : "点开查看全部病例，并按日期筛选"));
    const openAll = function () {
      if (openFollowup || openSurgery) {
        setView("surgery");
        const anchor = $("#pendingFollowupList");
        if (openFollowup) {
          const left = anchor ? anchor.querySelectorAll(".followup-item").length : 0;
          toast(left ? "待随访 " + left + " 人，已在下方「待随访病人」列出" : "目前没有待随访病人");
          if (anchor) window.setTimeout(function () { anchor.scrollIntoView({ behavior: "smooth", block: "start" }); }, 260);
        } else {
          toast("已打开手术记录，下方是待随访病人与随访记录");
        }
        return;
      }
      dateFilter = "";
      if ($("#datePick")) $("#datePick").value = "";
      timelineFilter = "全部";
      setView("timeline");
      toast("已打开全部病例，可选定日期只看一天");
    };
    card.addEventListener("click", openAll);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openAll(); }
    });
  });
  if ($("#datePick")) {
    $("#datePick").addEventListener("change", function () {
      dateFilter = $("#datePick").value || "";
      renderAll();
    });
  }
  if ($("#postSegments")) {
    $("#postSegments").addEventListener("click", function (event) {
      const chip = event.target.closest("[data-post-key]");
      if (!chip) return;
      const key = chip.dataset.postKey;
      const value = chip.dataset.val;
      const picked = postSegments.segments[key] || [];
      const index = picked.indexOf(value);
      if (index >= 0) picked.splice(index, 1);
      else picked.push(value);
      postSegments.segments[key] = picked;
      renderPostSegments();
    });
  }
  if ($("#postNormalAll")) $("#postNormalAll").addEventListener("click", applyPostNormalAll);
  if ($("#postClearExam")) $("#postClearExam").addEventListener("click", clearPostExam);
  if ($("#treatmentType")) $("#treatmentType").addEventListener("change", showPostSection);
  if ($("#recordEye")) $("#recordEye").addEventListener("change", updatePostEyeHint);
  if ($("#attachInput")) $("#attachInput").addEventListener("change", onAttachPick);
  if ($("#attachList")) $("#attachList").addEventListener("click", onAttachAction);
  if ($("#addSecondaryBtn")) $("#addSecondaryBtn").addEventListener("click", addSecondaryDiagnosis);
  if ($("#secondaryInput")) {
    $("#secondaryInput").addEventListener("keydown", function (event) {
      if (event.key === "Enter") { event.preventDefault(); addSecondaryDiagnosis(); }
    });
  }
  if ($("#secondaryList")) {
    $("#secondaryList").addEventListener("click", function (event) {
      const button = event.target.closest("[data-drop-secondary]");
      if (!button) return;
      secondaryDiagnoses.splice(Number(button.dataset.dropSecondary), 1);
      renderSecondary();
    });
  }
  document.addEventListener("click", function (event) {
    const viewFile = event.target.closest("[data-view-file]");
    if (viewFile) { openStoredFile(viewFile.dataset.viewFile, false); return; }
    const saveFile = event.target.closest("[data-save-file]");
    if (saveFile) { openStoredFile(saveFile.dataset.saveFile, true); return; }
    const quick = event.target.closest("[data-quick-followup]");
    if (!quick) return;
    const src = records.filter(function (x) { return String(x.id) === String(quick.dataset.quickFollowup); })[0];
    if (!src) return;
    openForm(null);
    if ($("#patientName")) $("#patientName").value = src.name || "";
    if ($("#patientNo")) $("#patientNo").value = src.patientNo || "";
    if ($("#patientGender")) $("#patientGender").value = src.gender || "未记录";
    if ($("#patientAge")) $("#patientAge").value = src.age === 0 || src.age ? String(src.age) : "";
    if ($("#recordEye")) $("#recordEye").value = src.eye || "OD";
    if ($("#encounterType")) $("#encounterType").value = "随访";
    if ($("#recordDiagnosis")) $("#recordDiagnosis").value = src.diagnosis || "";
    if ($("#attendingDoctor")) $("#attendingDoctor").value = src.attendingDoctor || "";
    if ($("#recordStatus")) $("#recordStatus").value = "已完成";
    if ($("#followupDate")) $("#followupDate").value = "";
    if ($("#encounterDate")) $("#encounterDate").value = todayIso();
    if ($("#generalAdmission")) $("#generalAdmission").value = src.generalAdmission || "";
    if ($("#generalAfter")) $("#generalAfter").value = src.generalAfter || "";
    if (typeof updatePostEyeHint === "function") updatePostEyeHint();
    toast("已按「随访」录入 " + (src.name || "该病人") + "，填好本次随访情况后保存");
  });
}

function init() {
  renderDateStamp();
  initNote();
  bindEvents();
  setView("dashboard");
}

document.addEventListener("DOMContentLoaded", init);

/* ---------------- 导入 / 同步（电脑导出 JSON → 这台设备导入） ---------------- */
function importRecordsFromFile(file) {
  const reader = new FileReader();
  reader.onload = function () {
    let list = [];
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      list = Array.isArray(parsed) ? parsed : (parsed && Array.isArray(parsed.records) ? parsed.records : []);
    } catch (error) {
      toast("导入失败：文件不是有效的 JSON");
      return;
    }
    const clean = list.filter(function (item) { return item && typeof item === "object" && item.id; });
    if (!clean.length) { toast("导入失败：文件里没有找到病例记录"); return; }
    let added = 0;
    let updated = 0;
    clean.forEach(function (item) {
      const index = records.findIndex(function (row) { return row.id === item.id; });
      if (index >= 0) { records[index] = Object.assign({}, records[index], item); updated += 1; }
      else { records.push(item); added += 1; }
    });
    saveRecords();
    renderAll();
    toast("已导入 " + clean.length + " 条：新增 " + added + "，更新 " + updated);
  };
  reader.onerror = function () { toast("导入失败：文件读不出来"); };
  reader.readAsText(file);
}

(function initImportSync() {
  function bind() {
    const button = $("#importBtn");
    const input = $("#importFile");
    if (!button || !input) return;
    button.addEventListener("click", function () { input.click(); });
    input.addEventListener("change", function (event) {
      const file = event.target.files && event.target.files[0];
      if (file) importRecordsFromFile(file);
      event.target.value = "";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
/* ---------------- 拍照 / 文件识别 → 自动填表（打印病历、报告、PDF、Word） ---------------- */
var OCR_ENGINE = {
  script: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/tesseract.min.js",
  worker: "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/worker.min.js",
  core: "https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.0/",
  lang: "https://cdn.jsdelivr.net/npm/@tesseract.js-data/chi_sim@1.0.0/4.0.0"
};
var OCR_LIBS = {
  pdf: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js",
  pdfWorker: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js",
  zip: "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"
};
var OCR_LOCAL = "./ocr";
var OCR_MIRRORS = ["https://cdn.jsdelivr.net/npm/", "https://fastly.jsdelivr.net/npm/", "https://unpkg.com/"];
/* 本机/局域网打开时优先用本地 OCR 组件（线上版没有 ocr 目录，会自动回到 CDN） */
if (location.protocol === "http:" && /^(localhost|127\.0\.0\.1|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(location.hostname)) { OCR_MIRRORS.unshift(OCR_LOCAL); }
var ocrActiveBase = OCR_MIRRORS[0];
function ocrPaths(base, kind) {
  if (base === OCR_LOCAL) {
    if (kind === "engine") return OCR_LOCAL + "/tesseract.min.js";
    if (kind === "worker") return OCR_LOCAL + "/worker.min.js";
    if (kind === "core") return OCR_LOCAL + "/";
    if (kind === "lang") return OCR_LOCAL;
    return typeof OCR_LIBS[kind] === "string" ? OCR_LIBS[kind] : "";
  }
  if (kind === "engine") return base + "tesseract.js@5.1.0/dist/tesseract.min.js";
  if (kind === "worker") return base + "tesseract.js@5.1.0/dist/worker.min.js";
  if (kind === "core") return base + "tesseract.js-core@5.1.0/";
  if (kind === "lang") return base + "@tesseract.js-data/chi_sim@1.0.0/4.0.0";
  if (kind === "pdf") return base + "pdfjs-dist@3.11.174/legacy/build/pdf.min.js";
  if (kind === "pdfWorker") return base + "pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js";
  if (kind === "zip") return base + "jszip@3.10.1/dist/jszip.min.js";
  return "";
}
function ocrPreparedBlob(file) {
  return new Promise(function (resolve) {
    try {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        try {
          var w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
          var longSide = Math.max(w, h), scale = 1;
          if (longSide > 3200) { scale = 3200 / longSide; }
          else if (longSide < 1200) { scale = Math.min(3, 1200 / longSide); }
          var cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
          var canvas = document.createElement("canvas");
          canvas.width = cw;
          canvas.height = ch;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, cw, ch);
          var data = ctx.getImageData(0, 0, cw, ch), px = data.data;
          var i, l, min = 255, max = 0;
          for (i = 0; i < px.length; i += 4) {
            l = (px[i] * 299 + px[i + 1] * 587 + px[i + 2] * 114) / 1000;
            px[i] = px[i + 1] = px[i + 2] = l;
            if (l < min) { min = l; }
            if (l > max) { max = l; }
          }
          var range = Math.max(1, max - min);
          for (i = 0; i < px.length; i += 4) {
            l = Math.round((px[i] - min) * 255 / range);
            px[i] = px[i + 1] = px[i + 2] = l;
          }
          ctx.putImageData(data, 0, 0);
          canvas.toBlob(function (blob) {
            URL.revokeObjectURL(url);
            if (!blob) { resolve(file); return; }
            var name = (file && file.name ? file.name.replace(/\.[^.]+$/, "") : "photo") + "-ocr.png";
            resolve(new File([blob], name, { type: "image/png" }));
          }, "image/png");
        } catch (error) { URL.revokeObjectURL(url); resolve(file); }
      };
      img.onerror = function () { URL.revokeObjectURL(url); resolve(file); };
      img.src = url;
    } catch (error) { resolve(file); }
  });
}
document.addEventListener("change", function (event) {
  var node = event.target;
  if (!node || node.id !== "ocrFile" || !node.files || !node.files.length) { return; }
  window.__ocrPrepared = null;
  var picked = node.files[0];
  ocrPreparedBlob(picked).then(function (prepared) {
    if (node.files && node.files[0] === picked) { window.__ocrPrepared = prepared; }
  });
}, true);
function ocrLoadScript(url) {
  return new Promise(function (resolve, reject) {
    var tag = document.createElement("script");
    tag.src = url;
    tag.onload = function () { resolve(); };
    tag.onerror = function () { reject(new Error("脚本下载失败")); };
    document.head.appendChild(tag);
  });
}
function ocrWithTimeout(promise, ms, message) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () { reject(new Error(message || "下载超时")); }, ms);
    promise.then(function (v) { clearTimeout(timer); resolve(v); }, function (e) { clearTimeout(timer); reject(e); });
  });
}
function ocrTryMirrors(step, i) {
  if (i >= OCR_MIRRORS.length) return Promise.reject(new Error("所有下载源都失败了，请检查网络后重试"));
  ocrActiveBase = OCR_MIRRORS[i];
  return step(OCR_MIRRORS[i]).catch(function (error) {
    if (i + 1 < OCR_MIRRORS.length) { ocrSay("这个下载源太慢，正在换下一个…"); }
    return ocrTryMirrors(step, i + 1);
  });
}
function ocrLoadLibAny(kind, ready) {
  if (ready()) return Promise.resolve();
  return ocrTryMirrors(function (base) {
    return ocrWithTimeout(ocrLoadScript(ocrPaths(base, kind)), 45000, "组件下载超时").then(function () { if (!ready()) throw new Error("组件加载异常"); });
  }, 0);
}
var ocrImage = null;
var ocrAttached = false;
var ocrEnginePromise = null;
var ocrLibPromises = {};
var ocrLastFill = {}; var ocrLastTick = 0; var ocrWatchTimer = null; var ocrInit = {};
function ocrById(id) { return document.getElementById(id); }
function ocrSay(text) { var el = ocrById("ocrStatus"); if (el) el.textContent = text; }
function ocrReset() {
  ocrImage = null;
  ocrAttached = false;
  ocrLastFill = {};
  var preview = ocrById("ocrPreview");
  if (preview) {
    if (preview.dataset && preview.dataset.url) { try { URL.revokeObjectURL(preview.dataset.url); } catch (error) {} }
    preview.removeAttribute("src");
    preview.classList.add("hidden");
  }
  var text = ocrById("ocrText"); if (text) text.value = "";
  var runBtn = ocrById("ocrRunBtn"); if (runBtn) runBtn.disabled = true;
  var fillBtn = ocrById("ocrFillBtn"); if (fillBtn) fillBtn.disabled = true;
  ocrSay("还没有选择文件");
}
function ocrLoadEngine() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (ocrEnginePromise) return ocrEnginePromise;
  ocrEnginePromise = new Promise(function (resolve, reject) {
    var tag = document.createElement("script");
    tag.src = OCR_ENGINE.script;
    tag.onload = function () { if (window.Tesseract) { resolve(window.Tesseract); } else { reject(new Error("识别引擎加载异常")); } };
    tag.onerror = function () { ocrEnginePromise = null; reject(new Error("识别引擎下载失败，请检查网络")); };
    document.head.appendChild(tag);
  });
  return ocrEnginePromise;
}
function ocrLoadLib(key, url, ready) {
  if (ready()) return Promise.resolve();
  if (ocrLibPromises[key]) return ocrLibPromises[key];
  ocrLibPromises[key] = new Promise(function (resolve, reject) {
    var tag = document.createElement("script");
    tag.src = url;
    tag.onload = function () { if (ready()) { resolve(); } else { reject(new Error("组件加载异常")); } };
    tag.onerror = function () { ocrLibPromises[key] = null; reject(new Error("组件下载失败，请检查网络")); };
    document.head.appendChild(tag);
  });
  return ocrLibPromises[key];
}
function ocrProgress(info) { ocrLastTick = Date.now();
  var percent = Math.round((info.progress || 0) * 100);
  var names = {
    "loading tesseract core": "加载识别引擎",
    "initializing tesseract": "初始化引擎",
    "loading language traineddata": "下载中文模型（首次约 20MB）",
    "initializing api": "准备识别",
    "recognizing text": "正在识别文字"
  };
  ocrSay((names[info.status] || "处理中") + " " + percent + "%");
}
function ocrFileKind(file) {
  var name = (file.name || "").toLowerCase();
  var type = (file.type || "").toLowerCase();
  if (type.indexOf("image/") === 0 || /\.(jpe?g|png|webp|bmp|gif|heic|heif)$/.test(name)) return "image";
  if (type === "application/pdf" || /\.pdf$/.test(name)) return "pdf";
  if (/\.docx$/.test(name) || type.indexOf("wordprocessingml") >= 0) return "docx";
  if (/\.(txt|csv|md|json|xml)$/.test(name) || type.indexOf("text/") === 0) return "text";
  return "other";
}
function ocrReadTextFile(file) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();
    reader.onload = function () { resolve(String(reader.result || "")); };
    reader.onerror = function () { reject(new Error("文件读取失败")); };
    reader.readAsText(file, "utf-8");
  });
}
function ocrDocxText(file) {
  return ocrLoadLibAny("zip", function () { return typeof window.JSZip !== "undefined"; }).then(function () {
    return window.JSZip.loadAsync(file);
  }).then(function (zip) {
    var entry = zip.file("word/document.xml");
    if (!entry) throw new Error("没找到 Word 正文（.doc 旧格式需先另存为 .docx）");
    return entry.async("string");
  }).then(function (xml) {
    return String(xml).replace(/<w:p[ >]/g, "\n<w:p ").replace(/<w:tab\/>/g, " ").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n");
  });
}
function ocrPdfScannedText(pdf, maxPages) {
  var out = [];
  var chain = ocrLoadEngine();
  for (var p = 1; p <= maxPages; p++) {
    (function (pageNo) {
      chain = chain.then(function () {
        return pdf.getPage(pageNo).then(function (page) {
          var base = page.getViewport({ scale: 1 });
          var scale = Math.min(3, 2000 / Math.max(1, base.width));
          var viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement("canvas");
          canvas.width = Math.round(viewport.width);
          canvas.height = Math.round(viewport.height);
          var ctx = canvas.getContext("2d");
          return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
            return new Promise(function (resolve) { canvas.toBlob(function (blob) { resolve(blob); }, "image/png"); });
          });
        }).then(function (blob) {
          ocrSay("扫描件第 " + pageNo + " 页：正在识别文字…");
          return window.Tesseract.recognize(blob, "chi_sim", { workerPath: ocrPaths(ocrActiveBase, "worker"), corePath: ocrPaths(ocrActiveBase, "core"), langPath: ocrPaths(ocrActiveBase, "lang"), logger: ocrProgress });
        }).then(function (result) {
          out.push(result && result.data && result.data.text ? result.data.text : "");
        });
      });
    })(p);
  }
  return chain.then(function () { return out.join("\n"); });
}
function ocrPdfText(file) {
  return ocrLoadLibAny("pdf", function () { return typeof window.pdfjsLib !== "undefined"; }).then(function () {
    return fetch(ocrPaths(ocrActiveBase, "pdfWorker")).then(function (res) { return res.text(); }).then(function (code) {
      if (window.pdfjsLib.GlobalWorkerOptions) { window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([code], { type: "application/javascript" })); }
    }).catch(function () {
      if (window.pdfjsLib.GlobalWorkerOptions) { window.pdfjsLib.GlobalWorkerOptions.workerSrc = OCR_LIBS.pdfWorker; }
    });
  }).then(function () {
    return file.arrayBuffer();
  }).then(function (buffer) {
    return window.pdfjsLib.getDocument({ data: buffer }).promise;
  }).then(function (pdf) {
    var maxPages = Math.min(pdf.numPages, 5);
    var parts = [];
    var chain = Promise.resolve();
    var meaningful = 0;
    for (var p = 1; p <= maxPages; p++) {
      (function (pageNo) {
        chain = chain.then(function () {
          return pdf.getPage(pageNo).then(function (page) { return page.getTextContent(); }).then(function (content) {
            var items = (content.items || []); var buf = []; var lastY = null; items.forEach(function (it) { var yy = it.transform && it.transform.length > 5 ? Math.round(it.transform[5]) : null; if (lastY === null || yy === null || Math.abs(yy - lastY) > 3) { buf.push(it.str || ""); lastY = yy; } else { buf[buf.length - 1] += (it.str || ""); } }); var line = buf.join("\n");
            if (line.replace(/\s/g, "").length > 15) meaningful++;
            parts.push(line);
          });
        });
      })(p);
    }
    return chain.then(function () {
      if (meaningful === 0) { return ocrPdfScannedText(pdf, maxPages); }
      return parts.join("\n");
    });
  }).catch(function (error) {
    throw error && error.message ? error : new Error("PDF 解析失败（加密文件需先解密）");
  });
}
function ocrClean(text) {
  var src = String(text || "");
  src = src.replace(/[\u3000\u00a0]/g, " "); src = src.replace(/[“”"']/g, "");
  src = src.replace(/([\u4e00-\u9fa5。，、；：（）【】“”《》])[ ]+(?=[\u4e00-\u9fa5。，、；：（）【】“”《》])/g, "$1");
  src = src.replace(/[ \t]+/g, " ");
  return src;
}
function ocrFixDate(year, month, day) {
  var y = Number(year), m = Number(month), d = Number(day);
  if (!y || !m || !d || m > 12 || d > 31) return "";
  return String(y) + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
}
function ocrDateNear(src, labelRe) {
  var scope = src;
  if (labelRe) {
    var hit = src.match(labelRe);
    if (!hit) return "";
    scope = src.slice(hit.index, hit.index + 80);
  }
  var m = scope.match(/(20\d{2})\s*[-\/年.]\s*(\d{1,2})\s*[-\/月.]\s*(\d{1,2})/);
  return m ? ocrFixDate(m[1], m[2], m[3]) : "";
}
function ocrTrimValue(value) {
  return String(value || "").split(/\s{2,}|(?=\s*20\d{2}\s*[-/年.])|\s(?=(?:姓名|性别|年龄|门诊号|住院号|病案号|眼别|术眼|患眼|就诊|主诉|现病史|既往史|诊断|手术|随访|复诊|复查|预约|下次|治疗|处理|医嘱|主管|主刀|术者|医师|医生|记录|签名|日期|时间|电话|地址|联系|住院|门诊|病案|病历))|(?=\s*(?:姓名|性别|年龄|门诊号|住院号|病案号|病历号|就诊日期|就诊时间|就诊类型|就诊方式|眼别|术眼|患眼|主诉|现病史|既往史|主要诊断|次要诊断|其他诊断|伴随诊断|手术名称|手术方式|手术日期|手术时间|随访日期|复诊日期|下次随访|预约日期|复查日期|治疗方式|治疗方案|处理意见|主管医生|主管医师|主刀医师|主刀医生|术者|记录者|医师)\s*[:：;；])/)[0].replace(/[，,。;；、]+$/, "").trim();
}
function ocrParse(rawText) {
  var src = ocrClean(rawText);
  var pick = function (re) { var m = src.match(re); return m && m[1] ? ocrTrimValue(m[1]) : ""; };
  var out = {};
  out.patientName = pick(/(?:姓名|患者姓名|病人姓名)\s*[:：;；,，]?\s*([一-龥·]{2,4}?)(?=\s*(?:性别|年龄|门诊|住院|病案|病历|眼别|就诊|主诉|诊断|手术|随访|主管|主刀|治疗|联系|电话|地址|科别|床号|日期|时间|岁)|[\s（(【:：;；]|$)/);
  var gender = pick(/性别\s*[:：;；,，]?\s*(男|女)/);
  if (gender) out.patientGender = gender;
  out.patientAge = pick(/(?:年龄|年纪)\s*[:：;；,，]?\s*(\d{1,3})/);
  if (!out.patientAge) { var ageAny = src.match(/(\d{1,3})\s*(?:岁|周岁)/); if (ageAny) out.patientAge = ageAny[1]; }
  out.patientNo = pick(/(?:住院号|病案号|病历号|门诊号|就诊号|登记号|ID)\s*[:：;；,，]?\s*([A-Za-z0-9\-]{3,24})/);
  out.encounterDate = ocrDateNear(src, /(?:就诊日期|就诊时间|门诊日期|入院日期|检查日期|报告日期)/) || ocrDateNear(src, null);
  var visitType = pick(/(?:就诊类型|就诊方式|就诊类别|门诊类型)\s*[:：;；,，]?\s*(门诊|急诊|住院|随访)/);
  if (visitType) out.encounterType = visitType;
  var second = pick(/(?:次要诊断|其他诊断|伴随诊断|并发诊断)\s*[:：;；,，]?\s*([^\n\r]{2,60})/);
  if (second) {
    out.secondary = second.split(/[、,，;；]/).map(function (item) { return ocrCutDiagnosis(ocrTrimValue(item)); }).filter(function (item) { return item.length > 1; });
    src = src.replace(/(?:次要诊断|其他诊断|伴随诊断|并发诊断)\s*[:：;；,，]?\s*[^\n\r]{2,60}/, " ");
  }
  out.recordDiagnosis = pick(/(?:主要诊断|初步诊断|门诊诊断|出院诊断|入院诊断|诊断)\s*[:：;；,，]?\s*([^\n\r]{2,48})/); out.recordDiagnosis = ocrCutDiagnosis(out.recordDiagnosis);
  out.chiefComplaint = pick(/主诉\s*[:：;；,，]?\s*([^\n\r]{2,80}?)(?=\s*(?:现病史|既往史|专科查体|查体|辅助检查|处理意见|处理|医嘱|主要诊断|次要诊断|初步诊断|其他诊断|伴随诊断|手术名称|手术日期|随访日期|诊断|手术|随访|复诊|日期|时间)|[\n\r]|$)/);
  out.attendingDoctor = pick(/(?:主管医生|主管医师|经治医师|接诊医师)\s*[:：;；,，]?\s*([一-龥]{2,4}?)(?=\s*(?:随访|复诊|下次|预约|复查|手术|诊断|治疗|日期|时间|电话|联系|医师|医生|签名|记录|主刀|主管|住院|门诊|岁)|[\s（(【:：;；]|$)/);
  out.surgeon = pick(/(?:主刀医师|主刀医生|术者|手术医师)\s*[:：;；,，]?\s*([一-龥]{2,4}?)(?=\s*(?:随访|复诊|下次|预约|复查|手术|诊断|治疗|日期|时间|电话|联系|医师|医生|签名|记录|主管|住院|门诊|岁)|[\s（(【:：;；]|$)/);
  out.surgeryName = pick(/(?:手术名称|手术方式|术式|拟行手术|拟施手术)\s*[:：;；,，]?\s*([^\n\r]{2,40})/);
  out.surgeryDate = ocrDateNear(src, /(?:手术日期|手术时间|手术日)/);
  out.followupDate = ocrDateNear(src, /(?:随访日期|复诊日期|下次随访|预约日期|复查日期)/);
  var plan = pick(/(?:治疗方式|治疗方案|处理意见|处理)\s*[:：;；,，]?\s*([^\n\r]{2,24})/);
  if (plan) {
    if (/手术/.test(plan)) { out.treatmentType = "手术治疗"; out.treatment = "手术治疗"; }
    else if (/激光/.test(plan)) { out.treatmentType = "保守治疗"; out.treatment = "激光治疗"; }
    else if (/注射|打针/.test(plan)) { out.treatmentType = "保守治疗"; out.treatment = "注射治疗"; }
    else if (/药物|用药|滴眼/.test(plan)) { out.treatmentType = "保守治疗"; out.treatment = "药物治疗"; }
    else if (/观察|随诊/.test(plan)) { out.treatmentType = "保守治疗"; out.treatment = "观察"; }
    else if (/转诊|转院/.test(plan)) { out.treatmentType = "保守治疗"; out.treatment = "转诊"; }
  }
  var eye = pick(/(?:眼别|术眼|手术眼|患眼)\s*[:：;；,，]?\s*(右眼|左眼|双眼|OD|OS|OU)/) || pick(/(右眼|左眼|双眼)/);
  if (eye) {
    if (/右眼|OD/i.test(eye)) out.recordEye = "OD";
    else if (/左眼|OS/i.test(eye)) out.recordEye = "OS";
    else if (/双眼|OU/i.test(eye)) out.recordEye = "OU";
  }
  return out;
}
function ocrSetField(id, value) {
  if (!value) return false;
  var el = ocrById(id);
  if (!el) return false;
  var current = String(el.value || "").trim();
  var mine = ocrLastFill[id];
  if (el.tagName === "SELECT") {
    var untouched = (el.selectedIndex <= 0);
    if (!untouched && current && current !== mine && current !== ocrInit[id]) return false;
    var matched = "";
    for (var i = 0; i < el.options.length; i++) {
      if (el.options[i].value === value || el.options[i].text === value) { matched = el.options[i].value; break; }
    }
    if (!matched) return false;
    if (el.value === matched) { ocrLastFill[id] = matched; return false; }
    el.value = matched;
  } else {
    if (current && current !== mine && current !== ocrInit[id]) return false;
    el.value = value;
  }
  ocrLastFill[id] = String(el.value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}
function ocrAttachPhoto() {
  if (!ocrImage || ocrAttached) return false;
  try {
    if (typeof pendingFiles === "undefined" || !pendingFiles || typeof pendingFiles.push !== "function") return false;
    var stamp = new Date();
    var two = function (n) { return n < 10 ? "0" + n : "" + n; };
    var ext = ocrImage.name && /\./.test(ocrImage.name) ? ocrImage.name.slice(ocrImage.name.lastIndexOf(".")) : ".jpg";
    var name = "病历文件-" + stamp.getFullYear() + two(stamp.getMonth() + 1) + two(stamp.getDate()) + "-" + two(stamp.getHours()) + two(stamp.getMinutes()) + two(stamp.getSeconds()) + ext;
    var type = ocrImage.type || "application/octet-stream";
    pendingFiles.push(new File([ocrImage], name, { type: type }));
    if (typeof renderAttachList === "function") renderAttachList();
    ocrAttached = true;
    return true;
  } catch (error) { return false; }
}
function ocrFill(auto) {
  var box = ocrById("ocrText");
  var data = ocrParse(box ? box.value : ""); ocrApplyReal(data, box ? box.value : "");
  var pairs = [
    ["姓名", "patientName", data.patientName],
    ["性别", "patientGender", data.patientGender],
    ["年龄", "patientAge", data.patientAge],
    ["病案号", "patientNo", data.patientNo],
    ["就诊日期", "encounterDate", data.encounterDate],
    ["就诊类型", "encounterType", data.encounterType],
    ["主要诊断", "recordDiagnosis", data.recordDiagnosis],
    ["主诉", "chiefComplaint", data.chiefComplaint],
    ["主管医生", "attendingDoctor", data.attendingDoctor],
    ["主刀医师", "surgeon", data.surgeon],
    ["手术名称", "surgeryName", data.surgeryName],
    ["手术日期", "surgeryDate", data.surgeryDate],
    ["随访日期", "followupDate", data.followupDate],
    ["治疗类型", "treatmentType", data.treatmentType],
    ["治疗方式", "treatment", data.treatment]
  ];
  pairs = pairs.concat(ocrExtraPairs(box ? box.value : "")); var filled = [];
  pairs.forEach(function (item) { if (ocrSetField(item[1], item[2])) filled.push(item[0]); });
  if (data.recordEye) {
    var eyeEl = ocrById("recordEye");
    var eyeMine = ocrLastFill["recordEye"];
    if (eyeEl && eyeEl.value !== data.recordEye && (!String(eyeEl.value || "").trim() || eyeEl.value === eyeMine || eyeEl.selectedIndex <= 0 || eyeEl.value === "OU")) {
      eyeEl.value = data.recordEye;
      ocrLastFill["recordEye"] = data.recordEye;
      eyeEl.dispatchEvent(new Event("change", { bubbles: true }));
      filled.push("眼别");
    }
  }
  if (data.secondary && data.secondary.length && typeof secondaryDiagnoses !== "undefined" && secondaryDiagnoses && typeof secondaryDiagnoses.push === "function") {
    data.secondary.forEach(function (name) {
      if (secondaryDiagnoses.indexOf(name) < 0) { secondaryDiagnoses.push(name); filled.push("次要诊断" + name); }
    });
    if (typeof renderSecondary === "function") renderSecondary();
  }
  var attached = ocrAttachPhoto();
  if (!filled.length) { if (!auto) { toast("没有可填入的空白字段（已填内容不会被覆盖）"); } ocrSay("识别到的内容没对上空白字段，或对应字段已经填过"); return 0; }
  var summary = "已填入 " + filled.length + " 项：" + filled.slice(0, 8).join("、") + (filled.length > 8 ? " 等" : "") + (attached ? "；文件已存进附件" : "");
  if (!auto) { toast(summary); }
  ocrSay(summary + "。请核对后保存。");
  return filled.length;
}
function ocrStart() {
    if (!ocrImage) { toast("还没有选到文件：请点左边的「拍照 / 选文件」再选一次（支持 图片 / PDF / .docx / txt）"); return; }
  var kind = ocrFileKind(ocrImage);
  var runBtn = ocrById("ocrRunBtn");
  var fillBtn = ocrById("ocrFillBtn");
  if (runBtn) runBtn.disabled = true;
  if (fillBtn) fillBtn.disabled = true;
  ocrLastFill = {};
  var job; if (ocrWatchTimer) { clearInterval(ocrWatchTimer); } ocrLastTick = Date.now(); ocrWatchTimer = setInterval(function () { if (ocrLastTick && Date.now() - ocrLastTick > 45000) { ocrSay("组件下载较慢（已 45 秒没有进展）——可以再等一会儿，或重新点「开始识别 / 读取」重试。"); } }, 10000);
  if (kind === "image") {
    ocrSay("正在准备识别…");
    job = ocrTryMirrors(function (base) {
      return ocrLoadScript(ocrPaths(base, "engine")).then(function () { return ocrLoadEngine(); }).then(function (engine) {
        return ocrWithTimeout(engine.recognize((window.__ocrPrepared || ocrImage), "chi_sim", { workerPath: ocrPaths(base, "worker"), corePath: ocrPaths(base, "core"), langPath: ocrPaths(base, "lang"), logger: ocrProgress }), 150000, "识别组件下载超时");
      }).then(function (result) { return result && result.data ? result.data.text : ""; });
    }, 0);
  } else if (kind === "pdf") {
    ocrSay("正在读取 PDF…");
    job = ocrPdfText(ocrImage);
  } else if (kind === "docx") {
    ocrSay("正在读取 Word 文档…");
    job = ocrDocxText(ocrImage);
  } else if (kind === "text") {
    ocrSay("正在读取文本文件…");
    job = ocrReadTextFile(ocrImage);
  } else {
    job = Promise.reject(new Error("暂不支持这种文件（请用图片、PDF、.docx 或 txt）"));
  }
  job.then(function (text) {
    var clean = String(text || "").trim();
    var box = ocrById("ocrText");
    if (box) box.value = clean;
    if (!clean) { ocrSay("没能从文件里读出文字（可能是空白页或加密文件）"); toast("没有读到文字"); return; }
    var count = clean.replace(/\s/g, "").length;
    ocrSay("已取到 " + count + " 字，正在自动填表…");
    var filledCount = ocrFill(true);
    if (fillBtn) fillBtn.disabled = false;
    if (!filledCount) { ocrSay("已取到 " + count + " 字，但没对上可填的空白字段，请在下面文字里核对"); }
  }).catch(function (error) {
    var message = error && error.message ? error.message : "未知错误";
    ocrSay("读取失败：" + message);
    toast("读取失败：" + message);
  }).then(function () { if (runBtn) runBtn.disabled = false; if (ocrWatchTimer) { clearInterval(ocrWatchTimer); ocrWatchTimer = null; } });
}
(function initOcrPanel() {
  function bind() {
    var pickBtn = ocrById("ocrPickBtn");
    var fileInput = ocrById("ocrFile");
    var runBtn = ocrById("ocrRunBtn");
    var fillBtn = ocrById("ocrFillBtn");
    if (!pickBtn || !fileInput) return;
    pickBtn.addEventListener("click", function () { fileInput.click(); });
    fileInput.addEventListener("change", function (event) {
      var file = event.target.files && event.target.files[0];
      event.target.value = "";
      if (!file) return;
      ocrImage = file;
      ocrAttached = false;
      var preview = ocrById("ocrPreview");
      if (preview && /^image\//.test(file.type || "")) {
        if (preview.dataset && preview.dataset.url) { try { URL.revokeObjectURL(preview.dataset.url); } catch (error) {} }
        var url = URL.createObjectURL(file);
        preview.dataset.url = url;
        preview.src = url;
        preview.classList.remove("hidden");
      } else if (preview) {
        preview.classList.add("hidden");
      }
      if (runBtn) runBtn.disabled = false;
      if (fillBtn) fillBtn.disabled = true;
      ocrSay("已选择文件：" + file.name + "，点「开始识别 / 读取」");
    });
    if (runBtn) runBtn.addEventListener("click", ocrStart);
    if (fillBtn) fillBtn.addEventListener("click", function () { ocrFill(false); });
    var addBtn = ocrById("addRecordBtn");
    if (addBtn) addBtn.addEventListener("click", function () { setTimeout(ocrReset, 0); if (typeof ocrSnapshotInit === "function") { setTimeout(ocrSnapshotInit, 80); } });
    var form = ocrById("recordForm");
    if (form) form.addEventListener("submit", function () { setTimeout(ocrReset, 400); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
/* ---------------- 扩展字段：查体 / 辅助检查 / 一般情况 / 麻醉 / 术后 等 ---------------- */
function ocrCutDiagnosis(value) {
  var s = String(value || "");
  s = s.split(/[。；;]/)[0];
  var hit = s.search(/(?:后于|后在我院|于我院|来我院|我院|术后|入院|出院|门诊|给予|予以|建议|复查|复诊|随诊|随访|治疗|检查|手术)/);
  if (hit > 1) { s = s.slice(0, hit); }
  s = s.replace(/\s+/g, "");
  return s.slice(0, 32);
}
function ocrParseExtra(raw) {
  var src = ocrClean(raw);
  var pick = function (re) { var m = src.match(re); return m && m[1] ? ocrTrimValue(m[1]) : ""; };
  var pickLong = function (re) { var m = src.match(re); return m && m[1] ? String(m[1]).replace(/\s+$/, "").slice(0, 900) : ""; };
  var out = {};
  out.examVisionOd = pick(/(?:右眼视力|视力\(右\)|视力（右）|裸眼视力右|视力右|OD视力)\s*[:：;；,，]?\s*([0-9.]+|手动|数指|指数|光感|无光感)/i);
  out.examVisionOs = pick(/(?:左眼视力|视力\(左\)|视力（左）|裸眼视力左|视力左|OS视力)\s*[:：;；,，]?\s*([0-9.]+|手动|数指|指数|光感|无光感)/i);
  var vpair = src.match(/视力\s*[:：;；,，]?\s*(?:右|OD)\s*([0-9.]+|手动|数指|指数|光感)\s*[，,、;；\/\s]{0,8}(?:左|OS)\s*([0-9.]+|手动|数指|指数|光感)/i);
  if (vpair) { if (!out.examVisionOd) { out.examVisionOd = vpair[1]; } if (!out.examVisionOs) { out.examVisionOs = vpair[2]; } }
  out.examVisionCorrOd = pick(/(?:右眼矫正视力|矫正视力\(右\)|矫正视力（右）|矫正视力右|矫正OD)\s*[:：;；,，]?\s*([0-9.]+|手动|数指|指数|光感)/i);
  out.examVisionCorrOs = pick(/(?:左眼矫正视力|矫正视力\(左\)|矫正视力（左）|矫正视力左|矫正OS)\s*[:：;；,，]?\s*([0-9.]+|手动|数指|指数|光感)/i);
  out.examRefractionOd = pick(/(?:右眼验光|验光\(右\)|验光右|右眼屈光|屈光右)\s*[:：;；,，]?\s*([-+0-9.DSdsC×xX*\/\s]{2,24})/);
  out.examRefractionOs = pick(/(?:左眼验光|验光\(左\)|验光左|左眼屈光|屈光左)\s*[:：;；,，]?\s*([-+0-9.DSdsC×xX*\/\s]{2,24})/);
  out.examIopOd = pick(/(?:右眼眼压|右眼压|眼压\(右\)|眼压（右）|眼压右|OD眼压)\s*[:：;；,，]?\s*([0-9.]{1,6})/i);
  out.examIopOs = pick(/(?:左眼眼压|左眼压|眼压\(左\)|眼压（左）|眼压左|OS眼压)\s*[:：;；,，]?\s*([0-9.]{1,6})/i);
  var ipair = src.match(/眼压\s*[:：;；,，]?\s*(?:右|OD)\s*([0-9.]{1,6})[^\d]{0,8}(?:左|OS)\s*([0-9.]{1,6})/i);
  if (ipair) { if (!out.examIopOd) { out.examIopOd = ipair[1]; } if (!out.examIopOs) { out.examIopOs = ipair[2]; } }
  out.examDetails = pickLong(/(?:专科检查|专科查体|眼科查体)\s*[:：]?\s*([\s\S]{6,500}?)(?=\s*(?:\d+\s*[、.]\s*)?(?:辅助检查|特殊检查|主要诊断|次要诊断|初步诊断|诊断|手术名称|手术日期|治疗方式|治疗方案|处理意见|医嘱|既往史|主诉|现病史|检查项目|治疗项目)|[\n\r]{2}|$)/);
  out.auxExam = pickLong(/(?:辅助检查|特殊检查|检查结果)\s*[:：;；,，]?\s*([^\n\r]{4,220})/).replace(/^(?:(?:辅助检查|特殊检查|检查结果)\s*[:：]?\s*)+/, "");
  out.generalAdmission = pickLong(/(?:入院情况|入院时情况|入院一般情况)\s*[:：;；,，]?\s*([^\n\r]{4,220})/);
  out.generalAfter = pickLong(/(?:出院情况|术后一般情况|治疗后情况|出院时情况)\s*[:：;；,，]?\s*([^\n\r]{4,220})/);
  out.anesthesia = (function () { var a = pick(/(?:麻醉方式|麻醉)\s*[:：;；,，]?\s*(表面麻醉|表麻|局部麻醉|球后麻醉|球旁麻醉|局部浸润麻醉|局部联合|全身麻醉|全麻)/); if (/表麻|表面麻醉/.test(a)) { return "表面麻醉"; } if (/局部|局麻|球后|球旁|浸润/.test(a)) { return "局麻"; } if (/全麻|全身麻醉/.test(a)) { return "全麻"; } return a; })();
  out.surgeryRole = pick(/(?:手术角色|术中角色|担任|角色)\s*[:：;；,，]?\s*(主刀|一助|二助|三助|助手)/);
  out.readmission = pick(/(?:是否再入院|再入院|再次入院)\s*[:：;；,，]?\s*(是|否)/);
  out.postop = pickLong(/(?:术后处理|术后医嘱|术后用药)\s*[:：;；,，]?\s*([^\n\r]{4,220})/);
  out.postVisionUc = pick(/(?:术后裸眼视力|术后视力)\s*[:：;；,，]?\s*([0-9.]+|手动|数指|指数|光感)/);
  out.postVisionCorr = pick(/术后矫正视力\s*[:：;；,，]?\s*([0-9.]+|手动|数指|指数|光感)/);
  out.postRefraction = pick(/(?:术后验光|术后屈光)\s*[:：;；,，]?\s*([-+0-9.DSdsC×xX*\/\s]{2,24})/);
  out.postIopOd = pick(/(?:术后右眼眼压|术后右眼压)\s*[:：;；,，]?\s*([0-9.]{1,6})/);
  out.postIopOs = pick(/(?:术后左眼眼压|术后左眼压)\s*[:：;；,，]?\s*([0-9.]{1,6})/);
  out.postExtra = pickLong(/(?:术后其他|术后特殊情况|术后并发症)\s*[:：;；,，]?\s*([^\n\r]{4,220})/);
  out.recordNotes = pickLong(/(?:备注|其他说明|补充说明)\s*[:：;；,，]?\s*([^\n\r]{4,220})/);
  out.pastHistory = filterPastHistory(pickLong(/(?:既往史|既往病史|过去史)\s*[:：]?\s*([\s\S]{2,600}?)(?=\s*(?:\d+\s*[、.]\s*)?(?:入院体检|入院检查|体格检查|体检|专科检查|专科查体|眼科查体|辅助检查|特殊检查|实验室检查|主要诊断|次要诊断|初步诊断|诊断|手术名称|手术日期|治疗方式|治疗方案|处理意见|医嘱|主诉|现病史|个人史|婚育史|月经史|家族史|检查项目|治疗项目)\s*[:：]|[\n\r]{2}|$)/));
  out.recordStatus = pick(/(?:就诊状态|状态)\s*[:：;；,，]?\s*(门诊|住院|术后随访|随访|已出院|住院中)/);
  return out;
}
function ocrExtraPairs(raw) {
  var d = ocrParseExtra(raw); ocrApplyRealExtra(d, raw);
  return [
    
    ["右眼视力", "examVisionOd", d.examVisionOd],
    ["左眼视力", "examVisionOs", d.examVisionOs],
    ["右眼矫正视力", "examVisionCorrOd", d.examVisionCorrOd],
    ["左眼矫正视力", "examVisionCorrOs", d.examVisionCorrOs],
    ["右眼验光", "examRefractionOd", d.examRefractionOd],
    ["左眼验光", "examRefractionOs", d.examRefractionOs],
    ["右眼眼压", "examIopOd", d.examIopOd],
    ["左眼眼压", "examIopOs", d.examIopOs],
    ["专科查体", "examDetails", d.examDetails],
    ["辅助检查", "auxExam", d.auxExam],
    ["入院情况", "generalAdmission", d.generalAdmission],
    ["治疗后情况", "generalAfter", d.generalAfter],
    ["麻醉方式", "anesthesia", d.anesthesia],
    ["手术角色", "surgeryRole", d.surgeryRole],
    ["是否再入院", "readmission", d.readmission],
    ["术后处理", "postop", d.postop],
    ["术后视力", "postVisionUc", d.postVisionUc],
    ["术后矫正视力", "postVisionCorr", d.postVisionCorr],
    ["术后验光", "postRefraction", d.postRefraction],
    ["术后右眼眼压", "postIopOd", d.postIopOd],
    ["术后左眼眼压", "postIopOs", d.postIopOs],
    ["术后其他", "postExtra", d.postExtra],
    ["备注", "recordNotes", d.recordNotes], ["既往病史", "pastHistory", d.pastHistory]
  ];
}
/* ---------------- 真实住院病历（首程 / 病程记录）适配 ---------------- */
function ocrSplitDiagnoses(text) {
  return String(text || "").split(/[;；]/).map(function (item) { return String(item).replace(/^\s*\d+\s*[.、)）]\s*/, "").trim(); }).filter(function (item) { return item.length > 1; });
}
function ocrDiagnosisList(src) {
  var lines = src.split(/\n/);
  var best = "";
  for (var i = 0; i < lines.length; i++) {
    var m = lines[i].match(/^\s*(?:\d+\s*[、.])?\s*(?:初步诊断|最后诊断|出院诊断|入院诊断|主要诊断|诊断)\s*[:：]\s*(.+)$/);
    if (m && m[1] && m[1].replace(/\s/g, "").length > 2) { best = m[1]; break; }
  }
  if (!best) {
    var m2 = src.match(/(?:主要诊断|初步诊断|出院诊断|入院诊断|诊断)\s*[:：]\s*([^\n\r]{2,200})/);
    if (m2) { best = m2[1]; }
  }
  if (!best) { return []; }
  return ocrSplitDiagnoses(best).map(function (item) { return ocrCutDiagnosis(item); }).filter(function (item) { return item.length > 1; });
}
function ocrApplyReal(d, raw) {
  var src = ocrClean(raw);
  if (!d.patientGender) { var g = src.match(/性别\s*[:：]?\s*(男|女)/) || src.match(/(男性|女性)/); if (g) { d.patientGender = /女/.test(g[1]) ? "女" : "男"; } }
  if (!d.patientAge) { var a = src.match(/(\d{1,3})\s*(?:岁|周岁)/); if (a) { d.patientAge = a[1]; } }
  if (/入院|住院|收入本区|收入院/.test(src)) { d.encounterType = "住院"; } else if (/门诊/.test(src) && !d.encounterType) { d.encounterType = "门诊"; }
  var list = ocrDiagnosisList(src);
  if (list.length) {
    d.recordDiagnosis = list[0];
    var extra = (d.secondary || []).concat(list.slice(1));
    var uniq = [];
    extra.forEach(function (x) { if (x && x !== d.recordDiagnosis && uniq.indexOf(x) < 0) { uniq.push(x); } });
    d.secondary = uniq;
  }
  if (d.examDetails) { d.examDetails = ocrStripVisual(d.examDetails); }
  var plan = src.match(/(?:治疗项目|治疗方式|治疗方案|处理意见)\s*[:：]\s*([^\n\r]{2,60})/);
  if (plan) {
    var p = plan[1];
    if (/手术/.test(p)) { d.treatmentType = "手术治疗"; d.treatment = "手术治疗"; }
    else if (/抗炎|抗感染|药物|用药|滴眼/.test(p)) { d.treatmentType = "保守治疗"; d.treatment = "药物治疗"; }
    else if (/观察|随诊/.test(p)) { d.treatmentType = "保守治疗"; d.treatment = "观察"; }
  }
}
function ocrApplyRealExtra(d, raw) {
  var src = ocrClean(raw);
  var first = function (re) { var m = src.match(re); return m ? m[1] : ""; };
  var norm = function (v) { if (/^hm$/i.test(v)) { return "手动"; } if (/^fc$/i.test(v)) { return "指数"; } if (/^lp$/i.test(v)) { return "光感"; } if (/^nlp$/i.test(v)) { return "无光感"; } return v; };
  if (!d.examVisionOd) { var a = first(/(?:Vod|VOD)\s*[:：]?\s*([0-9]+\s*[.]?\s*[0-9]*|HM|FC|LP|NLP)/i); if (a) { d.examVisionOd = norm(a); } }
  if (!d.examVisionOs) { var b = first(/(?:Vos|VOS)\s*[:：]?\s*([0-9]+\s*[.]?\s*[0-9]*|HM|FC|LP|NLP)/i); if (b) { d.examVisionOs = norm(b); } }
  if (!d.examIopOd) { var c = first(/(?:Tod|TOD)\s*[:：]?\s*([0-9.]{1,6})/); if (c) { d.examIopOd = c; } }
  if (!d.examIopOs) { var e = first(/(?:Tos|TOS)\s*[:：]?\s*([0-9.]{1,6})/); if (e) { d.examIopOs = e; } }
  if (!d.examDetails) { var f = first(/(?:专科检查|专科查体|眼科查体)\s*[:：]?\s*([\s\S]{6,500}?)(?=\s*(?:\d+\s*[、.]\s*)?(?:辅助检查|特殊检查|主要诊断|次要诊断|初步诊断|诊断|手术名称|手术日期|治疗方式|治疗方案|处理意见|医嘱|既往史|主诉|现病史|检查项目|治疗项目)|[\n\r]{2}|$)/); if (f) { d.examDetails = String(f).slice(0, 600); } }
  if (d.examDetails) { d.examDetails = ocrStripVisual(d.examDetails); }
  if (!d.auxExam) { var h = first(/(?:辅助检查)\s*[:：]?\s*([^\n\r]{6,400})/); if (h) { d.auxExam = String(h).replace(/^(?:辅助检查\s*[:：]?\s*)+/, "").slice(0, 300); } }
}function ocrSnapshotInit() {
  var ids = ["patientName","patientGender","patientAge","patientNo","encounterDate","encounterType","recordEye","recordStatus","attendingDoctor","recordDiagnosis","chiefComplaint","treatmentType","treatment","surgeon","surgeryName","surgeryDate","surgeryRole","anesthesia","followupDate","readmission","examVisionOd","examVisionOs","examVisionCorrOd","examVisionCorrOs","examRefractionOd","examRefractionOs","examIopOd","examIopOs","examDetails","auxExam","generalAdmission","generalAfter","postop","postVisionUc","postVisionCorr","postRefraction","postIopOd","postIopOs","postExtra","recordNotes","pastHistory"];
  ocrInit = {};
  ids.forEach(function (id) { var el = ocrById(id); if (el) { ocrInit[id] = String(el.value || ""); } });
}function ocrStripVisual(s) {
  var t = String(s || "");
  for (var i = 0; i < 4; i++) {
    var n = t.replace(/^(?:(?:Vod|Vos|Vou|Tod|Tos|Tou|BCVA|裸眼视力|矫正视力|右眼视力|左眼视力|右眼眼压|左眼眼压|眼压|验光|加镜)[^。；;]{0,60}[。；;]?[\s，,]*)/i, "");
    if (n === t) { break; }
    t = n;
  }
  return t.replace(/^[\s，,、;；]+/, "").trim();
}/* 补充所见：去掉所有已单独导入的视力/眼压/验光片段（不限位置） */
function ocrStripVisual(s) {
  var t = String(s || "");
  t = t.replace(/(?:Vod|Vos|Vou|VOD|VOS|Tod|Tos|Tou|TOD|TOS|BCVA|裸眼视力|矫正视力|右眼视力|左眼视力|右眼眼压|左眼眼压|眼压)\s*[:：]?\s*(?:[0-9]{1,2}(?:\.[0-9]{1,3})?|HM|FC|LP|NLP|手动|指数|光感|无光感)[^。；;]{0,24}[。；;]?/g, "");
  for (var i = 0; i < 4; i++) {
    var n = t.replace(/^(?:(?:验光|加镜|屈光|裸眼|矫正)[^。；;]{0,40}[。；;]?[\s，,、]*)/, "");
    if (n === t) { break; }
    t = n;
  }
  t = t.replace(/^[\s，,、;；。]+/, "").replace(/[\s]+$/, "");
  return t.trim();
}/* 补充所见：剔除已单独导入的视力/眼压/验光片段（按标点边界，不误删其它所见） */
function ocrStripVisual(s) {
  var t = String(s || "");
  t = t.replace(/(?:Vod|Vos|Vou|Tod|Tos|Tou|BCVA|裸眼视力|矫正视力|右眼视力|左眼视力|右眼眼压|左眼眼压|眼压)\s*[:：]?\s*(?:[0-9]{1,2}(?:\.[0-9]{1,3})?|HM|FC|LP|NLP|手动|指数|光感|无光感)?[^，,。；;\n]{0,40}[，,。；;]?/g, "");
  for (var i = 0; i < 5; i++) {
    var n = t.replace(/^[\s，,、；;。]+/, "");
    n = n.replace(/^(?:(?:验光|加镜|屈光|裸眼|矫正)[^，,。；;\n]{0,60}?[，,。；;])/, "");
    if (n === t) { break; }
    t = n;
  }
  return t.replace(/^[\s，,、；;。]+/, "").replace(/\s+$/, "").trim();
}
/* ---------------- 文本框自动高度 + 异常值标注 ---------------- */
(function () {
  var VISION_IDS = ["examVisionOd","examVisionOs","examVisionCorrOd","examVisionCorrOs","postVisionUc","postVisionCorr"];
  var IOP_IDS = ["examIopOd","examIopOs","postIopOd","postIopOs"];
  function visionLevel(v) {
    var s = String(v || "").trim();
    if (!s) { return ""; }
    if (/手动|指数|光感|无光感|HM|FC|LP|NLP|眼前/.test(s)) { return "abn-sev"; }
    var m = s.match(/\d+(?:\.\d+)?/);
    if (!m) { return ""; }
    var n = parseFloat(m[0]);
    if (n >= 1) { return ""; }
    if (n < 0.1) { return "abn-sev"; }
    return "abn-warn";
  }
  function iopLevel(v) {
    var s = String(v || "").trim();
    if (!s) { return ""; }
    var m = s.match(/\d+(?:\.\d+)?/);
    if (!m) { return ""; }
    var n = parseFloat(m[0]);
    return (n > 21 || n < 10) ? "abn-sev" : "";
  }
  function markAbnormal() {
    VISION_IDS.forEach(function (id) {
      var e = document.getElementById(id);
      if (!e) { return; }
      e.classList.remove("abn-sev", "abn-warn");
      var l = visionLevel(e.value);
      if (l) { e.classList.add(l); }
      e.title = l === "abn-sev" ? "视力明显异常（<0.1 或 手动/指数/光感）" : (l === "abn-warn" ? "视力偏低（<1.0）" : "");
    });
    IOP_IDS.forEach(function (id) {
      var e = document.getElementById(id);
      if (!e) { return; }
      e.classList.remove("abn-sev");
      var l = iopLevel(e.value);
      if (l) { e.classList.add(l); }
      e.title = l ? "眼压超出参考 10-21 mmHg" : "";
    });
  }
  function autoGrow(el) {
    if (!el || el.tagName !== "TEXTAREA" || (el.id !== "examDetails" && el.id !== "pastHistory")) { return; }
    if (el.scrollHeight + 2 <= el.clientHeight + 2) { return; }
    el.style.height = "auto";
    var h = el.scrollHeight + 2;
    el.style.height = (h < 36 ? 36 : h) + "px";
  }
  function autoGrowAll() {
    var l = document.querySelectorAll("#examDetails, #pastHistory");
    for (var i = 0; i < l.length; i++) { autoGrow(l[i]); } var _o = document.querySelectorAll("textarea:not(#examDetails):not(#pastHistory)"); for (var j = 0; j < _o.length; j++) { if (_o[j].style.height) { _o[j].style.height = ""; } }
  }
  function refresh() { autoGrowAll(); markAbnormal(); }
  document.addEventListener("input", function (e) {
    if (e.target && e.target.tagName === "TEXTAREA") { autoGrow(e.target); }
    markAbnormal();
  }, true);
  document.addEventListener("change", function () { markAbnormal(); }, true);
  window.addEventListener("resize", function () { autoGrowAll(); });
  setInterval(refresh, 500);
  setTimeout(refresh, 300);
})();
/* ---------------- 查体所见：阳性/阴性关键词高亮速览 ---------------- */
(function () {
  var BAD = ["窥不清", "窥不入", "瞳孔欠圆", "虹膜后粘连", "后粘连", "对光反射消失", "反射消失", "反射迟钝", "前房积脓", "积血", "新生血管", "视网膜脱离", "裂孔", "黄斑水肿", "角膜混浊", "玻璃体混浊", "晶状体混浊", "混浊", "浑浊", "水肿", "出血", "渗出", "溃疡", "穿孔", "胬肉", "白斑", "瘢痕", "萎缩", "变性", "增殖", "增厚", "隆起", "缺损", "偏位", "震颤", "充血", "cell", "kp", "闪辉", "白内障", "光感", "手动", "指数"];
  var GOOD = ["未见异常", "无明显异常", "无异常", "无充血", "未充血", "透明", "房水清", "前房中深", "瞳孔圆", "反射存", "界清", "平伏", "在位", "色淡红", "正常"];
  function escRe(w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function escHtml(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function highlightExamText(raw) {
    var s = escHtml(raw);
    var words = GOOD.concat(BAD);
    var goodMap = {};
    GOOD.forEach(function (w) { goodMap[w] = 1; });
    var re = new RegExp("(" + words.map(escRe).join("|") + ")", "g");
    var out = "", last = 0, m;
    while ((m = re.exec(s)) !== null) {
      if (m.index < last) { continue; }
      out += s.slice(last, m.index);
      out += "<mark class=\"" + (goodMap[m[0]] ? "kw-good" : "kw-bad") + "\">" + m[0] + "</mark>";
      last = m.index + m[0].length;
    }
    out += s.slice(last);
    return out;
  }
  window.highlightExamText = highlightExamText;
  var box = null, lastVal = null;
  function ensureBox() {
    if (box && document.body.contains(box)) { return box; }
    var ta = document.getElementById("examDetails");
    if (!ta) { return null; }
    box = document.createElement("div");
    box.className = "exam-highlight";
    box.id = "examHighlightBox";
    var host = (ta.closest ? ta.closest("label") : null) || ta;
    if (host.parentNode) { host.parentNode.insertBefore(box, host.nextSibling); }
    return box;
  }
  function updateBox() {
    var ta = document.getElementById("examDetails");
    if (!ta) { return; }
    var b = ensureBox();
    if (!b) { return; }
    var v = ta.value || "";
    if (v === lastVal) { return; }
    lastVal = v;
    if (!v.replace(/\s/g, "")) { b.innerHTML = ""; return; }
    b.innerHTML = "<div class=\"exam-highlight-title\">查体速览：<span class=\"kw-bad\">红=阳性所见</span> · <span class=\"kw-good\">绿=正常/阴性</span></div><div>" + highlightExamText(v) + "</div>";
  }
  setInterval(updateBox, 600);
  document.addEventListener("input", function (e) { if (e.target && e.target.id === "examDetails") { setTimeout(updateBox, 0); } }, true);
  setTimeout(updateBox, 400);
})();
/* 既往病史：仅保留“有”的阳性描述与补充内容，过滤“否认/无/未”类阴性描述 */
function filterPastHistory(s) {
  var t = String(s || "").replace(/\s+/g, " ").trim();
  if (!t) { return ""; }
  var parts = t.split(/[；;。，,]/);
  var out = [];
  parts.forEach(function (p) {
    var q = p.replace(/^[0-9]+\s*[、.．]\s*/, "").replace(/^[（(]\s*[0-9]+\s*[)）]\s*/, "").trim();
    if (!q) { return; }
    if (/^(否认|无|未|不|未见|未曾|无明显|检查无|既往体健|体健)/.test(q)) { return; }
    out.push(q);
  });
  return out.join("；");
}
/* 总览“最近输入”排序用：兼容 ISO 创建时间，取不到则视为最旧 */
function createdValue(v) { if (!v) { return 0; } var n = new Date(v).getTime(); return isNaN(n) ? 0 : n; }
/* ---------------- 自动同步：电脑上的服务作为共享病例库 ---------------- */
(function () {
  var API = "api/records";
  var META_KEY = STORAGE_KEY + "-sync-meta";
  var DEL_KEY = STORAGE_KEY + "-deleted";
  var INTERVAL = 15000;
  var busy = false;
  var again = false;

  function stampOf(record) {
    var value = record && record.createdAt ? new Date(record.createdAt).getTime() : 0;
    return isNaN(value) ? 0 : value;
  }
  function readJson(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (error) { return fallback; }
  }
  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
  }
  function readDeleted() { var map = readJson(DEL_KEY, {}); return map && typeof map === "object" ? map : {}; }
  function readMeta() { var map = readJson(META_KEY, {}); return map && typeof map === "object" ? map : {}; }
  function isSample(record) { return Boolean(record && record.id && /^r-\d{1,3}$/.test(record.id)); }
  function storedMap() {
    var list = readJson(STORAGE_KEY, null);
    var map = {};
    if (Array.isArray(list)) { list.forEach(function (row) { if (row && row.id) { map[row.id] = 1; } }); }
    return map;
  }
  function setStatus(text, state) {
    var node = document.getElementById("syncStatus");
    if (!node) { return; }
    node.textContent = text;
    node.className = "sync-status" + (state ? " is-" + state : "");
  }
  function localDeletes(stored) {
    var meta = readMeta();
    var deleted = readDeleted();
    var before = Array.isArray(meta.ids) ? meta.ids : null;
    if (before) {
      before.forEach(function (id) { if (!stored[id] && !deleted[id]) { deleted[id] = new Date().toISOString(); } });
    }
    writeJson(META_KEY, { ids: Object.keys(stored) });
    writeJson(DEL_KEY, deleted);
    return deleted;
  }
  function outgoing(stored) {
    return records.filter(function (record) {
      return Boolean(record && record.id && stored[record.id] && !isSample(record));
    });
  }
  function applyStore(store) {
    var incoming = store && Array.isArray(store.records) ? store.records : [];
    var deleted = Object.assign({}, readDeleted(), (store && store.deleted) || {});
    var byId = new Map();
    incoming.forEach(function (record) { if (record && record.id) { byId.set(record.id, record); } });
    records.forEach(function (record) {
      if (!record || !record.id) { return; }
      var current = byId.get(record.id);
      if (!current || stampOf(record) >= stampOf(current)) { byId.set(record.id, record); }
    });
    Object.keys(deleted).forEach(function (id) {
      var record = byId.get(id);
      if (!record) { return; }
      var when = new Date(deleted[id]).getTime();
      if (!isNaN(when) && stampOf(record) <= when) { byId.delete(id); }
    });
    var fresh = Array.from(byId.values());
    var hasLocalData = Object.keys(storedMap()).length > 0;
    if (!incoming.length) { fresh = records.slice(); }
    if (!hasLocalData && incoming.length) {
      fresh = fresh.filter(function (record) { return !isSample(record); });
    }
    var before = JSON.stringify(records);
    records = fresh;
    writeJson(DEL_KEY, deleted);
    return JSON.stringify(records) !== before;
  }
  function syncNow(manual) {
    if (busy) { again = true; return; }
    busy = true;
    if (manual) { setStatus("同步中…", "busy"); }
    var stored = storedMap();
    var deleted = localDeletes(stored);
    var payload = { records: outgoing(stored), deleted: deleted };
    fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), cache: "no-store" })
      .then(function (response) { if (!response.ok) { throw new Error("HTTP " + response.status); } return response.json(); })
      .then(function (store) {
        var changed = applyStore(store);
        if (changed) { saveRecords(); renderAll(); }
        setStatus("已同步", "ok");
        if (manual) { toast("已与病例库同步"); }
      })
      .catch(function () {
        setStatus("未连接（仅本机）", "off");
        if (manual) { toast("没连上病例库：先存在本机，回到同一网络会自动补上"); }
      })
      .then(function () { busy = false; if (again) { again = false; syncNow(false); } });
  }
  window.addEventListener("load", function () {
    setStatus("正在连接…", "busy");
    setTimeout(function () { syncNow(false); }, 1200);
  });
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { syncNow(false); } });
  setInterval(function () { if (!document.hidden) { syncNow(false); } }, INTERVAL);
  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) { if (node.id === "syncStatus") { syncNow(true); return; } node = node.parentNode; }
  });

  /* 保存后尽快推送到共享病例库（防抖） */
  var saveTimer = null;
  var baseSaveRecords = saveRecords;
  saveRecords = function () {
    baseSaveRecords.apply(null, arguments);
    if (saveTimer) { clearTimeout(saveTimer); }
    saveTimer = setTimeout(function () { saveTimer = null; syncNow(false); }, 900);
  };
  window.__visionSyncNow = syncNow;})();
/* ---------------- 识别结果智能校验：只填能对得上的内容，宁缺毋滥 ---------------- */
(function () {
  var CJK = /[\u4e00-\u9fa5]/;
  var KEEP = /[\u4e00-\u9fa5A-Za-z0-9\s.,:;()\/\+\-%°·、，。：；（）？！“”‘’]/;
  var CAPS = { patientName: 14, attendingDoctor: 8, surgeon: 8, treatmentType: 14, treatment: 30, surgeryName: 30, recordDiagnosis: 60, chiefComplaint: 90 };
  var TERM_FIX = [["白内瘴", "白内障"], ["白内瘴", "白内障"], ["青光服", "青光眼"], ["玻璃体湿浊", "玻璃体混浊"], ["视绅经炎", "视神经炎"], ["视网膜脱离", "视网膜脱离"], ["裸眼视力", "裸眼视力"], ["矫正视力", "矫正视力"], ["眼挫伤", "眼挫伤"], ["超声乳化", "超声乳化"], ["人工晶体", "人工晶体"]];
  function cjkCount(s) { var m = String(s).match(/[\u4e00-\u9fa5]/g); return m ? m.length : 0; }
  function normalize(value) {
    var s = String(value == null ? "" : value);
    s = s.replace(/[CＧ]\s*[oO0]\s*[sS5]\s*[)）]/g, "(os)");
    s = s.replace(/[CＧ]\s*[oO0]\s*[dD]\s*[)）]/g, "(od)");
    s = s.replace(/[（(]\s*[oO0]\s*[sS5]\s*[)）]/g, "(os)");
    s = s.replace(/[（(]\s*[oO0]\s*[dD]\s*[)）]/g, "(od)");
    s = s.replace(/[（(]\s*[oO0]\s*[uU]\s*[)）]/g, "(ou)");
    s = s.replace(/^[^一-龥]+(?=[一-龥])/, "");
    s = s.replace(/([\u4e00-\u9fa5])[ \u3000]+(?=[\u4e00-\u9fa5])/g, "$1");
    s = s.replace(/([\u4e00-\u9fa5])[ \u3000]+(?=[0-9])/g, "$1");
    s = s.replace(/([0-9])[ \u3000]+(?=[\u4e00-\u9fa5])/g, "$1");
    s = s.replace(/[ \t]{2,}/g, " ");
    return s.trim();
  }
  function looksGarbage(s) {
    if (!s) { return true; }
    if (!CJK.test(s) && !/[0-9]/.test(s)) { return true; }
    var bad = 0, i, ch;
    for (i = 0; i < s.length; i++) { ch = s.charAt(i); if (!KEEP.test(ch)) { bad += 1; } }
    if (s.length > 5 && bad / s.length > 0.25) { return true; }
    if (s.length > 10 && cjkCount(s) === 0) { return true; }
    if (/(.)\1{3,}/.test(s)) { return true; }
    return false;
  }
  function fixTerms(s) {
    var out = s, i;
    for (i = 0; i < TERM_FIX.length; i++) { out = out.split(TERM_FIX[i][0]).join(TERM_FIX[i][1]); }
    return out;
  }
  function fieldOk(id, value) {
    var s = fixTerms(normalize(value));
    if (!s) { return null; }
    if (id === "patientName") { return /^[\u4e00-\u9fa5·]{2,12}$/.test(s) ? s : null; }
    if (/Date$/.test(id)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) { return null; }
      var y = Number(s.slice(0, 4));
      return (y >= 2000 && y <= 2100) ? s : null;
    }
    if (id === "attendingDoctor" || id === "surgeon") { return /^[\u4e00-\u9fa5]{2,5}$/.test(s) ? s : null; }
    if (/diagnos|complaint/i.test(id)) {
      if (/^(patientName|attendingDoctor|surgeon|recordDiagnosis|chiefComplaint|surgeryName|treatment|treatmentType)$/.test(id) && cjkCount(s) < 2) { return null; }
      if (cjkCount(s) > 0) {
        var core = s.replace(/[（(]\s*(os|od|ou)\s*[)）]/gi, "").replace(/[0-9]+/g, "").replace(/[\s.,:;、，。：；()（）\/+\-]/g, "");
        if (cjkCount(core) < 2) { return null; }
        if (core.length - cjkCount(core) > Math.max(1, core.length * 0.2)) { return null; }
      } else if (!/^[0-9A-Za-z.\-\/:;, ]{1,24}$/.test(s)) { return null; }
      if (looksGarbage(s)) { return null; }
      return s;
    }
    if (CAPS[id] && s.length > CAPS[id]) { return null; }
    if (looksGarbage(s)) { return null; }
    return s;
  }
  if (typeof ocrSetField === "function") {
    var baseSet = ocrSetField;
    ocrSetField = function (id, value) {
      var ok = fieldOk(id, value);
      if (ok === null) { window.__ocrSkipped = (window.__ocrSkipped || 0) + 1; return false; }
      return baseSet(id, ok);
    };
  }
  if (typeof ocrFill === "function") {
    var baseFill = ocrFill;
    ocrFill = function (auto) {
      window.__ocrSkipped = 0;
      var n = baseFill.apply(null, arguments);
      if (window.__ocrSkipped > 0) {
        try { ocrSay("已填入 " + n + " 项；另有 " + window.__ocrSkipped + " 项识别内容不可靠，已跳过（请在下面原文里核对）。"); } catch (e) {}
      }
      return n;
    };
  }
})();

/* ---------------- AI 纠错（Key 存在本机服务器，浏览器不接触；本地先脱敏） ---------------- */
(function () {
  var LS = { base: "vision-ai-base", model: "vision-ai-model", scope: "vision-ai-scope", auto: "vision-ai-auto" };
  function gs(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function ss(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function byId(id) { return document.getElementById(id); }
  function setState(t) { var s = byId("aiState"); if (s) { s.textContent = t; } }
  function show(t) { var o = byId("aiPreviewOut"); if (o) { o.value = t; } }
  var RULES = [
    [/(姓\s*名|患者姓名)\s*[:：]\s*([^\s:：,，。]{1,6})/g, 2, "[姓名]"],
    [/(住院号|病历号|门诊号|病案号|就诊号)\s*[:：]?\s*([A-Za-z0-9-]{3,24})/g, 2, "[病历号]"],
    [/(身份证|证件号)\s*[:：]?\s*([0-9Xx]{6,18})/g, 2, "[身份证]"],
    [/(1[3-9][0-9]{9})/g, 1, "[手机号]"],
    [/(床\s*号)\s*[:：]?\s*([A-Za-z0-9-]{1,6})/g, 2, "[床号]"],
    [/(住址|地址)\s*[:：]\s*([^,，。;；]{2,40})/g, 2, "[住址]"]
  ];
  function maskText(text) {
    var s = String(text || ""), map = [];
    RULES.forEach(function (rule) {
      s = s.replace(rule[0], function () {
        var args = Array.prototype.slice.call(arguments);
        var whole = args[0], orig = args[rule[1]] || "";
        if (!orig) { return whole; }
        map.push([rule[2], orig]);
        return whole.split(orig).join(rule[2]);
      });
    });
    return { text: s, map: map };
  }
  function unmask(value, map) {
    var s = String(value == null ? "" : value);
    (map || []).forEach(function (pair) { s = s.split(pair[0]).join(pair[1]); });
    return s;
  }
  function shortScope(text) {
    var keep = /(诊断|主诉|手术|术式|眼别|视力|眼压|治疗|用药|药品|入院|出院|日期|性别|年龄|科室)/;
    return String(text || "").split(String.fromCharCode(10)).filter(function (line) { return keep.test(line); }).join(String.fromCharCode(10));
  }
  function currentText() {
    var b = byId("ocrText");
    var raw = b && b.value ? b.value : "";
    if (!String(raw || "").trim() && window.__lastOcrText) { raw = window.__lastOcrText; }
    return String(raw || "");
  }
  function migrateScope(v) {
    v = String(v || "");
    if (v === "full") { return "fields_full"; }
    if (v === "short") { return "correct_short"; }
    if (v === "correct_full" || v === "correct_short" || v === "fields_full") { return v; }
    return "correct_full";
  }
  function post(url, data) {
    return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(function (r) { return r.json(); });
  }
  function buildPanel() {
    if (byId("aiPanel")) { return; }
    var host = byId("ocrRunBtn");
    var anchor = host ? host.parentNode : null;
    while (anchor && anchor.parentNode && anchor.className && String(anchor.className).indexOf("ocr") < 0) { anchor = anchor.parentNode; }
    var box = document.createElement("div");
    box.id = "aiPanel";
    box.className = "ai-box";
    box.innerHTML = [
      "<div class=ai-head><strong>AI 纠错（可选）</strong><span id=aiState class=ai-state></span></div>",
      "<div class=ai-row><span>API 地址</span><input id=aiBase type=text placeholder=https://api.deepseek.com/v1/chat/completions></div>",
      "<div class=ai-row><span>模型</span><input id=aiModel type=text placeholder=deepseek-chat></div>",
      "<div class=ai-row><span>API Key</span><input id=aiKey type=password placeholder=sk-...></div>",
      "<div class=ai-row><span>处理方式</span><select id=aiScope><option value=correct_full>整段纠错后重填全部字段（推荐）</option><option value=correct_short>只发诊断/主诉等短字段，补关键字段</option><option value=fields_full>整段发送，只补关键字段</option></select></div>",
      "<div class=ai-row><label><input id=aiAuto type=checkbox> 识别后自动让 AI 纠错</label></div>",
      "<div class=ai-row><button id=aiSave class=quiet-btn type=button>保存</button><button id=aiPreview class=quiet-btn type=button>脱敏预览</button><button id=aiFix class=quiet-btn type=button>AI 纠错</button></div>",
      "<textarea id=aiPreviewOut readonly placeholder=点「AI 纠错」后，这里会显示实际发送的内容和 AI 的回答></textarea>",
      "<p class=ai-tip>API Key 保存在本机（换网址、换浏览器都不用再输），不会上传；照片永不上传，只发送脱敏后的文字（姓名、病历号、电话会变成 [姓名] 这类占位符，回来时自动还原）。支持 DeepSeek / 豆包（火山方舟）/ 通义 / Kimi 等 OpenAI 兼容接口。</p>"
    ].join("");
    if (anchor && anchor.parentNode) { anchor.parentNode.insertBefore(box, anchor.nextSibling); }
    else { var form = byId("recordForm"); if (form) { form.appendChild(box); } else { document.body.appendChild(box); } }
    byId("aiScope").value = migrateScope(gs(LS.scope, "correct_full"));
    byId("aiAuto").checked = gs(LS.auto, "0") === "1";
    byId("aiSave").addEventListener("click", function () {
      var payload = { base: byId("aiBase").value.trim(), model: byId("aiModel").value.trim(), scope: byId("aiScope").value };
      var k = byId("aiKey").value.trim();
      if (k) { payload.key = k; }
      ss(LS.scope, payload.scope); ss(LS.auto, byId("aiAuto").checked ? "1" : "0");
      post("/api/ai/config", payload).then(function () { byId("aiKey").value = ""; loadConfig(); alert("已保存。Key 存在这台电脑上，以后打开就自动使用，不需要再输入。"); }).catch(function () { alert("保存失败：请确认服务窗口还开着。"); });
    });
    byId("aiPreview").addEventListener("click", function () { prepareAndShow(true); });
    byId("aiFix").addEventListener("click", function () { runAI(true); });
    loadConfig();
  }
  function loadConfig() {
    fetch("/api/ai/config", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (cfg) {
      if (!cfg) { return; }
      if (cfg.base) { byId("aiBase").value = cfg.base; }
      if (cfg.model) { byId("aiModel").value = cfg.model; }
      if (cfg.scope) { byId("aiScope").value = migrateScope(cfg.scope); }
      var k = byId("aiKey");
      if (k) { k.value = ""; k.placeholder = cfg.configured ? ("已保存（尾号 " + (cfg.keyTail || "") + "）——如需更换，在这里输入新 Key") : "sk-..."; }
      setState(cfg.configured ? ("已配置：" + (cfg.model || "")) : "未配置（不联网，只用本地识别）");
    }).catch(function () { setState("未配置（不联网，只用本地识别）"); });
  }
  function prepareAndShow(manual) {
    var raw = currentText();
    if (!String(raw || "").trim()) { if (manual) { alert("原文框里没有内容：请先点「开始识别」，等识别完成后（下面原文框出现文字）再点「AI 纠错」。"); } return null; }
    var scope = migrateScope(gs(LS.scope, "correct_full"));
    var base = scope.indexOf("full") >= 0 ? raw : shortScope(raw);
    if (!String(base || "").trim()) { base = raw; }
    var masked = maskText(base);
    show("【将发送（脱敏后）】" + String.fromCharCode(10) + masked.text);
    return { raw: raw, masked: masked, scope: scope };
  }
  function runAI(manual) {
    fetch("/api/ai/config", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (cfg) {
      if (!cfg || !cfg.configured) { if (manual) { alert("还没有保存 API Key：在面板里粘贴一次并保存，以后都不用再输。"); } return; }
      var ctx = prepareAndShow(false);
      if (!ctx) { if (manual) { alert("原文框里没有内容：请先点「开始识别」，等识别完成后（下面原文框出现文字）再点「AI 纠错」。"); } return; }
      var inCorrect = ctx.scope.indexOf("correct") === 0;
      setState("正在等 AI 回答…");
      var sys = inCorrect
        ? "你是眼科病历录入助手。用户给你的是 OCR 识别的病历文字（已脱敏：[姓名]/[病历号] 等是占位符，必须原样保留，不要改写）。不管它是哪家医院、哪种页面排版，请：1) 只根据原文纠正错字与字间多余空格，不要编造、不要增删医学内容；2) 只输出一个 JSON 对象（不要解释、不要代码块），格式为：{\"corrected\":\"纠正后的全文（保留换行）\",\"fields\":{\"patientName\":\"\",\"patientNo\":\"\",\"gender\":\"\",\"age\":\"\",\"encounterDate\":\"\",\"diagnosis\":\"\",\"secondary\":[],\"chiefComplaint\":\"\",\"pastHistory\":\"\",\"examDetails\":\"\",\"visionOd\":\"\",\"visionOs\":\"\",\"corrOd\":\"\",\"corrOs\":\"\",\"refractionOd\":\"\",\"refractionOs\":\"\",\"iopOd\":\"\",\"iopOs\":\"\",\"generalAdmission\":\"\",\"generalAfter\":\"\",\"treatment\":\"\",\"surgeryName\":\"\",\"eye\":\"\"}}；fields 只填原文确实有的内容，没有就留空，不要猜。"
        : "你是眼科病历录入助手。用户给你的是 OCR 识别后、已脱敏的病历文字。请只根据原文纠正识别错字，不要编造原文没有的内容。只输出一个 JSON 对象，不要解释和代码块：{\"diagnosis\":\"\",\"complaint\":\"\",\"surgery\":\"\",\"eye\":\"\",\"corrections\":\"\"}，eye 只填 OD/OS/OU 或留空，不确定的字段留空字符串。";
      post("/api/ai", { messages: [{ role: "system", content: sys }, { role: "user", content: (manual ? "（用户手动触发）" : "") + ctx.masked.text }] }).then(function (res) {
        if (!res || !res.ok) { throw new Error((res && res.error) ? res.error : ("HTTP " + ((res && res.status) || 0))); }
        var content = String(res.content || "");
        var body = content.replace(/```[a-z]*/gi, "").trim();
        if (inCorrect) {
          var _js = body; var _s = _js.indexOf("{"), _e = _js.lastIndexOf("}"); if (_s >= 0 && _e > _s) { _js = _js.slice(_s, _e + 1); }
          var _parsed = null; try { _parsed = JSON.parse(_js); } catch (err) { _parsed = null; }
          if (_parsed && typeof window.__applyAiFields === "function" && (_parsed.fields || _parsed.corrected)) {
            var _corr = String(_parsed.corrected || "");
            if (_corr) { var _ol = String(ctx.raw || "").split(String.fromCharCode(10)).length; var _nl = _corr.split(String.fromCharCode(10)).length; if (!(_ol >= 3 && _nl <= 1)) { var _bx = byId("ocrText"); if (_bx) { _bx.value = unmask(_corr, ctx.masked.map); window.__lastOcrText = _bx.value; } } }
            var _cnt = window.__applyAiFields(_parsed.fields || {}, ctx.masked.map);
            if (typeof window.pushAiResult === "function") { window.pushAiResult(ctx, content, _cnt); }
            return;
          }
          var corrected = unmask(body, ctx.masked.map);
          var rawLen = ctx.raw.replace(/\s/g, "").length;
          if (corrected.replace(/\s/g, "").length < rawLen * 0.4) {
            show("【已发送（脱敏后）】" + String.fromCharCode(10) + ctx.masked.text + String.fromCharCode(10,10) + "【AI 回答】" + String.fromCharCode(10) + content.slice(0, 1200));
            throw new Error("AI 返回的内容太短，已放弃重填（原文未改动）");
          }
          var box = byId("ocrText");
          var _oLines = String(ctx.raw || "").split(String.fromCharCode(10)).length;
          var _nLines = corrected.split(String.fromCharCode(10)).length;
          var _adopt = !(_oLines >= 3 && _nLines <= 1);
          if (_adopt) { if (box) { box.value = corrected; window.__lastOcrText = corrected; } } else { show("【AI 返回丢掉了换行，未采用】" + String.fromCharCode(10) + corrected.slice(0, 800)); setState("AI 返回格式异常，已保留本地识别结果"); }
          try { if (typeof ocrLastFill !== "undefined" && ocrLastFill) { Object.keys(ocrLastFill).forEach(function (fid) { var fe = byId(fid); if (fe && !fe.disabled) { fe.value = ""; } }); } } catch (e) {}
          var n = 0; if (_adopt) { try { n = ocrFill(true); } catch (e) {} }
          show("【AI 纠正后的全文（已重填 " + n + " 项）】" + String.fromCharCode(10) + corrected);
          setState("已纠错并重填：" + n + " 项");
          try { toast(n > 0 ? ("AI 已纠错并重填 " + n + " 项，请核对") : "AI 纠错已完成（已填内容与纠正后一致，无需改动）"); } catch (e) {}
          try { ocrSay("AI 纠错完成：已按纠正后的文字重填 " + n + " 项，请核对后保存。"); } catch (e) {}
          return;
        }
        var json = body;
        var s = json.indexOf("{"), e2 = json.lastIndexOf("}");
        if (s >= 0 && e2 > s) { json = json.slice(s, e2 + 1); }
        var parsed = JSON.parse(json);
        var applied = [];
        if (parsed.diagnosis && typeof ocrSetField === "function") { if (ocrSetField("recordDiagnosis", unmask(parsed.diagnosis, ctx.masked.map))) { applied.push("主要诊断"); } }
        if (parsed.complaint && typeof ocrSetField === "function") { if (ocrSetField("chiefComplaint", unmask(parsed.complaint, ctx.masked.map))) { applied.push("主诉"); } }
        if (parsed.surgery && typeof ocrSetField === "function") { if (ocrSetField("surgeryName", unmask(parsed.surgery, ctx.masked.map))) { applied.push("手术名称"); } }
        if (parsed.eye && /^(OD|OS|OU)$/.test(String(parsed.eye).toUpperCase())) {
          var eyeEl = byId("recordEye");
          if (eyeEl) { eyeEl.value = String(parsed.eye).toUpperCase(); eyeEl.dispatchEvent(new Event("change", { bubbles: true })); applied.push("眼别"); }
        }
        show("【已发送（脱敏后）】" + String.fromCharCode(10) + ctx.masked.text + String.fromCharCode(10,10) + "【AI 返回】" + String.fromCharCode(10) + content.slice(0, 1200));
        setState("已填入：" + (applied.length ? applied.join("、") : "无"));
        try { toast(applied.length ? ("AI 纠错已填入：" + applied.join("、")) : "AI 没找到可填的内容"); } catch (e) {}
      }).catch(function (err) {
        var m = String((err && err.message) || err);
        var tip = m.indexOf("401") >= 0 || m.indexOf("403") >= 0 ? "Key 不对或没权限" : (m.indexOf("402") >= 0 ? "账户余额不足" : (m.indexOf("404") >= 0 ? "API 地址或模型名不对" : m));
        setState("调用失败：" + tip.slice(0, 40));
        if (manual) { try { alert("AI 调用失败：" + tip.slice(0, 120)); } catch (e) {} }
        try { toast("AI 调用失败：" + tip.slice(0, 40) + "（本地识别结果不受影响）"); } catch (e) {}
      });
    });
  }
  window.__visionRunAI = runAI;
  window.addEventListener("load", function () { setTimeout(buildPanel, 900); });
  var hooked = null;
  function hookAuto() {
    if (typeof ocrFill !== "function" || hooked === ocrFill) { return; }
    hooked = ocrFill;
    var prev = ocrFill;
    ocrFill = function (auto) {
      var n = prev.apply(null, arguments);
      if (gs(LS.auto, "0") === "1" && currentText()) { setTimeout(function () { fetch("/api/ai/config", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (c) { if (c && c.configured) { runAI(false); } }).catch(function () {}); }, 400); }
      return n;
    };
  }
  document.addEventListener("click", function () { setTimeout(hookAuto, 60); }, true);
  window.addEventListener("load", function () { setTimeout(hookAuto, 1200); });
})();
/* ---------------- 诊断信息 / 选文件健壮性（第二层） ---------------- */
(function () {
  function g(id) { return document.getElementById(id); }
  function clickPick() {
    var box = g("ocrFile");
    var btn = g("ocrPickBtn");
    var target = btn || box;
    if (target && box) {
      target.addEventListener("click", function () { try { box.value = ""; window.__lastOcrText = ""; } catch (e) {} }, true);
    }
  }
  function diagText() {
    var box = g("ocrText");
    var st = g("ocrStatus");
    var fi = g("ocrFile");
    var f = fi && fi.files && fi.files[0] ? fi.files[0] : null;
    var s = [];
    s.push("【诊断信息】");
    s.push("地址：" + location.href);
    s.push("文件：" + (f ? (f.name + " / " + Math.round(f.size / 1024) + "KB / " + (f.type || "未知类型")) : "未选到（输入框为空）"));
    s.push("识别字数：" + (box && box.value ? box.value.replace(/\s/g, "").length : 0));
    s.push("状态栏：" + (st && st.textContent ? st.textContent : "（空）"));
    s.push("本次填入：" + (window.__ocrFilled == null ? "无记录" : window.__ocrFilled) + "，跳过不可靠：" + (window.__ocrSkipped == null ? "无记录" : window.__ocrSkipped));
    var k = ""; try { k = localStorage.getItem("vision-ai-key") || ""; } catch (e) {}
    s.push("AI：" + (k ? ("已配置，模型=" + (localStorage.getItem("vision-ai-model") || "") + "，范围=" + (localStorage.getItem("vision-ai-scope") || "")) : "未配置"));
    return s.join("\n");
  }
  function addDiagButton() {
    var row = g("aiPreview");
    if (!row || g("aiDiagBtn")) { return; }
    var b = document.createElement("button");
    b.id = "aiDiagBtn";
    b.type = "button";
    b.className = "quiet-btn";
    b.textContent = "诊断信息";
    b.addEventListener("click", function () {
      var out = g("aiPreviewOut");
      var s = diagText();
      if (out) { out.value = s; }
      try { navigator.clipboard.writeText(s); } catch (e) {}
    });
    row.parentNode.insertBefore(b, row.nextSibling);
  }
  function hookFill() {
    if (typeof ocrFill !== "function") { return; }
    if (window.__diagHooked === ocrFill) { return; }
    window.__diagHooked = ocrFill;
    var prev = ocrFill;
    ocrFill = function (auto) {
      var n = prev.apply(null, arguments);
      window.__ocrFilled = n;
      try { var _b = document.getElementById("ocrText"); if (_b && _b.value) { window.__lastOcrText = _b.value; } } catch (e) {}
      var skipped = window.__ocrSkipped || 0;
      if (skipped > 0 || n === 0) {
        var msg = "识别到文字：已填入 " + n + " 项" + (skipped > 0 ? ("，跳过不可靠 " + skipped + " 项") : "") + (n === 0 ? "（可能是这份内容里没有可对应字段，请点「诊断信息」按钮把情况发我）" : "。请核对后保存。");
        setTimeout(function () { try { ocrSay(msg); } catch (e) {} }, 30);
      }
      return n;
    };
  }
  window.addEventListener("load", function () { setTimeout(function () { clickPick(); addDiagButton(); hookFill(); }, 1400); });
  document.addEventListener("click", function () { setTimeout(function () { addDiagButton(); hookFill(); }, 60); }, true);
})();

/* ---------------- 文本净化与字段后处理（第四层） ---------------- */
(function () {
  var BS = String.fromCharCode(92);
  var NL = String.fromCharCode(10);
  var RE_LIT = new RegExp(BS + "n|" + BS + "r|" + BS + "t|" + BS + "s", "g");
  function cleanText(s) {
    var t = String(s == null ? "" : s);
    t = t.replace(RE_LIT, " ");
    t = t.replace(/[ \t]{2,}/g, " ");
    return t;
  }
  function cleanDiagnosis(v) {
    var s = String(v == null ? "" : v).trim();
    s = s.replace(/[0-9]{1,2}\s*[.、)）]\s*/g, " ");
    s = s.replace(/[（(]\s*(os|od|ou|OS|OD|OU|右眼|左眼|双眼)\s*[)）]/gi, " ");
    s = s.replace(/[ \t]{2,}/g, " ");
    s = s.replace(/^[\s,，、;；:：]+/, "").replace(/[\s,，、;；:：]+$/, "");
    return s;
  }
  function splitDiag(v) {
    return String(v || "").split(/[0-9]{1,2}\s*[.、)）]|[,，、;；]/).map(cleanDiagnosis).filter(function (x) { return x && x.replace(/\s/g, "").length >= 2; });
  }
  function cleanExamDetails(v) {
    var s = cleanText(v);
    var lines = s.split(NL).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var kept = [];
    var started = false;
    lines.forEach(function (line) {
      if (/住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱|出院诊断|出院小结/.test(line)) { return; }
      var idx = line.search(/右眼|左眼/);
      if (!started) {
        if (idx >= 0) { started = true; kept.push(line.slice(idx)); }
        return;
      }
      kept.push(line);
    });
    var out = kept.join(NL).trim();
    var cut = out.search(/住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱/);
    if (cut > 0) { out = out.slice(0, cut); }
    return out.trim();
  }
  function looksLikeExam(v) { return /(专科检查|专科查体|结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|Vod|Vos|mmHg|眼压)/i.test(String(v || "")); }
  function guessChief(raw) {
    var s = cleanText(raw);
    var m = s.match(/[患者者]因([^。；;]{4,60})/);
    if (m) { return m[1].replace(/左手眼|左眼|右眼|双眼/g, function (x) { return x; }).replace(/[，,]+\s*$/, "").replace(/入[院院].*$/, "").trim(); }
    var m2 = s.match(/主诉\s*[:：]?\s*([^。；;]{4,60})/);
    return m2 ? m2[1].trim() : "";
  }
  function install() {
    if (typeof window.ocrClean === "function" && !window.ocrClean.__polished) {
      var pc = window.ocrClean;
      window.ocrClean = function (raw) { return cleanText(pc.apply(null, arguments)); };
      window.ocrClean.__polished = true;
    }
    if (typeof window.ocrSetField === "function" && !window.ocrSetField.__polished) {
      var ps = window.ocrSetField;
      window.ocrSetField = function (id, value) {
        try {
          if (id === "recordDiagnosis") {
            var parts = splitDiag(value);
            if (!parts.length) { return false; }
            var ok = ps.call(null, id, parts[0]);
            var rest = parts.slice(1);
            if (rest.length && typeof secondaryDiagnoses !== "undefined" && secondaryDiagnoses && secondaryDiagnoses.push) {
              rest.forEach(function (x) { if (secondaryDiagnoses.indexOf(x) < 0) { secondaryDiagnoses.push(x); } });
              if (typeof renderSecondary === "function") { renderSecondary(); }
            }
            return ok;
          }
          if (id === "examDetails") {
            var cd = cleanExamDetails(value);
            if (cd.replace(/\s/g, "").length < 4) { return false; }
            return ps.call(null, id, cd);
          }
          if (id === "generalAdmission" || id === "generalAfter") {
            if (looksLikeExam(value)) { return false; }
            return ps.call(null, id, cleanText(value));
          }
          if (id === "examVisionOd" || id === "examVisionOs" || id === "examVisionCorrOd" || id === "examVisionCorrOs") {
            return ps.call(null, id, String(value == null ? "" : value).replace(/\s+/g, ""));
          }
          return ps.call(null, id, (typeof value === "string") ? cleanText(value) : value);
        } catch (e) { return false; }
      };
      window.ocrSetField.__polished = true;
    }
    if (typeof ocrFill === "function" && !ocrFill.__polished) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        try {
          var cc = document.getElementById("chiefComplaint");
          var box = document.getElementById("ocrText");
          if (cc && box && !String(cc.value || "").trim()) {
            var g = guessChief(box.value);
            if (g) { cc.value = g; n = (n || 0) + 1; }
          }
        } catch (e) {}
        return n;
      };
      ocrFill.__polished = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(install, 1000); setTimeout(install, 2500); });
  document.addEventListener("click", function () { setTimeout(install, 80); }, true);
})();
/* ---------------- 文本净化与字段后处理（第五层：修正第四层） ---------------- */
(function () {
  var BS = String.fromCharCode(92);
  var NL = String.fromCharCode(10);
  var RE_LIT = new RegExp(BS + BS + "n|" + BS + BS + "r|" + BS + BS + "t", "g");
  function cleanText(s) {
    var t = String(s == null ? "" : s);
    t = t.replace(RE_LIT, " ");
    t = t.replace(/[ \t]{2,}/g, " ");
    return t;
  }
  function cleanOne(v) {
    var s = String(v == null ? "" : v).trim();
    s = s.replace(/[0-9]{1,2}\s*[.、)）]\s*/g, " ");
    s = s.replace(/[（(]\s*(os|od|ou|OS|OD|OU|右眼|左眼|双眼)\s*[)）]/gi, " ");
    s = s.replace(/[ \t]{2,}/g, " ");
    s = s.replace(/^[\s,，、;；:：]+/, "").replace(/[\s,。，、;；:：]+$/, "");
    return s;
  }
  function diagParts(v) {
    var s = cleanText(v);
    var out = [];
    s.split(NL).forEach(function (line) {
      line.split(/[0-9]{1,2}\s*[.、)）]|[,，、;；]/).forEach(function (piece) {
        var x = cleanOne(piece);
        if (x && x.replace(/\s/g, "").length >= 2 && x.length <= 24 && !/[。！？!?]/.test(x)) { out.push(x); }
      });
    });
    return out;
  }
  function examFrom(text) {
    var s = cleanText(text);
    var lines = s.split(NL).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var kept = [];
    lines.forEach(function (line) {
      if (/(住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱|出院诊断|出院小结|既往|个人史|家族史)/.test(line)) { return; }
      var idx = line.search(/右眼|左眼/);
      if (idx >= 0) { kept.push(line.slice(idx)); }
      else if (kept.length && /(结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|眼压|视力)/.test(line)) { kept.push(line); }
    });
    if (!kept.length) {
      lines.forEach(function (line) { if (/(结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|视网膜|黄斑)/.test(line) && !/(既往|个人史|家族史)/.test(line)) { kept.push(line); } });
    }
    var out = kept.join(NL).trim();
    var cut = out.search(/住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱/);
    if (cut > 0) { out = out.slice(0, cut); }
    return out.trim();
  }
  function pushSecondary(names) {
    try {
      if (typeof secondaryDiagnoses === "undefined" || !secondaryDiagnoses || !secondaryDiagnoses.push) { return; }
      names.forEach(function (x) { if (secondaryDiagnoses.indexOf(x) < 0) { secondaryDiagnoses.push(x); } });
      if (typeof renderSecondary === "function") { renderSecondary(); }
    } catch (e) {}
  }
  function install() {
    if (typeof window.ocrClean === "function" && !window.ocrClean.__p5) {
      var pc = window.ocrClean;
      window.ocrClean = function () { return cleanText(pc.apply(null, arguments)); };
      window.ocrClean.__p5 = true;
    }
    if (typeof window.ocrSetField === "function" && !window.ocrSetField.__p5) {
      var ps = window.ocrSetField;
      window.ocrSetField = function (id, value) {
        try {
          if (id === "recordDiagnosis") {
            var parts = diagParts(value);
            if (!parts.length) { return false; }
            var ok = ps.call(null, id, parts[0]);
            pushSecondary(parts.slice(1));
            return ok;
          }
          if (id === "examDetails") {
            var cd = examFrom(value);
            if (cd.replace(/\s/g, "").length < 4) {
              var box = document.getElementById("ocrText");
              cd = examFrom(box ? box.value : "");
            }
            if (cd.replace(/\s/g, "").length < 4) { return false; }
            return ps.call(null, id, cd);
          }
          return ps.call(null, id, value);
        } catch (e) { return false; }
      };
      window.ocrSetField.__p5 = true;
    }
    if (typeof ocrFill === "function" && !ocrFill.__p5) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        try {
          var box = document.getElementById("ocrText");
          if (box && box.value && RE_LIT.test(box.value)) { RE_LIT.lastIndex = 0; box.value = cleanText(box.value); }
          var cc = document.getElementById("chiefComplaint");
          if (cc && box && !String(cc.value || "").trim()) {
            var m = cleanText(box.value).match(/[患者者]因([^。；;]{4,60})/);
            if (m) { cc.value = m[1].replace(/入[院院].*$/, "").replace(/[，,]+\s*$/, "").trim(); n = (n || 0) + 1; }
          }
        } catch (e) {}
        return n;
      };
      ocrFill.__p5 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(install, 1200); setTimeout(install, 3000); });
  document.addEventListener("click", function () { setTimeout(install, 120); }, true);
})();
/* ---------------- 字段后处理（第六层：修正诊断/补充所见） ---------------- */
(function () {
  var BS = String.fromCharCode(92);
  var NL = String.fromCharCode(10);
  var RE_LIT = new RegExp(BS + BS + "n|" + BS + BS + "r|" + BS + BS + "t", "g");
  var STOP = /患者|主诉|现病史|既往|入院|专科|查体|治疗|手术|出院|住院|病史|查体|辅助检查/;
  function cleanText(s) { return String(s == null ? "" : s).replace(RE_LIT, " ").replace(/[ \t]{2,}/g, " "); }
  function cleanOne(v) {
    var s = String(v == null ? "" : v).trim();
    s = s.replace(/[0-9]{1,2}\s*[.、)）]\s*/g, " ");
    s = s.replace(/[（(]\s*(os|od|ou|OS|OD|OU|右眼|左眼|双眼)\s*[)）]/gi, " ");
    s = s.replace(/[ \t]{2,}/g, " ");
    s = s.replace(/^[\s,，、;；:：]+/, "").replace(/[\s,。，、;；:：]+$/, "");
    return s;
  }
  function cutNarrative(v) {
    var s = cleanOne(v);
    var m = s.search(STOP);
    if (m > 0) { s = s.slice(0, m); }
    return cleanOne(s);
  }
  function diagParts(v) {
    var s = cleanText(v);
    var out = [];
    s.split(NL).forEach(function (line) {
      line.replace(/[0-9]{1,2}\s*[.、)）]/g, "，").split(/[,，、;；]/).forEach(function (piece) {
        var x = cutNarrative(piece);
        if (x && x.replace(/\s/g, "").length >= 2 && x.length <= 24 && !/[。！？!?]/.test(x)) { out.push(x); }
      });
    });
    return out;
  }
  function examFrom(text) {
    var lines = cleanText(text).split(NL).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var kept = [];
    lines.forEach(function (line) {
      if (/(住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱|出院诊断|出院小结|既往|个人史|家族史|主诉)/.test(line)) { return; }
      var idx = line.search(/右眼|左眼/);
      if (idx >= 0) { kept.push(line.slice(idx)); }
      else if (kept.length && /(结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|眼压)/.test(line)) { kept.push(line); }
    });
    var out = kept.join(NL).trim();
    var cut = out.search(/住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱/);
    if (cut > 0) { out = out.slice(0, cut); }
    return out.trim();
  }
  function hasBothEyes(s) { return s.indexOf("右眼") >= 0 && s.indexOf("左眼") >= 0; }
  function install() {
    if (typeof window.ocrSetField === "function" && !window.ocrSetField.__p6) {
      var ps = window.ocrSetField;
      window.ocrSetField = function (id, value) {
        try {
          if (id === "recordDiagnosis") {
            var parts = diagParts(value);
            if (!parts.length) { return false; }
            var ok = ps.call(null, id, parts[0]);
            var rest = parts.slice(1);
            if (rest.length) {
              try {
                if (typeof secondaryDiagnoses !== "undefined" && secondaryDiagnoses && secondaryDiagnoses.push) {
                  rest.forEach(function (x) { if (secondaryDiagnoses.indexOf(x) < 0) { secondaryDiagnoses.push(x); } });
                  if (typeof renderSecondary === "function") { renderSecondary(); }
                }
              } catch (e) {}
            }
            return ok;
          }
          if (id === "examDetails") {
            var box = document.getElementById("ocrText");
            var fromBox = box ? examFrom(box.value) : "";
            var direct = examFrom(value);
            var chosen = direct;
            if (hasBothEyes(fromBox) && !hasBothEyes(direct)) { chosen = fromBox; }
            if (chosen.replace(/\s/g, "").length < 4) { chosen = fromBox; }
            if (chosen.replace(/\s/g, "").length < 4) { return false; }
            return ps.call(null, id, chosen);
          }
          return ps.call(null, id, value);
        } catch (e) { return false; }
      };
      window.ocrSetField.__p6 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(install, 1400); setTimeout(install, 3200); });
  document.addEventListener("click", function () { setTimeout(install, 150); }, true);
})();
/* ---------------- 填表后最终校正（第七层） ---------------- */
(function () {
  var NL = String.fromCharCode(10);
  var STOP = /患者|主诉|现病史|既往|入院|专科|查体|治疗|手术|出院|住院|病史|辅助检查/;
  function dCleanOne(v) {
    var s = String(v == null ? "" : v).trim();
    s = s.replace(/[0-9]{1,2}\s*[.、)）]\s*/g, " ");
    s = s.replace(/[（(]\s*(os|od|ou|OS|OD|OU|右眼|左眼|双眼)\s*[)）]/gi, " ");
    s = s.replace(/[ \t]{2,}/g, " ");
    s = s.replace(/^[\s,，、;；:：]+/, "").replace(/[\s,。，、;；:：]+$/, "");
    return s;
  }
  function dParts(v) {
    var out = [];
    String(v == null ? "" : v).split(NL).forEach(function (line) {
      line.replace(/[0-9]{1,2}\s*[.、)）]/g, "，").split(/[,，、;；]/).forEach(function (piece) {
        var s = dCleanOne(piece);
        var m = s.search(STOP);
        if (m > 0) { s = dCleanOne(s.slice(0, m)); }
        if (s && s.replace(/\s/g, "").length >= 2 && s.length <= 24 && !/[。！？!?]/.test(s)) { out.push(s); }
      });
    });
    return out;
  }
  function examFrom(text) {
    var lines = String(text == null ? "" : text.replace(/[\r\t]/g, " ")).split(NL).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var kept = [];
    lines.forEach(function (line) {
      if (/(住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱|出院诊断|出院小结|既往|个人史|家族史|主诉)/.test(line)) { return; }
      var idx = line.search(/右眼|左眼/);
      if (idx >= 0) { kept.push(line.slice(idx)); }
      else if (kept.length && /(结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|眼压)/.test(line)) { kept.push(line); }
    });
    return kept.join(NL).trim();
  }
  function polish() {
    try {
      var box = document.getElementById("ocrText");
      var text = box ? box.value : "";
      var ed = document.getElementById("examDetails");
      if (ed) {
        var good = examFrom(text);
        if (good.replace(/\s/g, "").length >= 4) { ed.value = good; }
        else if (/(专科检查|结膜|角膜|前房|眼底)/.test(ed.value || "")) { ed.value = examFrom(ed.value); }
      }
      ["generalAdmission", "generalAfter"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && /(专科检查|结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|Vod|Vos|mmHg)/i.test(el.value || "")) { el.value = ""; }
      });
      var dg = document.getElementById("recordDiagnosis");
      var main = "";
      if (dg) { var parts = dParts(dg.value); if (parts.length) { main = parts[0]; dg.value = main; } }
      try {
        if (typeof secondaryDiagnoses !== "undefined" && secondaryDiagnoses && secondaryDiagnoses.length) {
          var cleaned = [];
          Array.prototype.slice.call(secondaryDiagnoses).forEach(function (x) {
            dParts(x).forEach(function (y) { if (y !== main && cleaned.indexOf(y) < 0) { cleaned.push(y); } });
          });
          secondaryDiagnoses.length = 0;
          cleaned.forEach(function (y) { secondaryDiagnoses.push(y); });
          if (typeof renderSecondary === "function") { renderSecondary(); }
        }
      } catch (e) {}
      ["examVisionOd", "examVisionOs", "examVisionCorrOd", "examVisionCorrOs"].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.value) { el.value = String(el.value).replace(/\s+/g, ""); }
      });
    } catch (e) {}
  }
  window.__polish = polish;
  function chain() {
    if (typeof ocrFill !== "function" || ocrFill.__p7) { return; }
    var pf = ocrFill;
    ocrFill = function () {
      var n = pf.apply(null, arguments);
      polish();
      return n;
    };
    ocrFill.__p7 = true;
  }
  window.addEventListener("load", function () { setTimeout(chain, 1600); setTimeout(chain, 3400); setTimeout(polish, 4000); });
  document.addEventListener("click", function () { setTimeout(chain, 180); }, true);
})();
/* ---------------- 第八层：OCR 字间空格还原 + 验光映射 ---------------- */
(function () {
  var CJK = "[一-龥]";
  function despace(s) {
    var x = String(s == null ? "" : s);
    x = x.replace(new RegExp("(" + CJK + ")[ ]+(?=" + CJK + ")", "g"), "$1");
    x = x.replace(new RegExp("(" + CJK + ")[ ]+(?=[0-9A-Za-z(（-])", "g"), "$1");
    x = x.replace(new RegExp("([0-9A-Za-z)）.、;；:：])[ ]+(?=" + CJK + ")", "g"), "$1");
    x = x.replace(new RegExp("([。，；：！？)）])[ ]+(?=" + CJK + ")", "g"), "$1");
    x = x.replace(/([0-9])[ ]+([.])/g, "$1$2");
    x = x.replace(/([.])[ ]+([0-9])/g, "$1$2");
    x = x.replace(/([-+])[ ]+([0-9])/g, "$1$2");
    x = x.replace(/[ ]{2,}/g, " ");
    return x;
  }
  function refractVals(text) {
    var s = String(text || ""), vals = [], m = null;
    var re1 = /加镜[ ]*([-+]?[0-9]+(?:[.][0-9]+)?)[ ]*DS/gi;
    while ((m = re1.exec(s))) { vals.push(m[1]); if (vals.length >= 2) { break; } }
    if (!vals.length) {
      var re2 = /验光[ ]*[:：]?[ ]*(?:OD|od|OS|os|右眼|左眼)?[ ]*([-+]?[0-9]+(?:[.][0-9]+)?)/g;
      while ((m = re2.exec(s))) { vals.push(m[1]); if (vals.length >= 2) { break; } }
    }
    return vals;
  }
  function applyRefraction(text) {
    try {
      var vals = refractVals(text);
      if (!vals.length) { return 0; }
      var n = 0;
      Array.prototype.forEach.call(document.querySelectorAll("input"), function (el) {
        var lab = el.closest ? el.closest("label") : null;
        var labText = lab ? String(lab.textContent || "") : "";
        if (labText.indexOf("验光") < 0) { return; }
        var v = /OS|os|左眼/.test(labText) ? vals[1] : (/OD|od|右眼/.test(labText) ? vals[0] : "");
        if (v && el.value !== v) { el.value = v; n = n + 1; }
      });
      return n;
    } catch (e) { return 0; }
  }
  function polish8() {
    try {
      var box = document.getElementById("ocrText");
      if (box && box.value) {
        var cleaned = despace(box.value);
        if (cleaned !== box.value) { box.value = cleaned; }
        applyRefraction(cleaned);
      }
    } catch (e) {}
  }
  window.__despace = despace;
  window.__polish8 = polish8;
  function chain() {
    if (typeof window.ocrClean === "function" && !window.ocrClean.__p8) {
      var pc = window.ocrClean;
      window.ocrClean = function () { return despace(pc.apply(null, arguments)); };
      window.ocrClean.__p8 = true;
    }
    if (typeof ocrFill === "function" && !ocrFill.__p8) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        polish8();
        return n;
      };
      ocrFill.__p8 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(chain, 1800); setTimeout(chain, 3600); setTimeout(polish8, 4200); });
  document.addEventListener("click", function () { setTimeout(chain, 200); }, true);
})();
/* ---------------- 第九层：标点/引号收尾 ---------------- */
(function () {
  function tidy(s) {
    var x = String(s == null ? "" : s);
    x = x.replace(/[ ]+([，。；：！？、）】》])/g, "$1");
    x = x.replace(/([（【《])[ ]+/g, "$1");
    return x;
  }
  function stripQuotes(s) {
    var x = String(s == null ? "" : s).trim();
    x = x.replace(/^[“”‘’「」『』《》]+/, "").replace(/[“”‘’「」『』《》]+$/, "");
    return x.trim();
  }
  function polish9() {
    try {
      var box = document.getElementById("ocrText");
      if (box && box.value) { var c = tidy(box.value); if (c !== box.value) { box.value = c; } }
      var cc = document.getElementById("chiefComplaint");
      if (cc && cc.value) { cc.value = stripQuotes(tidy(cc.value)); }
      var ed = document.getElementById("examDetails");
      if (ed && ed.value) { ed.value = tidy(ed.value); }
      var dg = document.getElementById("recordDiagnosis");
      if (dg && dg.value) { dg.value = stripQuotes(tidy(dg.value)); }
    } catch (e) {}
  }
  window.__polish9 = polish9;
  function chain() {
    if (typeof window.ocrClean === "function" && !window.ocrClean.__p9) {
      var pc = window.ocrClean;
      window.ocrClean = function () { return tidy(pc.apply(null, arguments)); };
      window.ocrClean.__p9 = true;
    }
    if (typeof ocrFill === "function" && !ocrFill.__p9) {
      var pf = ocrFill;
      ocrFill = function () { var n = pf.apply(null, arguments); polish9(); return n; };
      ocrFill.__p9 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(chain, 2000); setTimeout(chain, 3800); setTimeout(polish9, 4400); });
  document.addEventListener("click", function () { setTimeout(chain, 220); }, true);
})();
/* ---------------- 第十层：最终收尾（按字符码建规则，避免引号/标点差异） ---------------- */
(function () {
  function ch(n) { return String.fromCharCode(n); }
  var Q = [8220, 8221, 8216, 8217, 12302, 12303, 12300, 12301, 12298, 12299, 34, 39];
  var P = [65292, 12290, 65307, 65306, 65281, 65263, 12289, 65289, 12301, 12299, 44, 46, 59, 58, 33, 63, 41, 93];
  var O = [65288, 12300, 12298, 40, 91];
  var qClass = "[" + Q.map(ch).join("") + "]";
  var reLeadQ = new RegExp("^" + qClass + "+");
  var reTrailQ = new RegExp(qClass + "+$");
  var reSpaceBefore = new RegExp("[ ]+(?=[" + P.map(ch).join("") + "])", "g");
  var reSpaceAfterOpen = new RegExp("([" + O.map(ch).join("") + "])[ ]+", "g");
  function tidy(s) {
    var x = String(s == null ? "" : s);
    x = x.replace(reSpaceBefore, "");
    x = x.replace(reSpaceAfterOpen, "$1");
    x = x.replace(/[ ]{2,}/g, " ");
    return x;
  }
  function unquote(s) {
    var x = String(s == null ? "" : s).trim();
    x = x.replace(reLeadQ, "").replace(reTrailQ, "").trim();
    return x;
  }
  function examFrom(text) {
    var lines = String(text || "").split(String.fromCharCode(10)).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var kept = [];
    lines.forEach(function (line) {
      if (/(住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱|出院诊断|出院小结|既往|个人史|家族史|主诉|现病史|患者因|入院时|体格检查)/.test(line)) { return; }
      if (/(结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|眼压)/.test(line)) {
        var i = line.search(/右眼|左眼/);
        kept.push(i >= 0 ? line.slice(i) : line);
      }
    });
    var out = kept.join(String.fromCharCode(10)).trim();
    var cut = out.search(/住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱/);
    if (cut > 0) { out = out.slice(0, cut); }
    return out.trim();
  }
  function apply() {
    try {
      var box = document.getElementById("ocrText");
      if (box && box.value) { var c = tidy(box.value); if (c !== box.value) { box.value = c; } }
      var cc = document.getElementById("chiefComplaint");
      if (cc && cc.value) { cc.value = unquote(tidy(cc.value)); }
      var dg = document.getElementById("recordDiagnosis");
      if (dg && dg.value) { dg.value = unquote(tidy(dg.value)); }
      var ed = document.getElementById("examDetails");
      if (ed) {
        var src = examFrom(box ? box.value : "");
        if (src.replace(/\s/g, "").length >= 6) { ed.value = tidy(src); }
      }
    } catch (e) {}
  }
  window.__polish10 = apply;
  function chain() {
    if (typeof ocrFill === "function" && !ocrFill.__p10) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        apply();
        setTimeout(apply, 350);
        setTimeout(apply, 1500);
        return n;
      };
      ocrFill.__p10 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(chain, 2200); setTimeout(chain, 4000); setTimeout(apply, 4600); });
  document.addEventListener("click", function () { setTimeout(chain, 240); }, true);
})();
/* ---------------- 第十一层：按 id 直填视力/验光/眼压，并同步内部状态 ---------------- */
(function () {
  function setVal(id, v) {
    try { var el = document.getElementById(id); if (el && v) { el.value = String(v); return 1; } } catch (e) {}
    return 0;
  }
  function syncState() {
    try {
      if (typeof examState === "undefined" || !examState) { return; }
      var g = function (id) { var el = document.getElementById(id); return el ? String(el.value || "") : ""; };
      if (!examState.vision) { examState.vision = { od: "", os: "", corrOd: "", corrOs: "" }; }
      examState.vision.od = g("examVisionOd"); examState.vision.os = g("examVisionOs");
      examState.vision.corrOd = g("examVisionCorrOd"); examState.vision.corrOs = g("examVisionCorrOs");
      if (!examState.refraction) { examState.refraction = { od: "", os: "" }; }
      examState.refraction.od = g("examRefractionOd"); examState.refraction.os = g("examRefractionOs");
      if (!examState.iop) { examState.iop = { od: "", os: "" }; }
      examState.iop.od = g("examIopOd"); examState.iop.os = g("examIopOs");
    } catch (e) {}
  }
  function grab(text) {
    var s = String(text || ""), out = {};
    var m = null;
    m = s.match(/Vod[ ]*[:：]?[ ]*([0-9]+(?:[.][0-9]+)?|HM|FC|LP|NLP)[\s\S]{0,30}?加镜[ ]*([-+]?[0-9]+(?:[.][0-9]+)?)/i);
    if (m) { out.visionOd = m[1]; out.refOd = m[2]; }
    m = s.match(/Vos[ ]*[:：]?[ ]*([0-9]+(?:[.][0-9]+)?|HM|FC|LP|NLP)[\s\S]{0,30}?加镜[ ]*([-+]?[0-9]+(?:[.][0-9]+)?)/i);
    if (m) { out.visionOs = m[1]; out.refOs = m[2]; }
    if (!out.refOd || !out.refOs) {
      var vals = [], mm = null, re3 = /加镜[ ]*([-+]?[0-9]+(?:[.][0-9]+)?)[ ]*DS?/gi;
      while ((mm = re3.exec(s))) { vals.push(mm[1]); if (vals.length >= 2) { break; } }
      if (!out.refOd && vals[0]) { out.refOd = vals[0]; }
      if (!out.refOs && vals[1]) { out.refOs = vals[1]; }
    }
    if (!out.visionOd) { m = s.match(/Vod[ ]*[:：]?[ ]*([0-9]+(?:[.][0-9]+)?|HM|FC|LP|NLP)/i); if (m) { out.visionOd = m[1]; } }
    if (!out.visionOs) { m = s.match(/Vos[ ]*[:：]?[ ]*([0-9]+(?:[.][0-9]+)?|HM|FC|LP|NLP)/i); if (m) { out.visionOs = m[1]; } }
    m = s.match(/Tod[ ]*[:：]?[ ]*([0-9]{1,2}(?:[.][0-9]+)?)/i); if (m) { out.iopOd = m[1]; }
    m = s.match(/Tos[ ]*[:：]?[ ]*([0-9]{1,2}(?:[.][0-9]+)?)/i); if (m) { out.iopOs = m[1]; }
    m = s.match(/Vod[\s\S]{0,40}?加镜[ ]*[-+]?[0-9]+(?:[.][0-9]+)?[ ]*DS[ ]*矫[正至][ ]*([0-9]+(?:[.][0-9]+)?|HM|FC|LP|NLP)/i);
    if (m) { out.corrOd = m[1]; }
    m = s.match(/Vos[\s\S]{0,40}?加镜[ ]*[-+]?[0-9]+(?:[.][0-9]+)?[ ]*DS[ ]*矫[正至][ ]*([0-9]+(?:[.][0-9]+)?|HM|FC|LP|NLP)/i);
    if (m) { out.corrOs = m[1]; }
    return out;
  }
  function applyVitals() {
    try {
      var box = document.getElementById("ocrText");
      if (!box || !box.value) { return 0; }
      var v = grab(box.value), n = 0;
      n += setVal("examRefractionOd", v.refOd);
      n += setVal("examRefractionOs", v.refOs);
      n += setVal("examVisionOd", v.visionOd);
      n += setVal("examVisionOs", v.visionOs);
      n += setVal("examVisionCorrOd", v.corrOd);
      n += setVal("examVisionCorrOs", v.corrOs);
      n += setVal("examIopOd", v.iopOd);
      n += setVal("examIopOs", v.iopOs);
      syncState();
      return n;
    } catch (e) { return 0; }
  }
  window.__applyVitals = applyVitals;
  window.__syncExamState = syncState;
  function chain() {
    if (typeof ocrFill === "function" && !ocrFill.__p11) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        applyVitals();
        setTimeout(applyVitals, 400);
        setTimeout(applyVitals, 1600);
        return n;
      };
      ocrFill.__p11 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(chain, 2400); setTimeout(chain, 4200); }, false);
  document.addEventListener("click", function () { setTimeout(chain, 260); }, true);
})();

/* ---------------- 第十二层：补充所见再校正（对字间空格健壮） ---------------- */
(function () {
  function examFrom2(text) {
    var lines = String(text || "").split(String.fromCharCode(10)).map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var kept = [];
    lines.forEach(function (line) {
      var flat = line.replace(/[ ]+/g, "");
      if (/(住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱|出院诊断|出院小结|既往|个人史|家族史|主诉|现病史|患者因|入院时|体格检查|就诊|入院日期|辅助检查|检查结果)/.test(flat)) { return; }
      if (/(结膜|角膜|前房|房水|瞳孔|晶状体|玻璃体|眼底|网膜|视网膜|黄斑|眼压)/.test(flat)) {
        var i = flat.search(/右眼|左眼/);
        kept.push(i >= 0 ? flat.slice(i) : flat);
      }
    });
    var out = kept.join(String.fromCharCode(10)).trim();
    var cut = out.search(/住院经过|入院经过|诊疗经过|治疗情况|手术经过|出院情况|出院医嘱/);
    if (cut > 0) { out = out.slice(0, cut); }
    return out.trim();
  }
  function apply12() {
    try {
      var box = document.getElementById("ocrText");
      var ed = document.getElementById("examDetails");
      if (!box || !ed) { return; }
      var v = examFrom2(box.value);
      if (v.replace(/\s/g, "").length >= 6) { ed.value = v; }
    } catch (e) {}
  }
  window.__polish12 = apply12;
  function chain() {
    if (typeof ocrFill === "function" && !ocrFill.__p12) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        apply12();
        setTimeout(apply12, 500);
        setTimeout(apply12, 1800);
        return n;
      };
      ocrFill.__p12 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(chain, 2600); setTimeout(chain, 4400); setTimeout(apply12, 5200); });
  document.addEventListener("click", function () { setTimeout(chain, 280); }, true);
})();

/* ---------------- 第十三层：她截图里那四类错误的专项修正 ---------------- */
(function () {
  function ch(n) { return String.fromCharCode(n); }
  var NL = ch(10);
  function isHeaderLike(v) {
    var s = String(v == null ? "" : v);
    if (!s) { return false; }
    if (/(姓名|病案号|住院号|床位|性别|年龄|科室|病区)/.test(s) && /(病案号|住院号|女士|先生|性别|姓名|\/|科室)/.test(s)) { return true; }
    if (s.replace(/\s/g, "").length > 34) { return true; }
    return false;
  }
  function cleanChief(v) {
    var s = String(v == null ? "" : v).trim();
    var m = s.search(/既往病?史|个人史|家族史|婚育史|月经史|手术史|过敏史/);
    if (m > 0) { s = s.slice(0, m); }
    s = s.replace(/[0-9]+[ ]*$/, "").trim();
    if (/未记录/.test(s)) { s = s.split("未记录")[0].trim(); }
    return s;
  }
  function looksExam(v) {
    return /(视力|眼压|矫正|晶状体|结膜|角膜|前房|房水|瞳孔|眼底|视网膜|黄斑|裂隙灯|Vod|Vos|OD|OS)/.test(String(v == null ? "" : v));
  }
  function grabVitals(text) {
    var s = String(text || ""), o = {};
    var m = s.match(/(?:查体所见|裸眼视力|视力)[ ]*OD[ ]*([0-9.]+|HM|FC|LP|NLP)[ ]*\/?[ ]*OS[ ]*([0-9.]+|HM|FC|LP|NLP)/i);
    if (m) { o.vOd = m[1]; o.vOs = m[2]; }
    m = s.match(/矫正视力[ ]*OD[ ]*([0-9.]+|HM|FC|LP|NLP)[ ]*\/?[ ]*OS[ ]*([0-9.]+|HM|FC|LP|NLP)/i);
    if (m) { o.cOd = m[1]; o.cOs = m[2]; }
    m = s.match(/眼压[ ]*([0-9]{1,2}(?:[.][0-9]+)?)[ ]*[\/][ ]*([0-9]{1,2}(?:[.][0-9]+)?)/);
    if (m) { o.iOd = m[1]; o.iOs = m[2]; }
    return o;
  }
  function apply13() {
    try {
      var box = document.getElementById("ocrText");
      var text = box ? box.value : "";
      var dg = document.getElementById("recordDiagnosis");
      if (dg && dg.value && isHeaderLike(dg.value)) { dg.value = ""; }
      var cc = document.getElementById("chiefComplaint");
      if (cc && cc.value) { cc.value = cleanChief(cc.value); }
      ["pastHistory", "generalAdmission", "generalAfter", "examDetails"].forEach(function (id) {
        var el = document.getElementById(id);
        if (!el || !el.value) { return; }
        if (id === "examDetails") { return; }
        if (looksExam(el.value)) { el.value = ""; }
      });
      var v = grabVitals(text);
      var set = function (id, val) { if (!val) { return; } var el = document.getElementById(id); if (el && el.value !== String(val)) { el.value = String(val); } };
      set("examVisionOd", v.vOd); set("examVisionOs", v.vOs);
      set("examVisionCorrOd", v.cOd); set("examVisionCorrOs", v.cOs);
      set("examIopOd", v.iOd); set("examIopOs", v.iOs);
      try { if (typeof window.__syncExamState === "function") { window.__syncExamState(); } } catch (e) {}
    } catch (e) {}
  }
  window.__polish13 = apply13;
  function chain() {
    if (typeof ocrFill === "function" && !ocrFill.__p13) {
      var pf = ocrFill;
      ocrFill = function () {
        var n = pf.apply(null, arguments);
        apply13();
        setTimeout(apply13, 600);
        setTimeout(apply13, 2000);
        return n;
      };
      ocrFill.__p13 = true;
    }
  }
  window.addEventListener("load", function () { setTimeout(chain, 2800); setTimeout(chain, 4600); setTimeout(apply13, 5400); });
  document.addEventListener("click", function () { setTimeout(chain, 300); }, true);
})();

/* ---------------- 第十四层：AI 结构化抽字段（适配任意新病历格式） ---------------- */
(function () {
  window.pushAiResult = function (ctx, content, cnt) {
    try {
      var o = document.getElementById("aiPreviewOut");
      if (o) { o.value = "【已发送（脱敏后）】" + String.fromCharCode(10) + ((ctx && ctx.masked) ? ctx.masked.text : "") + String.fromCharCode(10, 10) + "【AI 结构化结果：已填入 " + cnt + " 项】" + String.fromCharCode(10) + String(content || "").slice(0, 1200); }
      var st = document.getElementById("aiState");
      if (st) { st.textContent = "AI 已抽取并填入：" + cnt + " 项"; }
      try { toast("AI 已按新病历抽取并填入 " + cnt + " 项，请核对"); } catch (e) {}
      try { ocrSay("AI 已抽取关键字段并填入 " + cnt + " 项，请核对后保存。"); } catch (e) {}
    } catch (e) {}
  };
  function um(v, map) {
    var s = String(v == null ? "" : v);
    (map || []).forEach(function (p) { s = s.split(p[0]).join(p[1]); });
    return s;
  }
  function cleanDiag(v) {
    var s = um(v);
    s = s.replace(/[0-9]{1,2}[ ]*[.、)）][ ]*/g, "，");
    s = s.replace(/[（(][ ]*(os|od|ou|OS|OD|OU|右眼|左眼|双眼)[ ]*[)）]/g, " ");
    s = s.replace(/^[，,、;；:：\s]+/, "").replace(/[，,、;；:：\s]+$/, "");
    return s.trim();
  }
  function badHeader(v) { return /(姓名|病案号|住院号|床位|性别|年龄)/.test(String(v || "")) && /(病案号|住院号|女士|先生|性别|姓名|\/)/.test(String(v || "")); }
  window.__applyAiFields = function (f, map) {
    try {
      if (!f || typeof f !== "object") { return 0; }
      try { if (typeof ocrLastFill !== "undefined" && ocrLastFill) { Object.keys(ocrLastFill).forEach(function (fid) { var fe = document.getElementById(fid); if (fe && !fe.disabled) { fe.value = ""; } }); } } catch (e) {}
      var n = 0;
      var set = function (id, val) { if (val == null || !String(val).trim()) { return; } var el = document.getElementById(id); if (!el) { return; } el.value = String(val).trim(); n++; };
      set("patientName", um(f.patientName, map));
      set("patientNo", um(f.patientNo, map));
      set("patientGender", um(f.gender, map));
      set("patientAge", um(f.age, map));
      set("encounterDate", um(f.encounterDate, map));
      var dg = cleanDiag(f.diagnosis);
      if (dg && !badHeader(dg)) { set("recordDiagnosis", dg); }
      set("chiefComplaint", um(f.chiefComplaint, map));
      set("pastHistory", um(f.pastHistory, map));
      set("examDetails", um(f.examDetails, map));
      set("treatment", um(f.treatment, map));
      set("surgeryName", um(f.surgeryName, map));
      set("generalAdmission", um(f.generalAdmission, map));
      set("generalAfter", um(f.generalAfter, map));
      set("examVisionOd", um(f.visionOd, map)); set("examVisionOs", um(f.visionOs, map));
      set("examVisionCorrOd", um(f.corrOd, map)); set("examVisionCorrOs", um(f.corrOs, map));
      set("examRefractionOd", um(f.refractionOd, map)); set("examRefractionOs", um(f.refractionOs, map));
      set("examIopOd", um(f.iopOd, map)); set("examIopOs", um(f.iopOs, map));
      var eye = String(um(f.eye, map) || "").toUpperCase();
      if (/^(OD|OS|OU)$/.test(eye)) { var ee = document.getElementById("recordEye"); if (ee) { ee.value = eye; n++; } }
      try {
        var sec = f.secondary; if (typeof sec === "string") { sec = sec.split(/[，,、;；]/); }
        if (sec && sec.length && typeof secondaryDiagnoses !== "undefined" && secondaryDiagnoses && secondaryDiagnoses.push) {
          secondaryDiagnoses.length = 0;
          sec.forEach(function (x) { var y = cleanDiag(x); if (y && !badHeader(y)) { secondaryDiagnoses.push(y); } });
          if (typeof renderSecondary === "function") { renderSecondary(); }
        }
      } catch (e) {}
      try { if (typeof window.__syncExamState === "function") { window.__syncExamState(); } } catch (e) {}
      return n;
    } catch (e) { return 0; }
  };
})();

/* ---------------- 第十五层：手机独立模式（没有电脑服务时仍可用） ---------------- */
(function () {
  var LS_KEY = "localAiCfg_v1";
  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  if (!realFetch) { return; }
  function jres(obj) { return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve(obj); } }); }
  function readLocal() { try { return JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch (e) { return null; } }
  function writeLocal(o) { try { localStorage.setItem(LS_KEY, JSON.stringify(o)); } catch (e) {} }
  window.__localAiCfg = { read: readLocal, write: writeLocal };
  function okOnly(p) { return p.then(function (r) { if (r && typeof r.status === "number" && (r.status < 200 || r.status >= 300)) { throw new Error("http " + r.status); } return r; }); }
  function directAI(cfg, body) {
    var payload = { model: cfg.model || "deepseek-chat", messages: (body && body.messages) || [], temperature: 0.2, stream: false };
    var url = cfg.base || "https://api.deepseek.com/v1/chat/completions";
    return realFetch(url, { method: "POST", headers: { "content-type": "application/json", "authorization": "Bearer " + (cfg.key || "") }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (d) { var txt = ""; try { txt = d.choices[0].message.content || ""; } catch (e) {} return jres({ ok: true, status: 200, content: txt }); })
      .catch(function (e) { return jres({ ok: false, status: 0, error: String((e && e.message) || e) }); });
  }
  window.fetch = function (url, opt) {
    var u = String(url || "");
    var path = u.replace(/^[a-z]+:\/\/[^/]+/i, "");
    if (path.charAt(0) !== "/") { path = "/" + path; }
    var m = String((opt && opt.method) || "GET").toUpperCase();
    try {
      if (path.indexOf("/api/ai/config") === 0) {
        if (m === "POST") {
          var sendBody = (opt && opt.body) || "{}";
          return okOnly(realFetch(url, opt)).catch(function () {
            try {
              var b = JSON.parse(sendBody); var cur = readLocal() || {};
              if (b.clearKey) { delete cur.key; } else { if (b.base) { cur.base = b.base; } if (b.model) { cur.model = b.model; } if (b.scope) { cur.scope = b.scope; } if (b.key) { cur.key = b.key; } }
              writeLocal(cur);
            } catch (e) {}
            return jres({ ok: true, status: 200, local: true });
          });
        }
        return okOnly(realFetch(url, opt)).then(function (r) {
          return r.json().then(function (d) {
            if (d && d.configured) { return { ok: true, status: 200, json: function () { return Promise.resolve(d); } }; }
            var l = readLocal();
            if (l && l.key) { return jres({ configured: true, base: l.base, model: l.model, scope: l.scope, local: true, keyTail: String(l.key).slice(-4) }); }
            return jres(d || { configured: false });
          });
        }).catch(function () {
          var l = readLocal();
          if (l && l.key) { return jres({ configured: true, base: l.base, model: l.model, scope: l.scope, local: true, keyTail: String(l.key).slice(-4) }); }
          return jres({ configured: false, local: true });
        });
      }
      if (path.indexOf("/api/ai") === 0) {
        return okOnly(realFetch(url, opt)).catch(function () {
          var l = readLocal();
          if (!l || !l.key) { return jres({ ok: false, status: 0, error: "本机未保存 API Key" }); }
          var b = {}; try { b = JSON.parse((opt && opt.body) || "{}"); } catch (e) {}
          return directAI(l, b);
        });
      }
      if (path.indexOf("/api/records") === 0) {
        return okOnly(realFetch(url, opt)).catch(function () { return jres({ ok: true, status: 200, offline: true }); });
      }
    } catch (e) {}
    return okOnly(realFetch(url, opt));
  };
})();

/* ---------------- 第十六层：手机与电脑同步（记住电脑地址，自动把 api/* 转到电脑） ---------------- */
(function () {
  var LS = "pcSyncAddr_v1";
  function getAddr() { try { return String(localStorage.getItem(LS) || "").replace(/\/+$/, ""); } catch (e) { return ""; } }
  function setAddr(v) { try { localStorage.setItem(LS, String(v || "").replace(/\/+$/, "")); } catch (e) {} }
  var rf = window.fetch ? window.fetch.bind(window) : null;
  if (!rf) { return; }
  function normPath(u) { var p = String(u).replace(/^[a-z]+:\/\/[^/]+/i, ""); if (p.charAt(0) !== "/") { p = "/" + p; } return p; }
  window.fetch = function (url, opt) {
    try {
      var a = getAddr();
      var u = String(url || "");
      var p = normPath(u);
      if (a && /^\/api\//.test(p) && u.indexOf(a) !== 0) {
        var q = u.indexOf("?") >= 0 ? u.slice(u.indexOf("?")) : "";
        return rf(a + p + q, opt);
      }
    } catch (e) {}
    return rf(url, opt);
  };
  window.__pcSync = { get: getAddr, set: setAddr, test: function (addr) { return rf(String(addr).replace(/\/+$/, "") + "/api/records", { method: "GET" }).then(function (r) { return r.ok; }); } };
  function mkBtn() {
    try {
      if (!document.body || document.getElementById("m16Sync")) { return; }
      var b = document.createElement("button");
      b.id = "m16Sync";
      b.type = "button";
      b.textContent = getAddr() ? "同步到电脑" : "设置电脑同步";
      b.style.cssText = "position:fixed;right:12px;bottom:14px;z-index:99998;padding:10px 14px;border-radius:22px;border:0;background:#2f6fed;color:#fff;font-size:13px;box-shadow:0 2px 10px rgba(0,0,0,.25)";
      b.addEventListener("click", function () {
        var cur = getAddr();
        var v = window.prompt("请输入电脑的地址（启动服务时黑窗口里显示的那个，形如 http://192.168.1.23:4173）", cur || "http://");
        if (v === null) { return; }
        v = String(v).trim().replace(/\/+$/, "");
        if (!v || v === "http:") { return; }
        setAddr(v);
        if (window.confirm("记住这个地址了。现在重新载入并与电脑同步？")) { location.reload(); }
      });
      document.body.appendChild(b);
    } catch (e) {}
  }
  window.addEventListener("load", function () { setTimeout(mkBtn, 2000); setTimeout(mkBtn, 4500); });
})();