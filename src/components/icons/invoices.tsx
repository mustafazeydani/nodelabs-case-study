import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const InvoicesIcon = ({ className = 'w-6 h-6 text-foreground', ...props }: IconProps) => (
  <svg
    viewBox="0 0 15 17"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M10.2333 0H3.93333C0.783334 0 0 0.841667 0 4.2V13.5833C0 15.8 1.21667 16.325 2.69167 14.7417L2.7 14.7333C3.38333 14.0083 4.425 14.0667 5.01667 14.8583L5.85833 15.9833C6.53333 16.875 7.625 16.875 8.3 15.9833L9.14167 14.8583C9.74167 14.0583 10.7833 14 11.4667 14.7333C12.95 16.3167 14.1583 15.7917 14.1583 13.575V4.2C14.1667 0.841667 13.3833 0 10.2333 0ZM9.375 7.29167H4.79167C4.45 7.29167 4.16667 7.00833 4.16667 6.66667C4.16667 6.325 4.45 6.04167 4.79167 6.04167H9.375C9.71667 6.04167 10 6.325 10 6.66667C10 7.00833 9.71667 7.29167 9.375 7.29167Z"
    />
  </svg>
);
