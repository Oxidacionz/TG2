import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./AppRouter";
import { authService } from "./services/AuthService";
import { AuthEvent } from "./types/enums";

const App = () => {
  useEffect(() => {
    const { unsubscribe } = authService.subscribeToAuthChanges((event) => {
      const isSignIn = event === AuthEvent.SIGNED_IN;
      const isSignOut = event === AuthEvent.SIGNED_OUT;
      const shouldRevalidate = isSignIn || isSignOut;

      if (shouldRevalidate) router.revalidate();
    });
    return () => unsubscribe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
