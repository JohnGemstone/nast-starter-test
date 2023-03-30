import { BsPersonBoundingBox } from "react-icons/bs";
import { defineField, defineType } from "@sanity/types";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  icon: BsPersonBoundingBox,
  fields: [
    defineField({
      name: "testimonialText",
      title: "Testimonial Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "testimonialAuthor",
      title: "Author, Position",
      description: "e.g. Alice Bellamy, Regional Director",
      type: "string",
    }),
    defineField({
      name: "testimonialCompany",
      title: "Company Name",
      description: "e.g. McDonalds",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "testimonialCompany",
      subtitle: "testimonialAuthor",
      media: "image",
    },
    prepare(selection) {
      console.log("selection:", selection);

      const { title, subtitle, media } = selection;
      return {
        title: "Testimonial: " + title,
        subtitle,
        media,
      };
    },
  },
});
