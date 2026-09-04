import type { NavGroup } from "@/components/layout/types";
import { Bean, ChartLine, Construction, Container, DatabaseZap, FileSliders, FileX, HeartPulse, Lock, Map, Palette, ScrollText, ServerOff, Settings, ShieldLock, ShieldX, SlidersHorizontal, UserCog, UserRoundX } from "lucide-react";

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
      {
        title: 'Conditions',
        url: '/conditions',
        icon: SlidersHorizontal,
      },
      {
        title: 'Configprops',
        url: '/configprops',
        icon: FileSliders,
      },
      {
        title: 'Caches',
        url: '/caches',
        icon: DatabaseZap,
      },
      {
        title: 'Loggers',
        url: '/loggers',
        icon: ScrollText,
      },
      {
        title: 'Mappings',
        url: '/mappings',
        icon: Map,
      },
      {
        title: 'Http Exchanges',
        url: '/http-exchanges',
        icon: Bean,
      },
      {
        title: 'Thread Dump',
        url: '/thread-dump',
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

  // TODO 状态与基础信息 (Health & Application Info)
  // /health /info /env /configprops

  // TODO 监控与度量指标 (Metrics & Observability)
  // /metrics /prometheus /caches /scheduledtasks

  // TODO 调试与排错 (Troubleshooting & Diagnostics)
  // /threaddump /heapdump /loggers /httpexchanges

  // TODO 应用结构与路由 (Application Architecture & Routing)
  // /beans /mappings /conditions

  // TODO Spring Cloud 专属管理 (Spring Cloud Management)
  // /refresh /bus-refresh /features /serviceregistry /gateway
]