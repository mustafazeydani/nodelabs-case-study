import { defineConfig } from 'orval';

const OPENAPI_URL = process.env.NEXT_PUBLIC_OPENAPI_URL ?? 'https://case.nodelabs.dev/api-docs/openapi.json';

export default defineConfig({
  nodelabsApi: {
    input: {
      target: OPENAPI_URL,
    },
    output: {
      mode: 'tags',
      target: './src/api/generated/react-query',
      schemas: './src/api/generated/models',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useInfinite: true,
          useInfiniteQueryParam: 'page',
        },
      },
    },
  },

  nodelabsApiZod: {
    input: OPENAPI_URL,
    output: {
      mode: 'tags',
      client: 'zod',
      fileExtension: '.zod.ts',
      target: 'src/api/generated/zod',
    },
  },
});
