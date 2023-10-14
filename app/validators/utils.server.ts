import type { Params } from "@remix-run/react";

export function toObject(data: FormData | Params) {
  const object: Record<string, any> = {};

  if (data instanceof FormData) {
    for (const [key, value] of data) {
      object[key] = value;
    }
  } else {
    for (const [key, value] of Object.entries(data)) {
      object[key] = value;
    }
  }

  return object;
}
