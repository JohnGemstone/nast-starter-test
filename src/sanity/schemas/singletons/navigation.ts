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
      name: "services",
      title: "Services",
      type: "array",
      description: "Select up to six products to display in the navigation.",
      of: [
        {
          type: "reference",
          to: [
            {type: 'service'}
          ]
        }
      ],
      validation: Rule => Rule.required().max(6).error('A Maximum of six products can be selected.'),
    }),
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

