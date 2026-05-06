import type {
  DocumentActionComponent,
  NewDocumentOptionsContext,
  TemplateItem,
} from "sanity";

export const singletonTypes = new Set(["siteSettings"]);
export const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export const singletonDocumentActions = (
  prev: DocumentActionComponent[],
  context: { schemaType: string },
) => {
  if (!singletonTypes.has(context.schemaType)) {
    return prev;
  }

  return prev.filter((action) =>
    action.action ? singletonActions.has(action.action) : false,
  );
};

export const singletonNewDocumentOptions = (
  prev: TemplateItem[],
  context: NewDocumentOptionsContext,
) => {
  if (context.creationContext.type !== "global") {
    return prev;
  }

  return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId));
};
