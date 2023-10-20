import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  function handleClick() {
    navigate("/data");
  }
  return (
    <div id="error-page" className="flex items-center justify-center flex-col h-full gap-4">
      <h1 className="text-6xl">Oops!</h1>
      <p className="text-sm text-neutral-400">Sorry, but page you are looking for doesn't exist.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button onClick={handleClick}>Back to home</Button>
    </div>
  );
}
