import { Flex, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Tooltip } from "@chakra-ui/tooltip";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
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

  const variants = {
    show: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <VStack
      as={motion.div}
      align="normal"
      w="100%"
      spacing={1}
      variants={variants}
    >
      <Flex color="gray.400" fontSize="sm">
        <Tooltip label={formatDate(createdAt)} openDelay={500}>
          {relativeDate(createdAt)}
        </Tooltip>
        <span>
          &nbsp;· {formatLargeNumber(viewCount)}&nbsp;
          {t("community.view", { count: viewCount })}
        </span>
      </Flex>

      {linked ? (
        <chakra.a as={Link} to={messageUrl} maxH="200px" overflowY="auto">
          <object>
            <span />
            <RenderedText content={content} />
          </object>
        </chakra.a>
      ) : (
        <RenderedText content={content} />
      )}
    </VStack>
  );
}
