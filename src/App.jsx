import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/Toast";

function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Toast />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
