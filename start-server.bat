@echo off
cd /d "D:\Administrator\Documents\ChatGPT\AI方面"
title 病历服务 - 关闭本窗口即停止服务
echo ====================================================
echo   病历识别服务
echo   手机一定要和这台电脑连同一个 wifi
echo   下面第二行就是要在手机里填的地址（电脑地址）
echo ====================================================
set MYIP=
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do if not defined MYIP set MYIP=%%a
echo   电脑地址： http://%MYIP%:4173
echo   本机地址： http://127.0.0.1:4173
echo ====================================================
netstat -ano | findstr /c:":4173" | findstr /c:"LISTENING" >nul
if %errorlevel%==0 goto already
echo 正在启动服务...
node server.js
goto end
:already
echo 服务已经在运行中（无需重复启动）
start "" http://127.0.0.1:4173
:end
echo.
echo 如果上面出现 error，把这一屏拍照发给小助手
pause
