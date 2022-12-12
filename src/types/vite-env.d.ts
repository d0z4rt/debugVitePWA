/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
