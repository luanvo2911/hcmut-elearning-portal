import { AdminRoute, LoginRoute } from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/administrator" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
