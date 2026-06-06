/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_SOCKET_URL?: string;
  readonly VITE_DISCORD_OWNER?: string;
  readonly VITE_DISCORD_DISPLAY_AS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'discord-markdown';
declare module 'wavefunctioncollapse';
