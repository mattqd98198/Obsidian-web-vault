# 🔄 GitHub同步配置指南

## 📋 配置概览

本指南将帮助你将Obsidian vault同步到GitHub，实现云端备份和跨设备同步。

### 配置流程
1. ✅ Git基础配置 - 已完成
2. 🔗 创建GitHub仓库
3. 📝 设置远程仓库
4. ⚙️ 配置同步脚本
5. 🧪 测试同步功能

## 🚀 快速开始

### 方法一：GitHub网页界面创建仓库

1. **登录GitHub**
   - 访问 https://github.com
   - 登录你的GitHub账户

2. **创建新仓库**
   - 点击右上角的 "+" 号
   - 选择 "New repository"
   - 填写仓库信息：
     - **Repository name**: `obsidian-vault` (或你喜欢的名称)
     - **Description**: `My Obsidian knowledge vault`
     - **Public/Private**: 选择 `Public` (免费) 或 `Private` (付费)
     - **Initialize with README**: 勾选

3. **获取仓库URL**
   - 创建成功后，复制仓库URL：
   ```
   https://github.com/你的用户名/obsidian-vault.git
   ```

### 方法二：使用GitHub CLI创建仓库

如果你安装了GitHub CLI，可以使用命令行创建：

```bash
# 安装GitHub CLI（如果还没有安装）
# Windows: winget install GitHub.cli
# macOS: brew install gh

# 登录GitHub
gh auth login

# 创建仓库
gh repo create obsidian-vault --public --source=. --remote=origin --push
```

## 🔧 远程仓库配置

### 配置远程仓库

使用以下命令配置远程仓库：

```bash
# 添加远程仓库（替换为你的实际URL）
git remote add origin https://github.com/你的用户名/obsidian-vault.git

# 验证远程仓库配置
git remote -v
```

### 推送初始代码

```bash
# 添加所有文件到Git
git add .

# 创建初始提交
git commit -m "初始化Obsidian vault"

# 推送到GitHub
git push -u origin main
```

## ⚙️ 高级配置

### 自动同步脚本

#### Windows批处理脚本 (sync.bat)

```batch
@echo off
echo 正在同步Obsidian vault到GitHub...
echo.

cd /d "E:\Obsidian vault\My ault for ob"

echo 1. 检查Git状态...
git status

echo.
echo 2. 添加所有更改...
git add .

echo.
echo 3. 提交更改...
set COMMIT_MSG=自动同步 %date% %time%
git commit -m "%COMMIT_MSG%"

echo.
echo 4. 推送到GitHub...
git push origin main

echo.
echo 同步完成！
echo.

pause
```

#### PowerShell脚本 (sync.ps1)

```powershell
# GitHub同步脚本
Write-Host "🔄 正在同步Obsidian vault到GitHub..." -ForegroundColor Green

# 切换到vault目录
Set-Location "E:\Obsidian vault\My ault for ob"

Write-Host "📋 检查Git状态..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "➕ 添加所有更改..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 提交更改..." -ForegroundColor Yellow
$commitMessage = "自动同步 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m "$commitMessage"

Write-Host ""
Write-Host "🚀 推送到GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ 同步完成！" -ForegroundColor Green
Write-Host ""

# 显示最终状态
Write-Host "📊 最终状态：" -ForegroundColor Cyan
git status
```

### 设置计划任务

#### Windows计划任务配置

1. **打开任务计划程序**
   - Win + R，输入 `taskschd.msc`
   - 或者搜索"任务计划程序"

2. **创建基本任务**
   - 右侧"创建基本任务"
   - 名称：`Obsidian GitHub Sync`
   - 描述：`自动同步Obsidian vault到GitHub`

3. **触发器设置**
   - 选择"每天"
   - 设置时间：例如每天晚上22:00
   - 重复间隔：1天

4. **操作设置**
   - 选择"启动程序"
   - 程序或脚本：`powershell.exe`
   - 参数：`-ExecutionPolicy Bypass -File "E:\Obsidian vault\My ault for ob\sync.ps1"`

5. **完成设置**
   - 点击"完成"
   - 可以右键任务选择"运行"测试

### Git配置优化

#### .gitconfig 用户配置

```bash
# 设置全局用户信息
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub邮箱"

# 设置推送策略
git config --global push.default simple

# 设置自动换行符
git config --global core.autocrlf true

# 设置颜色
git config --global color.ui auto

# 设置别名（方便使用）
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.pull "pull --rebase"
```

#### Git钩子配置

创建 ` .git/hooks/pre-commit ` 文件，添加预提交检查：

