export const paths = {
  '/': {
    getHref: (): '/' => '/',
    label: 'Dashboard',
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
    label: 'Sign In',
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
    label: 'Sign Up',
  },
  transactions: {
    getHref: (): '/transactions' => '/transactions',
    label: 'Transactions',
  },
  invoices: {
    getHref: (): '/invoices' => '/invoices',
    label: 'Invoices',
  },
  'my-wallets': {
    getHref: (): '/my-wallets' => '/my-wallets',
    label: 'My Wallets',
  },
  settings: {
    getHref: (): '/settings' => '/settings',
    label: 'Settings',
  },
  help: {
    getHref: (): '/help' => '/help',
    label: 'Help',
  },
} as const;
