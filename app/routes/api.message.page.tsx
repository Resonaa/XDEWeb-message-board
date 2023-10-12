import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { getMessages } from "~/models/message.server";
import { badRequest } from "~/reponses.server";
import { validateGetMessagePageFormData } from "~/validators/message.server";

export async function loader() {
  return redirect("/");
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const res = validateGetMessagePageFormData(data);

  if (res.success) {
    const { page } = res.data;

    return json(await getMessages(page));
  }

  return badRequest();
}
