import { useEffect, useState } from "react";

const useTimeoutMessage = (initialMessage = null, timeout = 5000) => {
  const [message, setMessage] = useState(initialMessage);
  useEffect(() => {
    if (message === null) {
      return;
    }
    const timeoutId = setTimeout(() => setMessage(null), timeout);

    return () => clearTimeout(timeoutId);
  }, [message, timeout]);
  return [message, setMessage];
};

export default useTimeoutMessage;
