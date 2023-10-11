import { useRouteError } from "react-router-dom";
import { Button } from "../components/ui/button";
import { redirect } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button onClick={() => redirect('/')}>Back to home</Button>
    </div>
  );
}
