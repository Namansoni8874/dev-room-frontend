
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://dev-room-two.vercel.app/graphql",
  documents: ["src/graphql/mutation/**/*.ts","src/graphql/query/**/*.ts"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
