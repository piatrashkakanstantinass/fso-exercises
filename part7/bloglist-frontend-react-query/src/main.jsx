import ReactDOM from "react-dom/client";
import App from "./App";
import NotificationProvider from "./contexts/NotificationProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import UserProvider from "./contexts/UserProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);
