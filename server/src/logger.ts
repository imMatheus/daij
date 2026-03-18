import pino from "pino";

const isDev = Bun.env.NODE_ENV !== "production";

export const logger = pino({
    level: isDev ? "debug" : "info",
    ...(isDev
        ? { transport: { target: "pino-pretty" } }
        : {}),
});
