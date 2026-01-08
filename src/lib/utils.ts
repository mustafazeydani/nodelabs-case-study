import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  amount: number | undefined,
  currency: string | undefined,
  decimals: number = 2,
): string => {
  if (amount === undefined || !currency) {
    return '';
  }

  // Map symbols to currency codes if needed
  const currencyMap: Record<string, string> = {
    $: 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
  };

  const currencyCode = currencyMap[currency] || currency;

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  const hasTime = dateString.includes('T') || dateString.includes(' ');

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat(undefined, dateOptions).format(
    date,
  );

  if (hasTime) {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    const formattedTime = new Intl.DateTimeFormat(
      undefined,
      timeOptions,
    ).format(date);
    return `${formattedDate} at ${formattedTime}`;
  }

  return formattedDate;
};
