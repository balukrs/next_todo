"use client";

import { toast, Bounce } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  pauseOnFocusLoss: true,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Bounce,
};
// info, success, warning, error, default
const Notifications = (message = null, type = "default", config = {}) => {
  if (!message) return;
  toast(message, {
    ...toastConfig,
    ...config,
    type,
    toastId: message,
  });
};

export default Notifications;
