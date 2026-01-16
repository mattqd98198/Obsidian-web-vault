# Obsidian Vault

这是我的Obsidian知识库，使用GitHub进行版本控制和同步。

## 📁 目录结构

```
vault/
├── 01-Inbox/           # 收集箱
│   ├── 网页剪藏/       # Clipper剪藏内容
│   ├── 未分类/        # 临时内容
│   └── 待处理/        # 需要处理的内容
├── 02-Projects/        # 项目相关
├── 03-Resources/       # 参考资料
├── 04-Archive/        # 归档内容
├── Templates/         # 模板文件
├── Tags/             # 标签管理
├── .obsidian/        # Obsidian配置
└── 其他笔记文件...
```

## 🔄 同步配置

### 自动同步脚本
- `sync.bat` - Windows批处理同步脚本
- `sync.ps1` - PowerShell同步脚本
- `同步状态检查脚本.ps1` - 状态检查脚本

### 使用方法
```bash
# 手动同步
./sync.bat        # Windows
./sync.ps1         # PowerShell

# 检查状态
./同步状态检查脚本.ps1
```

## 🛠️ 插件配置

### 已安装插件
- **Clipper** - 网页剪藏工具
- **Tag Group Manager** - 标签组管理
- **Local Files** - 文件管理增强
- **Calendar** - 日历视图
- **Dataview** - 数据查询

### 配置文件
- `.obsidian/plugins/` - 插件配置
- `Templates/` - 笔记模板
- `Tags/` - 标签管理指南

## 📝 使用规范

### 文件命名
- 使用日期前缀：`YYYY-MM-DD_标题.md`
- 使用英文或拼音，避免特殊字符
- 文件名简洁明了

### 标签使用
- 使用`#标签名`格式
- 遵循标签分类体系
- 每个笔记至少2-3个标签

### 内容分类
- **01-Inbox**: 收集和临时内容
- **02-Projects**: 项目相关内容
- **03-Resources**: 参考资料
- **04-Archive**: 已归档内容

## 🔧 Git配置

### 忽略文件
- `.gitignore` - Git忽略规则
- `.obsidian/` - Obsidian配置目录
- 大文件和临时文件

### 同步策略
- 使用`main`分支作为主分支
- 定期提交和推送
- 使用描述性的提交信息

## 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/你的用户名/obsidian-vault.git
   ```

2. **打开Obsidian**
   - 选择克隆的仓库作为vault
   - 重新安装所需插件

3. **设置同步**
   - 配置GitHub个人访问令牌
   - 运行同步脚本测试

## 📊 统计信息

- **总文件数**: 待统计
- **总标签数**: 待统计
- **最后同步**: 待更新
- **GitHub仓库大小**: 待统计

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个知识库。

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [Obsidian官网](https://obsidian.md/)
- [GitHub同步指南](GitHub同步配置指南.md)
- [Clipper配置指南](Clipper使用检查清单.md)
- [Tag Group Manager指南](Tag Group Manager使用检查清单.md)

---

*最后更新: 2026-01-16*
*维护者: Claudian Assistant*