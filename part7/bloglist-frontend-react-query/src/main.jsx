import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationProvider from "./contexts/NotificationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
);
