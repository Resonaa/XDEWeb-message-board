import type { Params } from "@remix-run/react";
import { z } from "zod";

import { safeParseAndFlatten } from "./utils.server";

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
  return safeParseAndFlatten(addMessageSchema, data);
}

export function validateGetMessageParams(params: Params) {
  return safeParseAndFlatten(getMessageSchema, params);
}

export function validateGetMessagePageFormData(data: FormData) {
  return safeParseAndFlatten(getMessagePageSchema, data);
}
