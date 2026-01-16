# GitHub同步脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     Obsidian GitHub 同步工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 切换到vault目录
try {
    Set-Location "E:\Obsidian vault\My ault for ob"
    Write-Host "✅ 已切换到vault目录" -ForegroundColor Green
}
catch {
    Write-Host "❌ 无法切换到vault目录" -ForegroundColor Red
    Write-Host "请检查路径是否正确: E:\Obsidian vault\My ault for ob" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "📋 正在检查Git状态..." -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "➕ 正在添加所有更改..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 正在提交更改..." -ForegroundColor Yellow
$commitMessage = "自动同步 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m "$commitMessage"

Write-Host ""
Write-Host "🚀 正在推送到GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ 同步完成！" -ForegroundColor Green

Write-Host ""
Write-Host "📊 最终状态：" -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "同步完成于 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""