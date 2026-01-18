// Twitter页面内容选择器测试脚本
// 在浏览器控制台中运行此脚本来分析Twitter/X页面的DOM结构

console.log('🔍 开始分析Twitter页面结构...');

// 测试选择器列表
const twitterSelectors = [
    // 主要选择器
    '[data-testid="tweet"]',
    '[data-testid="tweetText"]',
    'div[role="article"]',
    '[data-testid="primaryColumn"] div[role="article"]',

    // 备用选择器
    '.tweet',
    '.timeline-item',
    '.css-1dbjc4n.r-1d2f490.r-u8s1d.r-zchlnj.r-ipm5af.r-13qz1uu.r-417010',
    '.css-1dbjc4n.r-1habvwh.r-1w6e6rj.r-1udh08x.r-4gszlv.r-1otgn73',
    'div.css-1dbjc4n.r-1ro0kt6.r-16y2uox.r-1wbh5a2.r-1udh08x.r-1w6e6rj.r-16y2uox.r-1qvxrn6.r-1udbk01',

    // 更广泛的选择器
    'div[style*="border"]',
    'div[data-testid]',
    'div[role]'
];

let foundElements = [];
let contentFound = false;

// 测试每个选择器
twitterSelectors.forEach((selector, index) => {
    try {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            console.log(`✅ 选择器 ${index + 1}: "${selector}" 找到 ${elements.length} 个元素`);

            elements.forEach((element, elemIndex) => {
                const text = element.textContent.trim();
                const hasText = text.length > 10;
                const hasImage = element.querySelectorAll('img, video').length > 0;

                if (hasText || hasImage) {
                    console.log(`  📝 元素 ${elemIndex + 1}:`);
                    console.log(`     - 文本长度: ${text.length}`);
                    if (text.length > 0) {
                        console.log(`     - 文本预览: "${text.substring(0, 100)}..."`);
                    }
                    console.log(`     - 包含图片: ${hasImage}`);
                    console.log(`     - CSS类名: ${element.className.substring(0, 100)}`);
                    console.log(`     - 元素ID: ${element.id || '无'}`);

                    foundElements.push({
                        selector: selector,
                        element: element,
                        text: text,
                        hasText: hasText,
                        hasImage: hasImage,
                        index: elemIndex
                    });

                    if (hasText && text.length > 20 && text.length < 500) {
                        contentFound = true;
                        console.log('     🎯 发现有效内容！');
                    }
                }
            });
        }
    } catch (error) {
        console.error(`❌ 选择器 ${index + 1} "${selector}" 测试失败:`, error.message);
    }
});

// 总结
console.log('\n📊 测试结果总结:');
console.log(`- 总选择器数量: ${twitterSelectors.length}`);
console.log(`- 找到元素总数: ${foundElements.length}`);
console.log(`- 发现有效内容: ${contentFound ? '是' : '否'}`);

if (foundElements.length > 0) {
    console.log('\n📋 找到的元素详情:');
    foundElements.forEach((item, index) => {
        console.log(`${index + 1}. 选择器: "${item.selector}"`);
        console.log(`   文本长度: ${item.text.length}`);
        if (item.text.length > 0) {
            console.log(`   文本预览: "${item.text.substring(0, 50)}..."`);
        }
        console.log(`   包含图片: ${item.hasImage}`);
        console.log(`   CSS类名: ${item.element.className.substring(0, 80)}...`);
    });
}

// 推荐的最佳选择器
if (contentFound) {
    console.log('\n🎯 推荐的内容选择器:');
    const validSelectors = foundElements
        .filter(item => item.hasText && item.text.length > 20)
        .map(item => item.selector);

    if (validSelectors.length > 0) {
        console.log('建议按以下优先级使用:');
        validSelectors.forEach((selector, index) => {
            console.log(`${index + 1}. ${selector}`);
        });
    }
}

// 页面基本信息
console.log('\n📄 页面基本信息:');
console.log(`- 页面标题: ${document.title}`);
console.log(`- URL: ${window.location.href}`);
console.log(`- body文本长度: ${document.body.textContent.length}`);
console.log(`- body预览: "${document.body.textContent.substring(0, 100)}..."`);

// 检查是否为Twitter页面
const isTwitterPage = window.location.hostname.includes('twitter.com') || window.location.hostname.includes('x.com');
console.log(`- 是否为Twitter/X页面: ${isTwitterPage}`);

if (isTwitterPage) {
    console.log('\n🔧 Twitter/X专用建议:');
    console.log('1. 使用 [data-testid="tweet"] 或 [data-testid="tweetText"]');
    console.log('2. 尝试 div[role="article"]');
    console.log('3. 考虑增加等待时间 (3000-5000ms)');
    console.log('4. 可能需要滚动到内容区域');
}

console.log('\n✨ 测试脚本执行完成!');