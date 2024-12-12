import { LoaderFunctionArgs } from "react-router";
import useTemplatesStore from "../store/templateStore";

export async function loadTemplate({
  params,
}: LoaderFunctionArgs<{ id: string }>) {
  return useTemplatesStore
    .getState()
    .templates.filter((template) => template.uid === params.id);
}
