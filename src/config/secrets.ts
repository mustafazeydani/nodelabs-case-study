type Secrets = {
  openApi: {
    url: string;
  };
  api: {
    baseUrl: string;
  };
};

const defaults: Secrets = {
  openApi: {
    url: 'https://case.nodelabs.dev/api/docs/openapi.json',
  },
  api: {
    baseUrl: 'https://case.nodelabs.dev/api',
  },
};

export const secrets: Secrets = {
  openApi: {
    url: process.env.NEXT_PUBLIC_OPENAPI_URL || defaults.openApi.url,
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || defaults.api.baseUrl,
  },
};
