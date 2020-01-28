declare const __PATH_PREFIX__: string

declare namespace NodeJS {
  // ProcessEnv interface mustn't be prefixed or the types wont be taken into account
  // when using the `process.env` global
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test"
    GATSBY_USE_MOCK: "true" | "false"
  }
}
