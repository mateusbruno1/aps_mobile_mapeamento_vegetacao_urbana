import { showToast } from '../utils/Toast';

enum VariantType {
  success = 'success',
  error = 'error',
  error2 = 'error2'
}

export interface Notification {
    success: (content: string, duration?: number) => void
    error: (content: string, duration?: number, marginBottom?: number) => void
    error2: (content: string, duration?: number, marginBottom?: number) => void
}

export function useNotification(): Notification {

  const success = (content: string, duration: number = 4000) => {
    showToast(content, VariantType.success, duration);
  }

  const error = (content: string, duration: number = 4000, marginBottom: number = 60) => {
    showToast(content, VariantType.error, duration, marginBottom);
  }

  const error2 = (content: string, duration: number = 4000, marginBottom: number = 60) => {
    showToast(content, VariantType.error2, duration, marginBottom);
  }

  return {
    success,
    error,
    error2
  };
}
