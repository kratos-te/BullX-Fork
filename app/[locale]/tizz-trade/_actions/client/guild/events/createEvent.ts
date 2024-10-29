"use client";

import { customFetch } from "../fetchConfig";

export async function createEvent(variables: {
  name: string;
  description: string;
  eventType: string;
}): Promise<unknown> {
  try {
    const res = await customFetch("/events/createEvent", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as unknown;
  } catch (err) {
    return Promise.reject(new Error("Failed at creating event"));
  }
}
