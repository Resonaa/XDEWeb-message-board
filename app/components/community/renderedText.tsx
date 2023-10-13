import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

const renderer = ChakraUIRenderer();

interface RenderedTextProps {
  content: string;
}

export default function RenderedText<T extends RenderedTextProps>({
  content,
  ...props
}: T) {
  return (
    <ReactMarkdown
      components={renderer}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
      skipHtml
      children={content}
      {...props}
    />
  );
}
