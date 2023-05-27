import { TfiLayoutCtaCenter } from "react-icons/tfi";
import { defineField, defineType, defineArrayMember } from "@sanity/types";

export const ctaSection = defineType({
  name: "ctaSection",
  title: "CTA Section",
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
      type: "string",
    }),
    defineField({
      name: "primaryLink",
      title: "Primary Link",
      type: "link",
    }),
    defineField({
      name: "secondaryLink",
      title: "Secondary Link",
      type: "link",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      // options: {
      //   hotspot: true,
      // },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Alt text for the image.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title,
        subtitle: "CTA Section",
        media: media || TfiLayoutCtaCenter,
      };
    },
  },
});

// headerImage, flavourText, slug, name, altText

const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "enable",
      title: "Enable?",
      type: "boolean",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      hidden: ({ parent }) => !parent?.enable,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      hidden: ({ parent }) => !parent?.enable,
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields = {}) => {
      if (!fields.title && !fields.link && fields.enable) {
        return "You must provide a label and URL for the primary link.";
      }
      return true;
    }),
});
