import { TfiLayoutCtaCenter } from "react-icons/tfi";
import { defineField, defineType } from "@sanity/types";

export const featureSection = defineType({
  name: "featureSection",
  title: "Banner",
  type: "object",
  icon: TfiLayoutCtaCenter,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "CTA to Form",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alt text for the image.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title,
        subtitle: "Simple Banner",
        media: media || TfiLayoutCtaCenter,
      };
    },
  },
});

// headerImage, flavourText, slug, name, altText
