# 🔧 Tag Group Manager 故障排除指南

## 🚨 常见问题诊断

### 问题类别
1. **插件加载问题**：插件无法启动或显示
2. **功能异常问题**：标签组创建、编辑等功能异常
3. **界面显示问题**：界面布局、样式显示异常
4. **数据存储问题**：标签数据丢失或损坏
5. **性能问题**：响应缓慢或卡顿
6. **兼容性问题**：与其他插件冲突

## 🔍 问题诊断流程

### 第一步：确认基本状态
```
1. 插件是否已正确安装？
2. Obsidian版本是否兼容？
3. 是否启用了开发者模式？
4. 插件文件是否完整？
```

### 第二步：检查配置文件
```
1. 检查插件配置文件是否正确
2. 检查样式文件是否存在
3. 检查JavaScript文件是否有语法错误
4. 检查数据存储是否正常
```

### 第三步：测试基础功能
```
1. 是否能打开侧边栏？
2. 标签组是否能正常显示？
3. 标签是否能正常插入？
4. 搜索功能是否正常工作？
```

## 🛠️ 具体问题解决方案

### 问题1：插件无法加载

#### 症状描述
- 在插件列表中找不到Tag Group Manager
- 启用插件后没有任何反应
- 侧边栏中没有显示Tag Group Manager

#### 可能原因
1. 插件文件不完整
2. 插件ID冲突
3. Obsidian版本不兼容
4. 权限问题

#### 解决方案

**方案1：检查插件文件完整性**
```bash
# 检查插件文件结构
ls -la .obsidian/plugins/tag-group-manager/
# 应该看到：main.js, styles.css, manifest.json
```

**方案2：重新安装插件**
```bash
# 删除插件目录
rm -rf .obsidian/plugins/tag-group-manager

# 重新创建插件文件
mkdir -p .obsidian/plugins/tag-group-manager
# 重新复制插件文件
```

**方案3：检查插件ID冲突**
```json
# 检查manifest.json中的ID是否唯一
{
  "id": "tag-group-manager",  // 确保ID唯一
  "name": "Tag Group Manager"
}
```

**方案4：重启Obsidian**
- 完全关闭Obsidian
- 重新启动应用
- 再次尝试启用插件

### 问题2：标签组无法创建

#### 症状描述
- 点击"添加标签组"按钮没有反应
- 创建标签组时提示错误
- 标签组创建后不显示

#### 可能原因
1. JavaScript代码错误
2. 权限问题
3. 数据存储问题
4. 界面元素冲突

#### 解决方案

**方案1：检查JavaScript错误**
1. 打开浏览器开发者工具
2. 查看Console标签页
3. 检查是否有JavaScript错误信息
4. 根据错误信息修复代码

**方案2：检查数据存储权限**
```json
// 检查localStorage权限
if (typeof localStorage !== 'undefined') {
  console.log('localStorage可用');
} else {
  console.log('localStorage不可用');
}
```

**方案3：检查界面元素**
```javascript
// 检查DOM元素是否正确创建
const addButton = document.querySelector('.add-group-button');
if (addButton) {
  console.log('添加按钮存在');
} else {
  console.log('添加按钮不存在');
}
```

**方案4：重置插件数据**
```javascript
// 在浏览器控制台中执行
localStorage.removeItem('tag-group-manager-data');
location.reload();
```

### 问题3：标签无法插入

#### 症状描述
- 点击标签没有反应
- 标签插入到错误位置
- 标签格式不正确

#### 可能原因
1. 编辑器接口问题
2. 插件与Obsidian API不兼容
3. 标签格式错误
4. 当前没有打开笔记

#### 解决方案

**方案1：检查编辑器状态**
```javascript
// 检查当前编辑器状态
const editor = app.workspace.activeEditor?.editor;
if (editor) {
  console.log('编辑器可用');
} else {
  console.log('没有活动的编辑器');
}
```

**方案2：检查标签格式**
```javascript
// 确保标签格式正确
const tag = '#React';
if (tag.startsWith('#') && tag.length > 1) {
  console.log('标签格式正确');
} else {
  console.log('标签格式错误');
}
```

**方案3：测试手动插入**
```javascript
// 手动测试插入功能
const editor = app.workspace.activeEditor?.editor;
if (editor) {
  const cursor = editor.getCursor();
  editor.replaceRange('#测试标签 ', cursor);
}
```

### 问题4：界面显示异常

#### 症状描述
- 界面布局错乱
- 样式不显示
- 字体或颜色异常
- 响应式布局失效

#### 可能原因
1. CSS样式错误
2. 主题冲突
3. 浏览器兼容性问题
4. 屏幕分辨率问题

#### 解决方案

**方案1：检查CSS样式**
```css
/* 检查基础样式是否正确 */
.tag-group-manager-container {
  padding: 0.75rem;
  font-size: 0.9em;
}

.tag-item {
  background: var(--background-modifier-hover);
  color: var(--text-muted);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}
```

**方案2：重置主题设置**
```javascript
// 重置为默认主题
document.documentElement.setAttribute('data-theme', 'obsidian');
location.reload();
```

**方案3：检查浏览器兼容性**
```javascript
// 检查浏览器支持
if ('IntersectionObserver' in window) {
  console.log('支持IntersectionObserver');
} else {
  console.log('不支持IntersectionObserver');
}
```

