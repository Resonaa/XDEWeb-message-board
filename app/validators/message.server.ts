import type { Params } from "@remix-run/react";
import { z } from "zod";

import { toObject } from "./utils.server";

const idSchema = z.coerce.number().int().finite().safe().min(1);

const pageSchema = idSchema;

const messageContentSchema = z.string().trim().min(1).max(1e4);

const addMessageSchema = z
  .object({
    content: messageContentSchema
  })
  .strict();

const getMessageSchema = z
  .object({
    id: idSchema
  })
  .strict();

const getMessagePageSchema = z
  .object({
    page: pageSchema
  })
  .strict();

export function validateAddMessageFormData(data: FormData) {
  return addMessageSchema.safeParse(toObject(data));
}

export function validateGetMessageParams(params: Params) {
  return getMessageSchema.safeParse(toObject(params));
}

export function validateGetMessagePageFormData(data: FormData) {
  return getMessagePageSchema.safeParse(toObject(data));
}
