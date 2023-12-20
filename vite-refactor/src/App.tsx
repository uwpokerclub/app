import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Index } from "./pages";
import { AuthProvider } from "./contexts";
import { Login } from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Index />} />
          <Route path="/admin/login/*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
