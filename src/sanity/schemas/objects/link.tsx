import { defineField, defineType } from "@sanity/types";

type Link = {
  _type: string;
  label: string;

  typeOfLink: string;
  external: string;
  anchor: string;
  internal: {
    _ref: string;
    _type: string;
  };
};

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
    }),
    defineField({
      name: "typeOfLink",
      title: "Type",
      type: "string",
      initialValue: "external",
      options: {
        list: [
          { title: "External", value: "external" },
          { title: "Internal", value: "internal" },
          { title: "Anchor", value: "anchor" },
        ],
      },
    }),
    defineField({
      name: "external",
      title: "External",
      type: "url",
      hidden: ({ parent }: { parent: Link | undefined }) => {
        return parent?.typeOfLink !== "external";
      },
    }),
    defineField({
      name: "anchor",
      title: "Anchor",
      type: "string",
      hidden: ({ parent }: { parent: Link | undefined }) => {
        return parent?.typeOfLink !== "anchor";
      },
    }),
    defineField({
      name: "internal",
      title: "Internal",
      type: "reference",
      to: [{ type: "service" }],
      hidden: ({ parent }: { parent: Link | undefined }) => {
        return parent?.typeOfLink !== "internal";
      },
    }),
  ],
});
