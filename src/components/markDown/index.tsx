import { Anchor, Table } from "antd";
import { useEffect, useState, useRef } from "react";
import { remark } from "remark";
import html from "remark-html";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";

import Markdown from "react-markdown";
import React from "react";

const getCleanedId = (title: string) => {
  return title.trim();
};

function useMarkdownParser(markdown) {
  const [htmlContent, setHtmlContent] = useState("");
  const [toc, setToc] = useState([]);

  useEffect(() => {
    if (!markdown) return;

    async function parse() {
      const ast = remark().parse(markdown);
      const tocData = [];

      // 1️⃣ 提取标题
      visit(ast, "heading", (node) => {
        if (node.depth >= 1 && node.depth <= 5) {
          const text = node.children.map((n) => n.value || "").join("");
          const id = getCleanedId(text);
          tocData.push({ depth: node.depth, value: text, id });
        }
      });

      // 2️⃣ 转换为 HTML 并注入 id
      let htmlStr = String(await remark().use(html).process(markdown));
      tocData.forEach(({ id, value }) => {
        const regex = new RegExp(`(<h[1-6][^>]*>)(${value})(</h[1-6]>)`);
        htmlStr = htmlStr.replace(regex, `$1<a id="${id}"></a>$2$3`);
      });

      setHtmlContent(htmlStr);
      setToc(tocData);
    }

    parse();
  }, [markdown]);

  return { htmlContent, toc };
}

export default function MarkdownViewer({ markdown }) {
  const { toc } = useMarkdownParser(markdown);
  const contentRef = useRef(null);

  function buildNestedTree(list) {
    const root = [];
    const stack = [];

    for (const item of list) {
      const node = {
        key: getCleanedId(item.id),
        title: item.value,
        depth: item.depth,
        href: `#${getCleanedId(item.id)}`,
        children: [],
      };

      let prev = stack[stack.length - 1];

      if (item.depth > prev?.depth) {
        // 📌 出现跨层级（如 1 -> 3）
        for (let d = prev.depth + 1; d < item.depth; d++) {
          const placeholder = {
            depth: d,
            value: "",
            href: `#auto-${d}-${Math.random().toString(36).slice(2, 6)}`,
            id: `auto-${d}-${Math.random().toString(36).slice(2, 6)}`,
            children: [],
          };
          prev.children.push(placeholder);
          stack.push(placeholder);
          prev = placeholder;
        }
        prev.children.push(node);
        stack.push(node);
      } else {
        // 📉 回退栈至对应层级
        while (stack.length && item.depth <= stack[stack.length - 1].depth) {
          stack.pop();
        }
        const parent = stack[stack.length - 1];
        if (parent) parent.children.push(node);
        else root.push(node);
        stack.push(node);
      }
    }
    return root;
  }

  const handleClick = (e, link) => {
    e.preventDefault();
    const id = link.href;
    const node = document.getElementById(id);
    if (!node) return;

    const target = node.querySelector(`#${CSS.escape(id)}`); // 选中目标标题
    if (target) {
      const topOffset =
        target.getBoundingClientRect().top - node.getBoundingClientRect().top;
      node.scrollTo({
        top: node.scrollTop + topOffset - 20, // 微调偏移量
        behavior: "smooth", // 平滑滚动
      });
    }
  };

  const renderTitle = (tagName: string, title: string | null | undefined) => {
    if (!title) return;
    const id = getCleanedId(title);

    return React.createElement(tagName, {
      children: (
        <a id={id} style={{ listStyle: "none" }}>
          {title}
        </a>
      ),
    });
  };

  /**
   * 将 table AST 节点转换为 antd Table 数据结构
   * @param {object} tableNode - HAST 中的 table 节点
   */
  function parseTableToAntd(tableNode) {
    if (!tableNode || tableNode.tagName !== "table") return null;

    const thead = tableNode.children.find((c) => c.tagName === "thead");
    const tbody = tableNode.children.find((c) => c.tagName === "tbody");
    const trInTHead = thead.children.filter((tr) => tr.tagName === "tr");
    const trInTbody = tbody.children.filter((tr) => tr.tagName === "tr");

    const thInTr = trInTHead[0].children.filter((th) => th.tagName === "th");

    // 1️⃣ 获取列名
    const columns = thInTr.map((th, i) => {
      const title = getTextContent(th);
      return {
        title,
        dataIndex: `col${i}`,
        key: `col${i}`,
      };
    });

    // 2️⃣ 获取数据行
    const dataSource =
      trInTbody?.map((tr, rowIndex) => {
        const row = {};
        tr.children
          .filter((td) => td.tagName === "td")
          .forEach((td, colIndex) => {
            row[`col${colIndex}`] = getTextContent(td);
          });
        row.key = rowIndex;
        return row;
      }) || [];

    return { columns, dataSource };
  }

  /** 获取文本内容（去除多层 children） */
  function getTextContent(node) {
    if (!node) return "";
    if (node.type === "text") return node.value;
    if (node.children) return node.children.map(getTextContent).join("");
    return "";
  }

  return (
    <div style={{ display: "flex", gap: 24, padding: "40px" }}>
      {/* 左侧正文 */}
      <div
        ref={contentRef}
        className="markdown-body"
        style={{ flex: 1, lineHeight: 1.6 }}
      >
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h5(props) {
              return renderTitle("h5", props.children as string);
            },
            h2(props) {
              return renderTitle("h2", props.children as string);
            },
            h3(props) {
              return renderTitle("h3", props.children as string);
            },
            h4(props) {
              return renderTitle("h4", props.children as string);
            },
            h1(props) {
              return renderTitle("h1", props.children as string);
            },
            table(props) {
              const { dataSource, columns } = parseTableToAntd(props.node);
              return <Table dataSource={dataSource} columns={columns}></Table>;
            },
            code({ children }) {
              return (
                <code className="dtc__aigc__markdown__inlineCode">
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>

      {/* 右侧目录 */}
      <aside
        style={{
          position: "sticky",
          top: 80,
          width: 240,
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          borderLeft: "1px solid #eee",
          paddingLeft: 16,
        }}
      >
        <strong>📑 目录 anchor</strong>
        <Anchor items={buildNestedTree(toc)} onClick={handleClick}></Anchor>
      </aside>
    </div>
  );
}

// 目前 blockHeader 替换成 UI 组件   - - code 代码快 - 滚动行数  - 脚注
