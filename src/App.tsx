import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<Index />} />
    </Routes>
  </BrowserRouter>
);

export default App;
