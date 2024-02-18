import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Admin, Index, Login } from "./pages";
import { AuthProvider, RequireAuth } from "./contexts";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Index />} />
          <Route path="/admin/login/*" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
