import { unified } from "unified";
import parse from "remark-parse";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(parse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
