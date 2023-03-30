import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { defineField, defineType } from "@sanity/types";

export const iconPicker = defineType({
  name: "iconPicker",
  title: "Icon Picker",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "provider",
      title: "Provider",
      type: "string",
      options: {
        list: [
          { title: "Ai", value: "ai" },
          { title: "Fa", value: "fa" },
          { title: "Mdi", value: "mdi" },
          { title: "Hi", value: "hi" },
          { title: "Fi", value: "fi" },
          { title: "Vsc", value: "vsc" },
        ],
      },
      // hidden: true,
    }),
  ]
});