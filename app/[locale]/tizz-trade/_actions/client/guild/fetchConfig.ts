"use client";

const env = process.env.NEXT_PUBLIC_ENV;

const guildApis = {
  sepolia: "", //process.env.NEXT_PUBLIC_SEPOLIA_GUILD_API,
  botanix: "", //process.env.NEXT_PUBLIC_BOTANIX_GUILD_API,
};

export const defaultPostHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

export const defaultGetHeaders: Record<string, string> = {};

export const defaultHeaders: Record<string, string> = {};

export function setHeader(key: string, value: string, type?: "get" | "post") {
  if (type === "get") {
    defaultGetHeaders[key] = value;
  } else if (type === "post") {
    defaultPostHeaders[key] = value;
  } else {
    defaultHeaders[key] = value;
  }
}

function getCustomFetch() {
  return (input: string, init?: RequestInit | undefined): Promise<Response> => {
    if (init) {
      if (init.method?.toLowerCase() === "get") {
        return fetch(`${guildApis[env as keyof typeof guildApis]}${input}`, {
          ...init,
          headers: {
            ...defaultHeaders,
            ...defaultGetHeaders,
            ...init.headers,
          },
        });
      }

      if (init.method?.toLowerCase() === "post") {
        return fetch(`${guildApis[env as keyof typeof guildApis]}${input}`, {
          ...init,
          headers: {
            ...defaultHeaders,
            ...defaultPostHeaders,
            ...init.headers,
          },
        });
      }

      return fetch(`${guildApis[env as keyof typeof guildApis]}${input}`, {
        ...init,
        headers: {
          ...defaultHeaders,
          ...init.headers,
        },
      });
    } else {
      return fetch(`${guildApis[env as keyof typeof guildApis]}${input}`, {
        headers: {
          ...defaultHeaders,
        },
      });
    }
  };
}

export const customFetch = getCustomFetch();
