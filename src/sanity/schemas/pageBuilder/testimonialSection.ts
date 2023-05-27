import { BsPersonBoundingBox } from "react-icons/bs";
import { defineField, defineType } from "@sanity/types";

export const testimonialSection = defineType({
  name: "testimonialSection",
  title: "Testimonial Section",
  type: "object",
  icon: BsPersonBoundingBox,
  fields: [
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      description: "e.g. Judith Black",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      description: "e.g. CEO of Workcation",
      type: "string",
    }),
    defineField({
      name: "avatar",
      type: "image",
      title: "Avatar",
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Name of company.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "title",
      media: "avatar",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title + " - " + subtitle,
        subtitle: "Testimonial Section",
        media: media || BsPersonBoundingBox,
      };
    },
  },
});
