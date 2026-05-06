import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SiteContentProvider } from "@/content/SiteContentProvider";

createRoot(document.getElementById("root")!).render(
  <SiteContentProvider>
    <App />
  </SiteContentProvider>
);
