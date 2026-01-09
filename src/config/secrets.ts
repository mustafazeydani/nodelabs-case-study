type Secrets = {
  openApi: {
    url: string;
  };
  api: {
    baseUrl: string;
  };
  app: {
    baseUrl: string;
  };
};

const defaults: Secrets = {
  openApi: {
    url: 'https://case.nodelabs.dev/api-docs.json',
  },
  api: {
    baseUrl: 'https://case.nodelabs.dev/api',
  },
  app: {
    baseUrl: 'http://localhost:3000',
  },
};

export const secrets: Secrets = {
  openApi: {
    url: process.env.NEXT_PUBLIC_OPENAPI_URL || defaults.openApi.url,
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || defaults.api.baseUrl,
  },
  app: {
    baseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL || defaults.app.baseUrl,
  },
};
