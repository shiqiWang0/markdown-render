export const exampleMarkdown = `
# Markdown 语法示例文档

## 1️⃣ 标题（Headings）

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

---

## 2️⃣ 段落与换行（Paragraphs & Line breaks）

这是一个普通段落。  
使用两个空格结尾可以实现**换行**。  
比如这里换行了。

---

## 3️⃣ 强调（Emphasis）

这是 *斜体*，这是 **粗体**，这是 ***粗斜体***。  
~~删除线~~ 也支持。  
可以使用 \`行内代码\`。

---

## 4️⃣ 引用（Blockquotes）

> 这是一个引用段落。
> 
> > 可以嵌套引用。
> 
> 多行内容也可以。

---

## 5️⃣ 列表（Lists）

### 无序列表
- 项目 A
  - 子项 A1
  - 子项 A2
- 项目 B
- 项目 C

### 有序列表
1. 第一项
2. 第二项
3. 第三项
   1. 子项 3.1
   2. 子项 3.2

---

## 6️⃣ 任务列表（Task Lists）

* [x] 已完成任务
* [ ] 未完成任务
* [ ] 支持点击切换状态（仅渲染）

---

## 7️⃣ 链接与图片（Links & Images）

这是一个链接 👉 [访问 OpenAI](https://www.openai.com)  
行内式与引用式都支持：

[百度][baidu-link]

[baidu-link]: https://www.baidu.com "百度一下"

插入图片：

![示例图片](https://picsum.photos/300/120 "随机图片")

---

## 8️⃣ 表格（Tables）

| 模块 | 功能描述 | 状态 |
| ---- | ---------- | ---- |
| 登录模块 | 支持多种认证方式 | ✅ 已上线 |
| 控制台 | 可视化配置、权限管理 | 🧩 开发中 |
| 日志中心 | 聚合查询日志 | 🔜 规划中 |

> 表格支持 GFM（GitHub Flavored Markdown）

---

## 9️⃣ 代码块（Code Blocks）

行内代码：\`const a = 1;\`

多行代码：
\`\`\`js
// JavaScript 示例
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('ChatGPT');
\`\`\`

\`\`\`python
# Python 示例
def add(a, b):
    return a + b
\`\`\`

\`\`\`bash
# 命令行示例
pnpm install
pnpm dev
\`\`\`

---

## 🔟 分割线（Horizontal Rules）

---
***
___

---

## 11️⃣ 引用 HTML

Markdown 支持原生 HTML：

<div style="background:#fafafa;padding:12px;border-radius:8px">
  <strong>HTML 语法</strong> 也可以直接嵌入。
</div>

---

## 12️⃣ 表情符号（Emoji）

支持 GitHub 风格 emoji 😄 🎉 👍 💡 🔥  
可以直接输入，也可以使用代码 \`:smile:\`（视渲染器而定）。

---

## 13️⃣ 混合样式

> **提示：**  
> 你可以在引用中放入 *斜体*、**粗体**、甚至表格。

| 项目 | 状态 |
| :-- | :-- |
| Markdown 支持 | ✅ |
| Emoji | 😀 |
| HTML | ✔️ |

---

## 14️⃣ 脚注（Footnotes）

这是一个带脚注的句子[^1]。

[^1]: 这是脚注的说明文字。

---

## 15️⃣ 超长内容（用于滚动测试）

### 内容节 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
### 内容节 2
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
### 内容节 3
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

---

## ✅ 结束语

这是一份完整的 Markdown 示例文档。  
可用于测试 **Dumi / Remark / Markdown 解析器** 的兼容性。
`;
