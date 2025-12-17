import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./AppRouter";
import { authService } from "./services/AuthService";
import { AUTH_EVENTS } from "./config/constants";

const App = () => {
  useEffect(() => {
    const { unsubscribe } = authService.subscribeToAuthChanges((event) => {
      if (event === AUTH_EVENTS.SIGNED_IN || event === AUTH_EVENTS.SIGNED_OUT) {
        router.revalidate();
      }
    });
    return () => unsubscribe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
