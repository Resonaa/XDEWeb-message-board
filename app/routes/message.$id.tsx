import { Divider, VStack } from "@chakra-ui/layout";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import AddMessage from "~/components/community/addMessage";
import Message from "~/components/community/message";
import Messages from "~/components/community/messages";
import Layout from "~/components/layout/layout";
import { getT } from "~/i18next.server";
import { getMessage, getMessages } from "~/models/message.server";
import { badRequest, notFound } from "~/reponses.server";
import { validateGetMessageParams } from "~/validators/message.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const t = await getT(request);

  const res = validateGetMessageParams(params);

  if (!res.success) {
    throw badRequest();
  }

  const { id } = res.data;

  const message = await getMessage(id);
  if (!message) {
    throw notFound();
  }

  const title = `${t("title")}`;

  const messages = await getMessages(1);

  return json({ message, messages, title });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.title }
];

export default function PostId() {
  const { message, messages } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <VStack gap={0} w="100%">
        <Message {...message} linked={false} />
        <Divider my={3} />
        <AddMessage />
        <Messages messages={messages} />
      </VStack>
    </Layout>
  );
}
