"use client";

import { customFetch } from "../fetchConfig";

export async function createTask(variables: {
  eventId: number;
  name: string;
  description: string;
  points: number;
}): Promise<unknown> {
  try {
    const res = await customFetch("/events/createTask", {
      method: "post",
      body: JSON.stringify(variables),
    }).then((res) => res.json());

    if (!res) {
      throw new Error();
    }

    return res as unknown;
  } catch (err) {
    return Promise.reject(new Error("Failed at creating task"));
  }
}
