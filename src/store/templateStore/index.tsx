import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CanvasObject, TemplateStoreTypes } from "./templateStore.types";

interface TemplatesState {
  templates: TemplateStoreTypes[];
  addTemplate: (newTemplate: TemplateStoreTypes[]) => void;
  removeTemplate: (uid: string) => void;
  updateTemplateObject: (
    uid: string,
    objectIndex: number,
    data: Partial<CanvasObject>
  ) => void;
  removeTemplateObject: (uid: string, index: number) => void;
}

const DEFAULT_TEMPLATES: TemplateStoreTypes[] = [];

const useTemplatesStore = create<TemplatesState>(
  persist<TemplatesState>(
    (set) => ({
      templates: DEFAULT_TEMPLATES,
      addTemplate: (newTemplate) =>
        set((state) => ({ templates: [...state.templates, ...newTemplate] })),
      removeTemplate: (uid) =>
        set((state) => ({
          templates: state.templates.filter((template) => template.uid !== uid),
        })),
      updateTemplateObject: (uid, objectIndex, data) =>
        set((state) => {
          const updatedTemplates = state.templates.map((template) => {
            if (template.uid === uid) {
              const updatedObjects = template.objects.map((object, oIndex) => {
                if (oIndex === objectIndex) {
                  return { ...object, ...data };
                }
                return object;
              });
              return { ...template, objects: updatedObjects };
            }
            return template;
          });
          console.log(data, updatedTemplates);
          return { templates: updatedTemplates };
        }),
      removeTemplateObject: (uid, index) =>
        set((state) => {
          const updatedTemplates = state.templates.map((template) => {
            if (template.uid === uid) {
              const updatedObjects = template.objects.filter(
                (_, idx) => idx !== index
              );
              return { ...template, objects: updatedObjects };
            }
            return template;
          });
          return { templates: updatedTemplates };
        }),
    }),
    {
      name: "templates",
    }
  ) as any
);

export default useTemplatesStore;
