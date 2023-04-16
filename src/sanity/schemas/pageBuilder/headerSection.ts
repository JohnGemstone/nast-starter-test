import { TfiLayoutCtaCenter } from "react-icons/tfi";
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
      type: "string",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      validation: Rule => [
        Rule.max(5).error('Maximum of Five Links'),
      ],
      of: [
        defineArrayMember({
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
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
        Rule.max(5).error('Maximum of Five Stats'),
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
