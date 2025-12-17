import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./AppRouter";
import { authService } from "./services/AuthService";

const App = () => {
  useEffect(() => {
    const { unsubscribe } = authService.subscribeToAuthChanges((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.revalidate();
      }
    });
    return () => unsubscribe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
