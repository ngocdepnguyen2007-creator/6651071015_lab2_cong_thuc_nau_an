export function formatCurrency(amount: number, currency = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function truncateText(text: string, maxLength: number): string {
  if (maxLength < 0) {
    throw new RangeError('maxLength must not be negative')
  }
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function debounce<T extends (...args: never[]) => void>(fn: T, delay: number): T {
  if (delay < 0) {
    throw new RangeError('delay must not be negative')
  }

  let timeout: ReturnType<typeof setTimeout> | undefined
  const debounced = (...args: Parameters<T>): void => {
    if (timeout !== undefined) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => fn(...args), delay)
  }

  return debounced as T
}
