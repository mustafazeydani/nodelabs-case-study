export const paths = {
  '/': {
    getHref: (): '/' => '/',
  },
  '/sign-in': {
    getHref: ({ redirectTo }: { redirectTo?: string } = {}):
      | '/sign-in'
      | `/sign-in?redirectTo=${string}` => {
      return ('/sign-in' +
        (redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : '')) as
        | '/sign-in'
        | `/sign-in?redirectTo=${string}`;
    },
  },
  '/sign-up': {
    getHref: ({ redirectTo }: { redirectTo?: string } = {}):
      | '/sign-up'
      | `/sign-up?redirectTo=${string}` => {
      return ('/sign-up' +
        (redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : '')) as
        | '/sign-up'
        | `/sign-up?redirectTo=${string}`;
    },
  },
} as const;
