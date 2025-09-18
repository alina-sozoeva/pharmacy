import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router";
import { MyErrorBoundary } from "./components";

function App() {
  return (
    <MyErrorBoundary>
      <RouterProvider router={router} />
    </MyErrorBoundary>
  );
}

export default App;
