import { parseAsString } from 'nuqs/server';

import { CONSTANTS } from '@/config/constants';

export const signInSearchParams = {
  [CONSTANTS.redirectToParam]: parseAsString,
};
