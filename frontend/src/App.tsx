import { Suspense } from "react";
import { useRoutes } from "react-router";
import "./App.css";
import allRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = useRoutes(allRoutes);
  return (
    <>
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        {routes}
      </Suspense>
    </>
  );
}

export default App;
