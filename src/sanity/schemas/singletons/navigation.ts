import { fetchFromClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { AiOutlineCompass } from "react-icons/ai";
import { defineField, defineType } from "@sanity/types";
import { TitleWithSuffix } from "@/sanity/components/TitleWithSuffix";


export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: AiOutlineCompass,
  fields: [
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      description: "Select up to six products to display in the navigation.",
      of: [
        {
          type: "reference",
          to: [
            {type: 'product'}
          ]
        }
      ],
      validation: Rule => Rule.required().max(6).error('A Maximum of six products can be selected.'),
    }),
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      description: "Select up to eight solutions to display in the navigation.",
      of: [
        {
          type: "reference",
          to: [
            {type: 'solution'}
          ]
        }
      ], 
      validation: Rule => Rule.required().max(8).error('A Maximum of eight solutions can be selected.'),
    }),
    defineField(
      {
        name: "solutionsTile",
        type: "object",
        title: "Solutions Tile",
        fields: [
          defineField({
            name: "title",
            type: "string",
            title: "Title",
          }),
          defineField({
            name: "image",
            type: "image",
            title: "Image",
            fields: [
              defineField({
                name: "alt",
                type: "string",
                title: "Alternative text",
              }),
            ],
          }),
          defineField({
            name: "link",
            type: "string",
            title: "Link",
          }),
        ],
      }
    ),
    defineField({
      name: "environments",
      title: "Environments",
      type: "array",
      description: "Select up to eight environments to display in the navigation.",
      of: [
        {
          type: "reference",
          to: [
            {type: 'environment'}
          ]
        }
      ], 
      validation: Rule => Rule.required().max(8).error('A Maximum of eight environments can be selected.'),
    }),
    defineField(
      {
        name: "environmentsTile",
        type: "object",
        title: "Environments Tile",
        fields: [
          defineField({
            name: "title",
            type: "string",
            title: "Title",
          }),
          defineField({
            name: "image",
            type: "image",
            title: "Image",
            fields: [
              defineField({
                name: "alt",
                type: "string",
                title: "Alternative text",
              }),
            ],
          }),
          defineField({
            name: "link",
            type: "string",
            title: "Link",
          }),
        ],
      }
    ),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation Settings",
      };
    },
  },
});


export const homePageQuery = groq`
*[_type == "homePage"][0]{
  _id, 
  title,
  description,
}
`

