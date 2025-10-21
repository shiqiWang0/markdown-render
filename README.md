# 📘 Markdown Renderer with TOC & Antd Table

本项目支持从后端动态获取 Markdown 内容，在前端进行解析、渲染，并自动生成大纲（TOC）与表格组件。  
基于 React + Remark + Ant Design 实现，适用于文档展示。

---

## ✨ Features

- 🚀 **Dynamic Markdown Rendering**  
  从后端接口获取文档内容，前端解析为 React 组件。

- 🧭 **Auto TOC (Table of Contents)**  
  自动提取 Markdown 中的 H1 ～ H5 标题，生成可点击的目录结构并支持滚动定位。

- 🧩 **Ant Design Table Rendering**  
  将 Markdown 中的 `<table>` 节点自动转化为 Ant Design `<Table />` 组件，支持列定义与数据源映射。

- 🔤 **Emoji & Special Char Safe ID Generation**  
  支持中文、数字、emoji 等混合标题，生成稳定的锚点 ID。

---

## 🏗️ Tech Stack

| 名称                 | 用途                                    |
| -------------------- | --------------------------------------- |
| **React**            | 前端渲染框架                            |
| **remark / rehype**  | Markdown → AST → HTML 解析              |
| **unist-util-visit** | 遍历 Markdown 抽象语法树（AST）提取节点 |
| **Ant Design**       | UI 组件库，负责表格渲染                 |
| **TypeScript**       | 类型安全与开发体验优化                  |
