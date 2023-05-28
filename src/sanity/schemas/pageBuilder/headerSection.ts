import { TfiLayoutCtaCenter, TfiLink } from "react-icons/tfi";
import { defineField, defineType, defineArrayMember } from "@sanity/types";

export const headerSection = defineType({
  name: "headerSection",
  title: "Header Section",
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
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      validation: Rule => [
        Rule.max(4).error('Maximum of Four Links'),
      ],
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          icon: TfiLink,
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ]
    }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      validation: Rule => [
        Rule.max(4).error('Maximum of Four Stats'),
      ],
      of: [
        defineArrayMember({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
        }),
      ]
    }),

    defineField({
      name: "image",
      title: "Background Image",
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
        subtitle: "Header Section",
        media: media || TfiLayoutCtaCenter,
      };
    },
  },
});

// headerImage, flavourText, slug, name, altText
