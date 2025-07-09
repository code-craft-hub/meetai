import "server-only";

import { StreamChat } from "stream-chat";

if (!process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_STREAM_CHAT_API_KEY environment variable');
}

if (!process.env.STREAM_CHAT_SECRET_KEY) {
  throw new Error('Missing STREAM_CHAT_SECRET_KEY environment variable');
}

export const streamChat = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
  process.env.STREAM_CHAT_SECRET_KEY!
);
