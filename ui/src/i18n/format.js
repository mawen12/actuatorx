export const datetimeFormats = {
  'en-US': {
    short: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      weekday: 'long',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
    shortMedium: {
      dateStyle: 'short',
      timeStyle: 'medium',
    },
  },

  'zh-CN': {
    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      weekday: 'long',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
    shortMedium: {
      dateStyle: 'short',
      timeStyle: 'medium',
    },
  },
}

export const numberFormats = {
  'en-US': {
    integer: {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: 0,
    },

    decimal1: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },

    decimal2: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },

    percent0: {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },

    percent1: {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },

    currency: {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol',
    },

    compact: {
      notation: 'compact',
      compactDisplay: 'short',
    },

    metric: {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: 2,
    },
  },

  'zh-CN': {
    integer: {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: 0,
    },

    decimal1: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },

    decimal2: {
      style: 'decimal',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },

    percent0: {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    },

    percent1: {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    },

    currency: {
      style: 'currency',
      currency: 'CNY',
      currencyDisplay: 'symbol',
    },

    compact: {
      notation: 'compact',
      compactDisplay: 'short',
    },

    metric: {
      style: 'decimal',
      useGrouping: true,
      maximumFractionDigits: 2,
    },
  },
}
