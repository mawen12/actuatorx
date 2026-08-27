import type { NavGroup } from "@/components/layout/types";
import { Bean, ChartLine, Construction, Container, FileX, HeartPulse, Lock, Palette, ServerOff, Settings, ShieldLock, ShieldX, UserCog, UserRoundX } from "lucide-react";

export const navGroups: NavGroup[] = [
  {
    title: 'General',
    items: [
      {
        title: 'Health',
        url: '/health',
        icon: HeartPulse,
      },
      {
        title: 'Metrics',
        url: '/metrics',
        icon: ChartLine,
      },
      {
        title: 'Env',
        url: '/env',
        icon: Container,
      },
      {
        title: 'Beans',
        url: '/beans',
        icon: Bean,
      },
    ],
  },
  {
    title: 'Pages',
    items: [
      {
        title: 'Auth',
        icon: ShieldLock,
        items: [
          {
            title: 'Sign In',
            url: "/sign-in",
          },
          {
            title: 'Sign In (2 Col)',
            url: "/sign-in-2",
          },
          {
            title: 'Sign Up',
            url: "/sign-up",
          },
          {
            title: 'Forgot Password',
            url: "/forgot-password",
          },
          {
            title: 'OTP',
            url: "/otp",
          },
        ]
      },
      {
        title: 'Errors',
        icon: ShieldX,
        items: [
          {
            title: 'Unauthorized',
            url: '/errors/unauthorized',
            icon: Lock,
          },
          {
            title: 'Forbidden',
            url: '/errors/forbidden',
            icon: UserRoundX,
          },
          {
            title: 'Not Found',
            url: '/errors/not-found',
            icon: FileX,
          },
          {
            title: 'Internal Server Error',
            url: '/errors/internal-server-error',
            icon: ServerOff,
          },
          {
            title: 'Maintenance Error',
            url: '/errors/maintenance-error',
            icon: Construction,
          },
        ]
      }
    ]
  },
  {
    title: 'Other',
    items: [
      {
        title: 'Settings',
        icon: Settings,
        items: [
          {
            title: 'Profile',
            url: "/settings",
            icon: UserCog,
          },
          {
            title: 'Appearance',
            url: "/settings/appearance",
            icon: Palette,
          },
        ]
      },

    ]
  }
]