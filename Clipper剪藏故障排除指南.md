# 🔧 Obsidian Web Clipper剪藏故障排除指南

## 🚨 问题诊断

### 常见症状
- ✅ 剪藏时图片正常保存
- ❌ 文字内容没有保存
- ❅ 生成的内容为空或只有部分内容

### 可能原因分析

#### 1. 内容选择器问题
**症状**: 内容选择器没有找到正确的文章区域
**解决**: 检查并更新`contentSelector`配置

#### 2. 网站结构特殊
**症状**: 特定网站剪藏失败，其他网站正常
**解决**: 针对特定网站添加自定义选择器

#### 3. 剪藏模式设置
**症状**: 使用了不合适的剪藏模式
**解决**: 切换到"full"模式

#### 4. 网站反爬机制
**症状**: 某些网站无法正确提取内容
**解决**: 调整请求头和延迟设置

## 🔧 解决方案

### 方案1: 优化内容选择器

**当前配置**:
```json
"contentSelector": "article, .content, main, .post-content, .entry-content, .article-body, .main-content, #content, #main"
```

**增强配置** (根据需要添加):
```json
"contentSelector": "article, .content, main, .post-content, .entry-content, .article-body, .main-content, #content, #main, .article, .post, .story, .content-container, .text-content, .main-container, .page-content, .site-content"
```

### 方案2: 针对特定网站优化

#### 常见网站特殊配置

**知乎网页版**:
```json
"zhihu.com": {
  "contentSelector": ".RichContent-inner, .Post-content, .Question-content, .RichText",
  "removeSelector": ".QuestionHeader-actions, .ContentItem-actions, . Voting-voteButton"
}
```

**掘金网页版**:
```json
"juejin.cn": {
  "contentSelector": ".article-content, .article-detail, .markdown-body",
  "removeSelector": ".article-suspended, .recommend-container, .comment-container"
}
```

**MDN文档**:
```json
"mdn.mozilla.org": {
  "contentSelector": ".main-content, .document-page, .md-content",
  "removeSelector": ".nav-list, .sidebar, .breadcrumbs"
}
```

### 方案3: 调整剪藏模式

**模式对比**:

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `"full"` | 完整文章内容 | 适合文章类网站 |
| `"reader"` | 阅读器模式 | 适合新闻类网站 |
| `"markdown"` | Markdown格式 | 适合技术文档 |
| `"simplified"` | 简化内容 | 适合快速浏览 |

**推荐配置**:
```json
"clipMode": "full"
```

### 方案4: 增强HTML清理

**配置优化**:
```json
"cleanHtml": true,
"removeNav": true,
"removeAds": true,
"removeComments": true,
"preserveLinks": true,
"convertLinks": true,
"minContentLength": 50,  // 降低最小内容长度
"maxContentLength": 100000  // 提高最大内容长度
```

## 🧪 测试和验证

### 测试步骤

#### 1. 基础测试
```javascript
// 在浏览器控制台中测试选择器
document.querySelectorAll('article, .content, main, .post-content, .entry-content, .article-body, .main-content, #content, #main').length
```

#### 2. 具体网站测试
```javascript
// 在目标页面测试
const content = document.querySelector('.article-content') || document.querySelector('.post-content') || document.querySelector('main');
if (content) {
  console.log('找到内容区域:', content);
  console.log('内容长度:', content.textContent.length);
} else {
  console.log('未找到内容区域');
}
```

#### 3. Clipper调试模式
启用调试模式查看详细日志:
```json
"debugMode": true,
"logLevel": "debug"
```

### 测试用例

#### 测试网站列表
- [ ] 知乎 (zhihu.com)
- [ ] 掘金 (juejin.cn)
- [ ] MDN (mdn.mozilla.org)
- [ ] Medium (medium.com)
- [ ] GitHub (github.com)
- [ ] 阮一峰的网络日志 (www.ruanyifeng.com)

#### 预期结果
- ✅ 图片正常保存
- ✅ 文字内容完整提取
- ✅ 格式化为Markdown
- ✅ 元数据正确提取

## 🛠️ 高级配置

### 自定义处理规则

#### 1. 按域名配置
```json
"customSelectors": {
  "zhihu.com": {
    "contentSelector": ".RichContent-inner, .Post-content",
    "removeSelector": ".QuestionHeader-actions, .Voting-voteButton"
  },
  "juejin.cn": {
    "contentSelector": ".article-content, .markdown-body",
    "removeSelector": ".article-suspended"
  }
}
```

#### 2. 内容过滤规则
```json
"contentFilters": {
  "includePatterns": ["article", "content", "main"],
  "excludePatterns": ["nav", "ads", "sidebar"],
  "minLength": 100,
  "maxLength": 50000
}
```

### 性能优化

#### 1. 请求优化
```json
"requestTimeout": 30000,
"retryAttempts": 3,
"retryDelay": 1000,
"concurrentRequests": 2,
"rateLimit": 50
```

#### 2. 缓存优化
```json
"cacheEnabled": true,
"cacheTimeout": 3600,
"respectRobots": true,
"followRedirects": true
```

## 🔍 故障排除流程

### 步骤1: 检查基础设置
1. ✅ Clipper插件是否正确安装
2. ✅ vault路径是否正确
3. ✅ 文件夹是否存在且有写入权限
4. ✅ 模板文件是否存在

### 步骤2: 检查剪藏配置
1. ✅ `clipMode`设置为"full"
2. ✅ `contentSelector`配置正确
3. ✅ `removeSelector`不会移除内容
4. ✅ 文件名格式设置正确

### 步骤3: 逐一测试网站
1. ✅ 简单网站测试（如静态HTML）
2. ✅ JavaScript渲染网站测试
3. ✅ 单页面应用测试
4. ✅ 需要登录的网站测试

### 步骤4: 监控和调试
1. ✅ 启用debug模式
2. ✅ 检查浏览器控制台错误
3. ✅ 查看生成的文件内容
4. ✅ 验证文件路径和权限

## 📊 常见问题速查表

| 问题描述 | 可能原因 | 解决方案 |
|----------|----------|----------|
| 只有图片没有文字 | 内容选择器不正确 | 更新`contentSelector` |
| 内容不完整 | 移除了内容区域 | 检查`removeSelector` |
| 格式混乱 | HTML清理过度 | 调整`cleanHtml`设置 |
| 提取缓慢 | 网站响应慢 | 增加`timeout`设置 |
| 重复内容 | 选择器重叠 | 优化选择器优先级 |
| 元丢失 | 元数据配置问题 | 检查`extractMetadata` |

## 🚀 最佳实践

### 1. 定期更新
- 定期更新Clipper插件版本
- 关注插件的更新日志
- 及时更新网站选择器配置

### 2. 监控性能
- 定期检查剪藏日志
- 监控文件大小和数量
- 优化配置避免性能问题

### 3. 备份配置
- 定期备份Clipper配置文件
- 记录重要配置修改
- 测试配置变更效果

### 4. 社区支持
- 关注Obsidian论坛Clipper相关讨论
- 分享成功的配置案例
- 参与社区问题解决

---

*Clipper剪藏故障排除指南 | 创建于 2026-01-16*