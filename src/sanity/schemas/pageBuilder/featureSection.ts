import { TfiLayoutCtaCenter } from "react-icons/tfi";
import { defineField, defineType, defineArrayMember } from "@sanity/types";

export const featureSection = defineType({
  name: "featureSection",
  title: "Feature Section",
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
      name: "subheading",
      title: "Subheading",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
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
          title: "Alt text",
          type: "string",
          description: "Alt text for the image.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      validation: Rule => [
        Rule.required().max(3).error('Maximum of Three Features'),
      ],
      of: [
        defineArrayMember({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "iconPicker",
            }),
          ],
        }),
      ]
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
        subtitle: "Feature Section",
        media: media || TfiLayoutCtaCenter,
      };
    },
  },
});

// headerImage, flavourText, slug, name, altText
