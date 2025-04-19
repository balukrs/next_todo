'use client';

import { toast, Bounce, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  pauseOnFocusLoss: true,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Bounce,
};

type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'default';

const Notifications = (message: string | null = null, type: NotificationType = 'default'): void => {
  if (message != null) return;
  toast(message, {
    ...toastConfig,
    type,
    ...(message != null ? { toastId: message } : {}),
  });
};

export default Notifications;
