import {
  definePlugin,
  DocumentDefinition,
  DocumentPluginOptions,
  PluginOptions,
} from "sanity";
import { StructureResolver } from "sanity/desk";

export const productionUrlPlugin = () =>
  definePlugin({
    name: "custom-production-url",

    // code remains exactly the same, but is now contained by the plugin
    document: {
      productionUrl: async (prev, { document }) => {
        // assume there is 20+ lines of code here
        const useCustomUrl = true;
        if (useCustomUrl) {
          return "https://some-custom-url.xyz";
        }
        return prev;
      },
    },
  });

export const singletonPlugin = (types: string[]): PluginOptions => ({
  name: "singletonPlugin",
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem) => !types.includes(templateItem.templateId)
        );
      }
      return prev;
    },
  },
});

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[]
): StructureResolver => {
  return (S) => {
    // Prepare Singletons for the DeskTool
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title ? typeDef.title : typeDef.name)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
            .views([S.view.form()])
        );
    });

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find(
          (singleton) =>
            singleton.name === listItem.getId() ||
            "media.tag" === listItem.getId()
        )
    );

    return S.list()
      .title("Content")
      .items([...singletonItems, S.divider(), ...defaultListItems]);
  };
};

// export const singletonPlugin = (types: string[]) => definePlugin({
//   name: 'singletonPlugin',
//   document: {
//     // Hide 'Singletons (such as Home)' from new document options
//     // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
//     newDocumentOptions: (prev, { creationContext }) => {
//       if (creationContext.type === 'global') {
//         return prev.filter(
//           (templateItem) => !types.includes(templateItem.templateId)
//         )
//       }

//       return prev
//     },

//     // Removes the "duplicate" action on the Singletons (such as Home)
//     actions: (prev, { schemaType }) => {
//       if (types.includes(schemaType)) {
//         return prev.filter(({ action }) => action !== 'duplicate')
//       }
//       return prev
//     },
//   },
// })
