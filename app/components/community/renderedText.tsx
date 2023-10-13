import { Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return content.length > 0 ? (
    <ReactMarkdown
      components={renderer}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
      skipHtml
      children={content}
      {...props}
    />
  ) : (
    <Text>{t("community.nothing-to-preview")}</Text>
  );
}
