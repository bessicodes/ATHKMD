import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";
import {
  deskStructure,
} from "./deskStructure";
import {
  singletonDocumentActions,
  singletonNewDocumentOptions,
} from "./singletons";

export default defineConfig({
  name: "default",
  title: "Athlete Kingdom CMS",

  projectId: "YOUR_PROJECT_ID",
  dataset: "production",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: singletonDocumentActions,
    newDocumentOptions: singletonNewDocumentOptions,
  },
});
