import { useNavigate, useParams } from "react-router";
import CanvasView from "../components/canvas";
import { useEffect, useMemo, useState } from "react";
import { TemplateStoreTypes } from "../store/templateStore/templateStore.types";
import useTemplatesStore from "../store/templateStore";
import { ROOT_PATH } from "../settings/routePath";
import useAuthStore from "../store/authStore";
import { manageControls } from "../utils";

export default function Template() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { templates } = useTemplatesStore();
  const {
    auth: { user },
  } = useAuthStore();

  const [template, setTemplate] = useState<TemplateStoreTypes>();
  useEffect(() => {
    if (id) {
      const templateData = templates.find((item) => item.uid === id);
      if (templateData) {
        setTemplate(templateData);
      } else {
        navigate(ROOT_PATH, { replace: true });
      }
    }
  }, [id, templates, navigate]);

  const controlledTemplateData = useMemo(() => {
    if (template && user?.role === "user") {
      const templateData = { ...template };
      templateData.objects = [
        ...templateData.objects.map((item) => ({
          ...item,
          ...manageControls(item.type === "image"),
        })),
      ];
      return templateData;
    }
    return template;
  }, [user, template]);
  return (
    <div className="flex-1 flex relative">
      {controlledTemplateData && <CanvasView data={controlledTemplateData} />}
    </div>
  );
}
