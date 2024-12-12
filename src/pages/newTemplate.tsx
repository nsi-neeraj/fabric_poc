import { useEffect } from "react";
import CanvasView from "../components/canvas";
import useAuthStore from "../store/authStore";
import { ROOT_PATH } from "../settings/routePath";
import { useNavigate } from "react-router";

export default function NewTemplate() {
  const navigate = useNavigate();
  const {
    auth: { user },
  } = useAuthStore();
  useEffect(() => {
    if (user?.role === "user") navigate(ROOT_PATH, { replace: true });
  }, [navigate, user]);
  return (
    <div className="flex-1 flex relative">
      <CanvasView isNew />
    </div>
  );
}
