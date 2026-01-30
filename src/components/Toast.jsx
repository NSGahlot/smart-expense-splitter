import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../features/toast/toastSlice";
import "./Toast.css";

const Toast = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, toast.duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">{getIcon(toast.type)}</span>
          <span className="toast-message">{toast.message}</span>
          <button
            className="toast-close"
            onClick={() => dispatch(removeToast(toast.id))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

const getIcon = (type) => {
  switch (type) {
    case "success":
      return "✓";
    case "error":
      return "✕";
    case "warning":
      return "⚠";
    default:
      return "ℹ";
  }
};

export default Toast;
