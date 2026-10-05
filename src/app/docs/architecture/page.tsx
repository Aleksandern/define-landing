import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./page.module.css";

export const metadata = {
  title: "DeFine Architecture & Technical Overview",
  description: "Architecture, implementation status, open-source boundary",
};

export default function ArchitecturePage() {
  const filePath = path.join(
    process.cwd(),
    "docs",
    "define-architecture.md",
  );

  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <main className={styles.page}>
      <article className={`markdown-body ${styles.document}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ src, alt, ...props }) => {
              const resolvedSrc =
                typeof src === "string"
                  ? src.replace(/^\.\.\/public\//, "/")
                  : src;

              return <img {...props} src={resolvedSrc} alt={alt ?? ""} />;
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}
