import { VStack } from "@chakra-ui/layout";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AddMessage from "~/components/community/addMessage";
import Messages from "~/components/community/messages";
import { createMessage, getMessages } from "~/models/message.server";
import { validateAddMessageFormData } from "~/validators/message.server";

export async function loader() {
  return json({ messages: await getMessages(1) });
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const res = validateAddMessageFormData(data);

  if (res.success) {
    await createMessage(res.data.content);
  }

  return null;
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <VStack gap={0} w="100%">
      <AddMessage />
      <Messages messages={messages} />
    </VStack>
  );
}