```bash
#!/bin/bash
# 预提交检查

echo "🔍 运行预提交检查..."

# 检查是否有大文件
large_files=$(git diff --cached --name-only | xargs -I {} sh -c 'if [ $(wc -c < "{}") -gt 10485760 ]; then echo "{}"; fi')
if [ ! -z "$large_files" ]; then
    echo "⚠️  警告：以下文件较大(>10MB)："
    echo "$large_files"
    echo "建议：这些文件应该被忽略或在.gitignore中设置"
fi

# 检查是否有敏感信息
sensitive_patterns="password|secret|key|token|api_key"
sensitive_files=$(git diff --cached --name-only | xargs grep -l "$sensitive_patterns" 2>/dev/null)
if [ ! -z "$sensitive_files" ]; then
    echo "⚠️  警告：以下文件可能包含敏感信息："
    echo "$sensitive_files"
    echo "请检查这些文件是否需要被忽略"
fi

echo "✅ 预提交检查完成"
```

## 🔒 安全配置

### GitHub访问令牌

为了更高的安全性，建议使用GitHub访问令牌而不是密码：

1. **创建访问令牌**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 点击 "Generate new token"
   - 设置：
     - **Note**: `Obsidian Sync`
     - **Expiration**: 30天
     - **Scopes**: 勾选 `repo` (完整仓库访问权限)

2. **使用令牌**
   - 推送时使用令牌而不是密码：
   ```bash
   git push https://你的用户名:你的令牌@github.com/你的用户名/obsidian-vault.git
   ```

### SSH密钥配置

#### 生成SSH密钥

```bash
# 生成SSH密钥对
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动ssh-agent
eval "$(ssh-agent -s)"

# 添加私钥到ssh-agent
ssh-add ~/.ssh/id_ed25519

# 复制公钥到剪贴板
clip < ~/.ssh/id_ed25519.pub
```

#### 配置GitHub SSH密钥

1. 复制公钥内容
2. GitHub → Settings → SSH and GPG keys → New SSH key
3. 粘贴公钥内容
4. 测试SSH连接：
   ```bash
   ssh -T git@github.com
   ```

## 📊 同步策略

### 分支策略

```bash
# 创建同步分支
git checkout -b sync

# 设置远程同步分支
git push -u origin sync
```

### 标签策略

```bash
# 创建版本标签
git tag -a v1.0.0 -m "版本1.0.0"

# 推送标签
git push origin --tags
```

### 冲突解决

#### 拉取时的冲突处理

```bash
# 拉取最新更改
git pull origin main

# 如果有冲突，手动解决后：
git add .
git commit -m "解决冲突"
git push origin main
```

## 🧪 测试同步功能

### 测试步骤

1. **初始推送测试**
   ```bash
   git add .
   git commit -m "初始提交测试"
   git push origin main
   ```

2. **修改测试**
   ```bash
   # 创建一个测试文件
   echo "测试内容" > test.md
   git add test.md
   git commit -m "添加测试文件"
   git push origin main
   ```

3. **拉取测试**
   ```bash
   git pull origin main
   ```

### 验证同步

1. **检查GitHub仓库**
   - 访问GitHub仓库页面
   - 确认文件已上传

2. **检查本地状态**
   ```bash
   git status
   git log --oneline
   ```

## 🚨 故障排除

### 常见问题

#### 1. 认证失败
```bash
# 解决方案：使用访问令牌
git remote set-url origin https://你的用户名:你的令牌@github.com/你的用户名/obsidian-vault.git
```

#### 2. 文件过大
```bash
# 检查大文件
git ls-files | xargs ls -lh | grep -E ' ([0-9]+\.[0-9]+[A-Za-z]) '

# 添加到.gitignore并删除跟踪
git rm --cached 大文件名
git add .gitignore
```

#### 3. 合并冲突
```bash
# 拉取并重新合并
git pull origin main --rebase
# 手动解决冲突
git add .
git rebase --continue
```

### 日志查看

```bash
# 查看详细日志
git log --oneline --graph --all

# 查看远程仓库信息
git remote -v

# 查看分支信息
git branch -a
```

## 🎯 最佳实践

### 定期维护
1. **每周检查**：检查同步状态
2. **每月清理**：清理不需要的文件
3. **季度备份**：创建重要版本的标签

### 性能优化
1. **忽略大文件**：在.gitignore中设置
2. **使用SSH**：提高推送速度
3. **分批提交**：避免大文件提交

### 安全考虑
1. **使用令牌**：避免直接使用密码
2. **定期更新**：定期更新访问令牌
3. **权限控制**：使用Private仓库保护敏感数据

---

*GitHub同步配置指南 | 创建于 2026-01-16*