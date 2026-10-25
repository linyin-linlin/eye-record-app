@echo off
cd /d "D:\Administrator\Documents\ChatGPT\AI·½Ãæ"
title Push code to GitHub
echo ==================================================
echo  If a GitHub sign-in window or page appears, sign in and click Authorize.
echo  Wait until you see:  main -^> main
echo  If you see the word error, take a photo of this window.
echo ==================================================
echo.
git remote -v
echo.
git push -u origin main
echo.
echo ---------- result above ----------
pause
