import { Box, chakra, Flex, Tooltip, VStack } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import type { Message as MessageType } from "~/models/message.server";

import RenderedText from "./renderedText";
import {
  formatDate,
  formatLargeNumber,
  useRelativeDateFormatter
} from "./utils";

export type MessageProps = Pick<MessageType, "id" | "content" | "viewCount"> & {
  createdAt: string;
};

export default function Message({
  id,
  createdAt,
  content,
  viewCount,
  linked
}: MessageProps & {
  linked: boolean;
}) {
  const messageUrl = `/message/${id}`;

  const relativeDate = useRelativeDateFormatter();

  const { t } = useTranslation();

  return (
    <VStack align="normal" w="100%" spacing={2}>
      <Flex>
        <Flex align="center" wrap="wrap" flex={1} gap={3}>
          <Box>
            <Box color="gray.400" fontSize="sm">
              <Tooltip label={formatDate(createdAt)} openDelay={500}>
                {relativeDate(createdAt)}
              </Tooltip>
              <span>
                {" "}
                · {formatLargeNumber(viewCount)}{" "}
                {t("community.view", { count: viewCount })}
              </span>
            </Box>
          </Box>
        </Flex>
      </Flex>

      {linked ? (
        <chakra.a as={Link} to={messageUrl} maxH="200px" overflowY="auto">
          <object>
            <RenderedText content={content} />
          </object>
        </chakra.a>
      ) : (
        <object>
          <RenderedText content={content} />
        </object>
      )}
    </VStack>
  );
}
