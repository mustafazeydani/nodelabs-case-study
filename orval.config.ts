import { secrets } from './src/config/secrets';
import { defineConfig } from 'orval';

export default defineConfig({
  nodelabsApi: {
    input: {
      target: secrets.openApi.url,
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
      },
    },
  },

  nodelabsApiZod: {
    input: secrets.openApi.url,
    output: {
      mode: 'tags',
      client: 'zod',
      fileExtension: '.zod.ts',
      target: 'src/api/generated/zod',
    },
  },
});
