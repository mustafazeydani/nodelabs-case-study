import { CONSTANTS } from './constants';

export const paths = {
  '/': {
    getHref: (): '/' => '/',
    label: 'Dashboard',
  },
  'sign-in': {
    getHref: ({ redirectTo }: { redirectTo?: string } = {}): '/sign-in' => {
      return ('/sign-in' +
        (redirectTo
          ? `?${CONSTANTS.redirectToParam}=${encodeURIComponent(redirectTo)}`
          : '')) as '/sign-in';
    },
    label: 'Sign In',
  },
  'sign-up': {
    getHref: ({ redirectTo }: { redirectTo?: string } = {}): '/sign-up' => {
      return ('/sign-up' +
        (redirectTo
          ? `?${CONSTANTS.redirectToParam}=${encodeURIComponent(redirectTo)}`
          : '')) as '/sign-up';
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
