import { Text } from "@chakra-ui/layout";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
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

  return content.trim().length > 0 ? (
    <ReactMarkdown
      components={renderer}
      remarkPlugins={[remarkGfm]}
      children={content}
      {...props}
    />
  ) : (
    <Text color="gray.500">{t("community.nothing-to-preview")}</Text>
  );
}
