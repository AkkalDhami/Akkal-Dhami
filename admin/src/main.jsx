import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import store from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={true} />

        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
