import { VStack } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { useState } from "react";

import LoadMore from "./loadMore";
import type { MessageProps } from "./message";
import Message from "./message";

async function ajax(
  method: string,
  url: string,
  data: Record<string, any> = {}
) {
  const body = new FormData();

  for (const key in data) {
    body.append(key, String(data[key]));
  }

  const options = { method, body };

  return await (await fetch(url, options)).json();
}

export default function Messages({ messages }: { messages: MessageProps[] }) {
  const [extraMessages, setExtraMessages] = useState<MessageProps[]>([]);

  const loader = async (page: number) => {
    const data = await ajax("post", "/api/message/page", { page });
    setExtraMessages(extraMessages => extraMessages.concat(data));
    return data.length === 10;
  };

  const variants = {
    show: {
      transition: { staggerChildren: 0.07 }
    },
    hidden: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  return (
    <VStack
      as={motion.div}
      w="100%"
      animate="show"
      initial="hidden"
      spacing={3}
      variants={variants}
    >
      {messages.concat(extraMessages).map(data => (
        <Message key={data.id} linked {...data} />
      ))}
      {messages.length === 10 && <LoadMore loader={loader} />}
    </VStack>
  );
}
