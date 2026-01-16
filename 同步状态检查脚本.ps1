# GitHub同步状态检查脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "     GitHub同步状态检查" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 切换到vault目录
try {
    Set-Location "E:\Obsidian vault\My ault for ob"
    Write-Host "✅ 已切换到vault目录" -ForegroundColor Green
}
catch {
    Write-Host "❌ 无法切换到vault目录" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "📊 当前Git状态：" -ForegroundColor Yellow
git status
Write-Host ""

Write-Host "📝 最近5次提交记录：" -ForegroundColor Yellow
git log --oneline -5
Write-Host ""

Write-Host "🌐 远程仓库信息：" -ForegroundColor Yellow
git remote -v
Write-Host ""

Write-Host "🌿 当前分支：" -ForegroundColor Yellow
git branch -a
Write-Host ""

Write-Host "📋 配置信息：" -ForegroundColor Yellow
Write-Host "用户名: $(git config user.name)" -ForegroundColor White
Write-Host "邮箱: $(git config user.email)" -ForegroundColor White
Write-Host "默认分支: $(git config init.defaultBranch)" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Git版本：" -ForegroundColor Yellow
git --version
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "检查完成于 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan