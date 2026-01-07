export const paths = {
  '/': {
    getHref: (): '/' => '/',
  },
  'sign-in': {
    getHref: ({ redirectTo }: { redirectTo?: string } = {}):
      | '/sign-in'
      | `/sign-in?redirectTo=${string}` => {
      return ('/sign-in' +
        (redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : '')) as
        | '/sign-in'
        | `/sign-in?redirectTo=${string}`;
    },
  },
  'sign-up': {
    getHref: ({ redirectTo }: { redirectTo?: string } = {}):
      | '/sign-up'
      | `/sign-up?redirectTo=${string}` => {
      return ('/sign-up' +
        (redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : '')) as
        | '/sign-up'
        | `/sign-up?redirectTo=${string}`;
    },
  },
  transactions: {
    getHref: (): '/transactions' => '/transactions',
  },
  invoices: {
    getHref: (): '/invoices' => '/invoices',
  },
  'my-wallets': {
    getHref: (): '/my-wallets' => '/my-wallets',
  },
  settings: {
    getHref: (): '/settings' => '/settings',
  },
  help: {
    getHref: (): '/help' => '/help',
  },
} as const;
