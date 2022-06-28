import { toast, Flip } from 'react-toastify';
import './Toast.css';

const curMsgs = {};
export const showNotification = (message, type, timeOut) => {
  if (curMsgs[message]) {
    toast.update(curMsgs[message], {
      type,
      autoClose: timeOut,
      onClose: () => {
        delete curMsgs[message];
      },
    });
    return curMsgs[message];
  }
  curMsgs[message] = toast(`${message}`, {
    type,
    autoClose: timeOut,
    transition: Flip,
    onClose: () => {
      delete curMsgs[message];
    },
  });
  return curMsgs[message];
};

export const dismissNotification = (toastId) => toast.dismiss(toastId);
