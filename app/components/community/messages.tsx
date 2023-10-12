import { VStack } from "@chakra-ui/react";
import { useState } from "react";

import LoadMore from "./loadMore";
import type { MessageProps } from "./message";
import Message from "./message";

async function ajax(
  method: string,
  url: string,
  data: Record<string, number | string | boolean | undefined | null> = {}
) {
  const body = new FormData();

  for (const key in data) {
    body.append(key, String(data[key]));
  }

  const options = { method: method, body };

  return await (await fetch(url, options)).json();
}

export default function Messages({ messages }: { messages: MessageProps[] }) {
  const [extraMessages, setExtraMessages] = useState<MessageProps[]>([]);

  const loader = async (page: number) => {
    const data = await ajax("post", "/api/message/page", { page });
    setExtraMessages(extraMessages => extraMessages.concat(data));
    return data.length === 20;
  };

  return (
    <VStack w="100%" spacing={4}>
      {messages.concat(extraMessages).map(data => (
        <Message key={data.id} linked {...data} />
      ))}
      {messages.length === 20 && <LoadMore loader={loader} />}
    </VStack>
  );
}
