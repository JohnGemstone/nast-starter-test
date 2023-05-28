import { IoIosPricetags } from "react-icons/io";
import { defineField, defineType } from "@sanity/types";


export const pricingSection = defineType({
  name: "pricingSection",
  title: "Pricing Section",
  type: "object",
  icon: IoIosPricetags,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Heading text, e.g. Simple no-tricks pricing",
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
      name: "priceCards",
      title: "Price Cards",
      type: "array",
      validation: (Rule) => [Rule.max(3).error("Maximum of Three Price Cards")],
      of: [
        defineField({
          name: "priceCard",
          title: "Price Card",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              description: "Name of price plan e.g. Lifetime membership",
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
              name: "features",
              title: "What’s included",
              type: "array",
              validation: (Rule) => [
                Rule.max(4).error("Maximum of Four Features"),
              ],
              of: [
                defineField({
                  name: "feature",
                  title: "Feature",
                  description: "Feature text, e.g. Unlimited projects",
                  type: "string",
                }),
              ],
            }),
            defineField({
              name: "priceFrequency",
              title: "Price frequency",
              description:
                "Eyebrow text describing price frequency, e.g. Pay once, own it forever",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "cta",
              title: "Call to action",
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "string",
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "terms",
              title: "Terms",
              description: "Short terms text, e.g. 30-day money-back guarantee",
              type: "string",
            }),
          ],
        }),
      ],
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
        subtitle: "Pricing Section",
        media: IoIosPricetags,
      };
    },
  },
});
