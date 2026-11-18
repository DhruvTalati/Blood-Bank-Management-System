import React from "react";

/*
  Shared SVG icon set for the Blood Bank app.
  - All icons inherit colour from the surrounding text (currentColor).
  - Size comes from CSS where set, otherwise from the `size` prop (default 18).
  - Extra props (className, style, title...) are passed to the <svg>.
*/

function Icon({ size = 18, filled = false, children, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Brand mark: solid blood drop */
export const DropIcon = (props) => (
  <Icon filled {...props}>
    <path d="M12 2.5c-.4 0-.8.2-1 .5C8.2 6.6 5 10.4 5 14.2A7 7 0 0 0 12 21a7 7 0 0 0 7-6.8c0-3.8-3.2-7.6-6-11.2-.2-.3-.6-.5-1-.5Z" />
  </Icon>
);

/* Navigation */
export const IconDashboard = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="7.5" height="9" rx="1.8" />
    <rect x="13.5" y="3" width="7.5" height="5.5" rx="1.8" />
    <rect x="13.5" y="11.5" width="7.5" height="9.5" rx="1.8" />
    <rect x="3" y="15" width="7.5" height="6" rx="1.8" />
  </Icon>
);

export const IconDonors = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" />
    <path d="M17 5.2a3.3 3.3 0 0 1 0 5.6" />
    <path d="M19 14.8c1.6.8 2.6 2.4 3 4.2" />
  </Icon>
);

export const IconInventory = (props) => (
  <Icon {...props}>
    <path d="M12 3c-3 3.6-6 7-6 10.3A6 6 0 0 0 12 19.5a6 6 0 0 0 6-6.2C18 10 15 6.600 12 3Z" />
    <path d="M9.500 13.500a2.500 2.500 0 0 0 2 2.400" />
  </Icon>
);

export const IconRequests = (props) => (
  <Icon {...props}>
    <rect x="5" y="4" width="14" height="17" rx="2.2" />
    <path d="M9 4V3h6v1" />
    <path d="M9 11h6M9 15h4" />
  </Icon>
);

export const IconUsers = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.500 20.500c.7-4 3.500-6 7.500-6s6.800 2 7.500 6" />
  </Icon>
);

export const IconReports = (props) => (
  <Icon {...props}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <rect x="7.500" y="12" width="3" height="5" rx=".8" />
    <rect x="12.500" y="8" width="3" height="9" rx=".8" />
    <rect x="17.500" y="5" width="2.500" height="12" rx=".8" />
  </Icon>
);

export const IconProfile = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.500 18.200c1.200-2 3-3 5.500-3s4.300 1 5.500 3" />
  </Icon>
);

export const IconSettings = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.400 13.500a1.600 1.600 0 0 0 .3 1.800l.1.100a2 2 0 1 1-2.800 2.800l-.1-.1a1.600 1.600 0 0 0-1.800-.3 1.600 1.600 0 0 0-1 1.500V19.500a2 2 0 1 1-4 0v-.1a1.600 1.600 0 0 0-1-1.500 1.600 1.600 0 0 0-1.800.3l-.1.100a2 2 0 1 1-2.800-2.800l.1-.1a1.600 1.600 0 0 0 .3-1.800 1.600 1.600 0 0 0-1.500-1H4.500a2 2 0 1 1 0-4h.1a1.600 1.600 0 0 0 1.500-1 1.600 1.600 0 0 0-.3-1.800l-.1-.1a2 2 0 1 1 2.800-2.800l.1.1a1.600 1.600 0 0 0 1.800.3h0a1.600 1.600 0 0 0 1-1.500V4.500a2 2 0 1 1 4 0v.1a1.600 1.600 0 0 0 1 1.500h0a1.600 1.600 0 0 0 1.800-.3l.1-.1a2 2 0 1 1 2.800 2.800l-.1.100a1.600 1.600 0 0 0-.3 1.800v0a1.600 1.600 0 0 0 1.500 1h.2a2 2 0 1 1 0 4h-.1a1.600 1.600 0 0 0-1.500 1Z" />
  </Icon>
);

/* Actions */
export const IconLogout = (props) => (
  <Icon {...props}>
    <path d="M9 4H6.500A2.500 2.500 0 0 0 4 6.500v11A2.500 2.500 0 0 0 6.500 20H9" />
    <path d="M15 8l4 4-4 4" />
    <path d="M19 12H9" />
  </Icon>
);

export const IconBell = (props) => (
  <Icon {...props}>
    <path d="M6 9.500a6 6 0 1 1 12 0c0 5 2 6.500 2 6.500H4s2-1.500 2-6.500Z" />
    <path d="M10 19.500a2.200 2.200 0 0 0 4 0" />
  </Icon>
);

export const IconRefresh = (props) => (
  <Icon {...props}>
    <path d="M20 11a8 8 0 0 0-14.400-4.200L4 8.500" />
    <path d="M4 4v4.500h4.500" />
    <path d="M4 13a8 8 0 0 0 14.400 4.200L20 15.500" />
    <path d="M20 20v-4.500h-4.500" />
  </Icon>
);

export const IconSearch = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.500" />
    <path d="M20 20l-4.200-4.200" />
  </Icon>
);

export const IconPlus = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const IconPrint = (props) => (
  <Icon {...props}>
    <path d="M7 9V4h10v5" />
    <rect x="4" y="9" width="16" height="8" rx="2" />
    <rect x="7" y="14" width="10" height="6" rx="1" />
  </Icon>
);

/* Extras, in case other screens use them */
export const IconEdit = (props) => (
  <Icon {...props}>
    <path d="M4 20h4L19 9a2.800 2.800 0 0 0-4-4L4 16v4Z" />
    <path d="M13.500 6.500l4 4" />
  </Icon>
);

export const IconView = (props) => (
  <Icon {...props}>
    <path d="M2.500 12S6 5.500 12 5.500 21.500 12 21.500 12 18 18.500 12 18.500 2.500 12 2.500 12Z" />
    <circle cx="12" cy="12" r="2.800" />
  </Icon>
);

export const IconTrash = (props) => (
  <Icon {...props}>
    <path d="M4 7h16" />
    <path d="M9 7V4.500h6V7" />
    <path d="M6.500 7l.8 12.500h9.400L17.500 7" />
    <path d="M10 11v5M14 11v5" />
  </Icon>
);

export const IconCheck = (props) => (
  <Icon {...props}>
    <path d="M5 12.500l4.500 4.500L19 7.500" />
  </Icon>
);

export const IconClose = (props) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const IconAlert = (props) => (
  <Icon {...props}>
    <path d="M12 4l9 16H3L12 4Z" />
    <path d="M12 10v4M12 17v.5" />
  </Icon>
);

export const IconLock = (props) => (
  <Icon {...props}>
    <rect x="5" y="10.500" width="14" height="10" rx="2.200" />
    <path d="M8 10.500V8a4 4 0 0 1 8 0v2.500" />
  </Icon>
);

export const IconMail = (props) => (
  <Icon {...props}>
    <rect x="3" y="5.500" width="18" height="13" rx="2.200" />
    <path d="M3.500 7l8.500 6 8.500-6" />
  </Icon>
);

export const IconArrowRight = (props) => (
  <Icon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);