**方案4：调整CSS变量**
```css
/* 自定义CSS变量 */
:root {
  --tag-group-manager-bg: var(--background-secondary);
  --tag-group-manager-text: var(--text-normal);
  --tag-group-manager-accent: var(--interactive-accent);
}
```

### 问题5：搜索功能失效

#### 症状描述
- 搜索框不响应
- 搜索结果显示错误
- 搜索性能缓慢

#### 可能原因
1. 搜索算法错误
2. 数据结构问题
3. 性能问题
4. 过滤器配置错误

#### 解决方案

**方案1：检查搜索算法**
```javascript
// 测试搜索功能
const searchTerm = 'React';
const results = this.searchTags(searchTerm);
console.log('搜索结果:', results);
```

**方案2：优化搜索性能**
```javascript
// 使用防抖优化搜索性能
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

**方案3：检查数据索引**
```javascript
// 重建搜索索引
function rebuildSearchIndex() {
  this.searchIndex = new Map();
  this.groups.forEach(group => {
    group.tags.forEach(tag => {
      this.searchIndex.set(tag.toLowerCase(), group);
    });
  });
}
```

### 问题6：数据存储问题

#### 症状描述
- 标签组数据丢失
- 数据损坏
- 数据无法保存
- 数据同步问题

#### 可能原因
1. localStorage空间不足
2. 数据格式错误
3. 浏览器隐私模式
4. 存储限制

#### 解决方案

**方案1：检查存储空间**
```javascript
// 检查localStorage空间
function checkStorageSpace() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    total += key.length + value.length;
  }
  console.log('已使用存储空间:', total, 'bytes');
  console.log('存储限制:', 5 * 1024 * 1024, 'bytes (5MB)');
}
```

**方案2：备份数据**
```javascript
// 导出数据备份
function backupData() {
  const data = localStorage.getItem('tag-group-manager-data');
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `tag-groups-backup-${Date.now()}.json`;
  a.click();
}
```

**方案3：清理存储空间**
```javascript
// 清理过期数据
function cleanupStorage() {
  const keys = ['old-data-1', 'old-data-2', 'cache-data'];
  keys.forEach(key => localStorage.removeItem(key));
}
```

## 🔧 高级故障排除

### 性能优化

#### 问题1：大数量标签性能问题
```javascript
// 虚拟滚动实现
class VirtualScroll {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight) + 2;
  }

  render scrollTop, scrollHeight) {
    const startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.min(startIndex + this.visibleItems, this.items.length);

    // 只渲染可见项目
    for (let i = startIndex; i <= endIndex; i++) {
      this.renderItem(i);
    }
  }
}
```

#### 问题2：内存泄漏检测
```javascript
// 内存泄漏检测
function detectMemoryLeaks() {
  if (window.performance && window.performance.memory) {
    const used = window.performance.memory.usedJSHeapSize;
    const total = window.performance.memory.totalJSHeapSize;
    const limit = window.performance.memory.jsHeapSizeLimit;

    console.log('内存使用:', used / 1024 / 1024, 'MB');
    console.log('内存限制:', limit / 1024 / 1024, 'MB');
  }
}
```

### 兼容性处理

#### 问题1：浏览器兼容性
```javascript
// 检测浏览器特性支持
const features = {
  'IntersectionObserver': 'IntersectionObserver' in window,
  'ResizeObserver': 'ResizeObserver' in window,
  'CSS.supports': CSS.supports,
  'requestAnimationFrame': 'requestAnimationFrame' in window
};

// 根据支持情况提供polyfill
if (!features.IntersectionObserver) {
  // 加载IntersectionObserver polyfill
  const script = document.createElement('script');
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
  document.head.appendChild(script);
}
```

#### 问题2：Obsidian版本兼容性
```javascript
// 检查Obsidian版本
function checkObsidianVersion() {
  const version = app.vault.adapter.VERSION || 'unknown';
  console.log('Obsidian版本:', version);

  if (version.startsWith('0.1')) {
    console.log('警告：旧版本Obsidian可能存在兼容性问题');
  }
}
```

## 📋 故障排除检查清单

### 基本检查
- [ ] 插件文件是否完整
- [ ] 插件是否已正确启用
- [ ] Obsidian是否正常运行
- [ ] 浏览器控制台是否有错误

### 功能检查
- [ ] 标签组创建功能
- [ ] 标签插入功能
- [ ] 搜索功能
- [ ] 数据存储功能

### 性能检查
- [ ] 响应速度是否正常
- [ ] 内存使用是否合理
- [ ] CPU占用是否过高
- [ ] 是否有内存泄漏

### 兼容性检查
- [ ] 与其他插件的兼容性
- [ ] 浏览器版本兼容性
- [ ] 操作系统兼容性
- [ ] 屏幕分辨率兼容性

## 🆘 获取帮助

### 内置帮助资源
- 查看控制台错误信息
- 检查插件设置页面
- 参考使用文档

### 社区支持
- Obsidian官方论坛
- GitHub Issues页面
- 社区Discord服务器

### 联系开发者
- 邮件支持
- 问题报告
- 功能建议

---

*故障排除指南 | 创建于 2026-01-15*