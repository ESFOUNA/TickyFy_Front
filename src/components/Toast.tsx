import { useEffect } from "react";

const Toast = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
      {message}
    </div>
  );
};

export default Toast;
