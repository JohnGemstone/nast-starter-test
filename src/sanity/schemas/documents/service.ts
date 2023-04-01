import { fetchFromClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";
import { FiPackage } from "react-icons/fi";
import { defineField, defineType, defineArrayMember } from "@sanity/types";
import { SlugInputFix } from "@/sanity/components/SlugInputFix";
import { TitleWithSuffix } from "@/sanity/components/TitleWithSuffix";
import { HeaderBlockEditor } from "@/sanity/schemas/objects/editors";

import * as pageBuilder from '@/sanity/schemas/pageBuilder'
import { siteName } from "@/data/globals";

const pageBuilderTypes = Object.values(pageBuilder).map((type) => {return {type: type.name}});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: FiPackage,
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the product. Used for navigation and menus.",
      group: ["content", "seo"],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 30,
        //@ts-expect-error
        urlPrefix: siteName,
      },
      group: "seo",
      validation: (Rule) => Rule.required(),
      components: {
        input: SlugInputFix,
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Used the <meta> title tag for SEO.",
      group: "seo",
      validation: (Rule) => Rule.required(),
      components: {
        input: TitleWithSuffix,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Used the <meta> description tag for SEO.",
      group: "seo",
      rows: 3,
    }),
    defineField({
      name: "snippet",
      title: "Snippet",
      type: "text",
      description: "Text used in components that link to this document.",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "headerContent",
      title: "Header Content",
      type: "object",
      group: "content",
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: "headerImage",
          title: "Header Image",
          type: "image",
          description: "High resolution image for header banner.",
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
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "headerText",
          title: "Header Text",
          type: "array",
          of: [HeaderBlockEditor],
          description:
            "Text that appears in the header. Must contain a heading (H1).",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "CTA",
          title: "Call To Action",
          type: "string",
          description:
            "Text for the CTA button. Defaults to 'Start Your Project'",
          initialValue: "Start Your Project",
        }),
      ],
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [...pageBuilderTypes]
    }),
    // defineField({
    //   name: "featuredCaseStudy",
    //   title: "Featured Case Study",
    //   type: "reference",
    //   to: [{ type: "caseStudy" }],
    // }),
  ],
  preview: {
    select: {
      title: "name",
      subheader: "snippet",
      image: "headerContent.headerImage",
    },
    prepare({ title, subheader, image }) {
      return {
        title: title,
        subtitle: subheader,
        media: image,
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
`;
