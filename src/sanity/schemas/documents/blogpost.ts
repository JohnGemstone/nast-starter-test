import { defineField, defineType, defineArrayMember } from "@sanity/types";
import { IoDocumentTextOutline } from "react-icons/io5";

export const blogPost = defineType({
  name: "post",
  type: "document",
  title: "Blog Post",
  icon: IoDocumentTextOutline,
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
      name: "title",
      type: "string",
      title: "Title",
      group: ["seo", "content"],
      description: "Titles should be catchy, descriptive, and not too long",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      group: ["seo", "content"],
      validation: (Rule) => Rule.required(),
      description: "Name page's URL after https://adnplc.com/blog/",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      group: ["seo", "content"],
      rows: 3,
      description:
        "This can be used to provide a short description of the article. Max 150 characters",
      validation: (Rule) => Rule.max(150),
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      description: "This can be used to schedule post for publishing",
      group: ["content"],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "tags",
      options: {
        includeFromRelated: 'tags',
      },
      group: ["content"],
    }),


    defineField({
      name: "headerImage",
      type: "image",
      title: "Header image",
      options: {
        hotspot: true,
      },
      group: ["content"],
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessiblity.",
            }),
          ],
        }),
      ],
      group: ["content"],
    }),



    defineField({
      name: "seoOveride",
      type: "boolean",
      title: "SEO Overide",
      group: "seo",
      description: "Check this box to overide the SEO settings",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      type: "object",
      title: "SEO",
      group: "seo",
      description: "SEO settings for this page",
      hidden: ({ parent }) => !parent.seoOveride,
      options: {
        collapsible: true,
      },
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          description: "Used the <meta> title tag for SEO.",
        }),
        defineField({
          name: "description",
          type: "text",
          title: "Description",
          description: "Used the <meta> description tag for SEO.",
          rows: 3,
        }),
      ],
    }),
  ],
  orderings: [
    {
      name: "publishingDateAsc",
      title: "Publishing date new–>old",
      by: [
        {
          field: "publishedAt",
          direction: "asc",
        },
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
    {
      name: "publishingDateDesc",
      title: "Publishing date old->new",
      by: [
        {
          field: "publishedAt",
          direction: "desc",
        },
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      slug: "slug",
      media: "headerImage",
    },
    prepare({ title = "No title", publishedAt, slug = {}, media }) {
      const path = `/blog/${slug.current}`;
      return {
        title,
        media,
        subtitle: publishedAt ? path : "Missing publishing date",
      };
    },
  },
});
