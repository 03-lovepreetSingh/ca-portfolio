"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

/**
 * Wraps next-themes so the rest of the app can toggle light/dark. Lives in a
 * client component (theme state needs the browser) but is mounted high in the
 * server-rendered layout so there's no flash of wrong theme.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
