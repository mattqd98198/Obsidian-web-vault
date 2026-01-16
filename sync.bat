@echo off
chcp 65001 >nul
echo.
echo ========================================
echo     Obsidian GitHub 同步工具
echo ========================================
echo.

cd /d "E:\Obsidian vault\My ault for ob"

echo 📋 正在检查Git状态...
git status
echo.

echo ➕ 正在添加所有更改...
git add .
echo.

echo 💾 正在提交更改...
set COMMIT_MSG=自动同步 %date% %time%
git commit -m "%COMMIT_MSG%"
echo.

echo 🚀 正在推送到GitHub...
git push origin main
echo.

echo ✅ 同步完成！
echo.

echo 📊 最终状态：
git status
echo.

pause