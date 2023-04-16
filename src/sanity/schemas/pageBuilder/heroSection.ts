import { TfiLayoutCtaCenter } from "react-icons/tfi";
import { defineField, defineType } from "@sanity/types";


export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  icon: TfiLayoutCtaCenter,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "enablePrimaryLink",
      title: "Enable Primary Link",
      type: "boolean",
    }),
    defineField({
      name: "primaryLink",
      title: "Primary Link",
      type: "link",
      hidden: ({ parent }) => !parent.enablePrimaryLink,
    }),
    defineField({
      name: "enableSecondaryLink",
      title: "Enable Secondary Link",
      type: "boolean",
    }),
    defineField({
      name: "secondaryLink",
      title: "Secondary Link",
      type: "link",
      hidden: ({ parent }) => !parent.enableSecondaryLink,
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
        subtitle: "Hero Section",
        media: TfiLayoutCtaCenter,
      };
    },
  },
});

