import { VStack } from "@chakra-ui/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AddMessage from "~/components/community/addMessage";
import Messages from "~/components/community/messages";
import { getT } from "~/i18next.server";
import { createMessage, getMessages } from "~/models/message.server";
import { validateAddMessageFormData } from "~/validators/message.server";

import Layout from "../components/layout/layout";

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await getT(request);
  const title = `${t("title")}`;

  const messages = await getMessages(1);

  return json({ messages, title });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.title }
];

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const res = validateAddMessageFormData(data);

  if (res.success) {
    const { content } = res.data;

    await createMessage(content);
  }

  return null;
}

export default function Index() {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <VStack gap={0} w="100%">
        <AddMessage />
        <Messages messages={messages} />
      </VStack>
    </Layout>
  );
}
