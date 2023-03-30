import { IoDocumentTextOutline } from "react-icons/io5";
import { defineField, defineType, defineArrayMember } from "@sanity/types";
import { TitleWithSuffix } from "@/sanity/components/TitleWithSuffix";
import { SlugInputFix } from "@/sanity/components/SlugInputFix";
import { CaseStudyBlockEditor } from "@/sanity/schemas/objects/editors";

const pageBuilder = defineField({
  name: "pageBuilder",
  title: "Page Builder",
  type: "array",
  group: "content",
  description: "Add content to the page.",
  of: [
    { type: "accordionWithImage" },
    { type: "keyFeaturesCard" },
    { type: "accordionCenter" },
    { type: "logoCarousel" },
    { type: "testimonial" },
    { type: "threeFeatures" },
    { type: "bannerCaseStudy" },
    { type: "bookDemo" },
    { type: "relatedSection" },
    { type: "featureSection" },
    { type: "bannerSimple" },
    { type: "twoColumn" },
  ],
});



export const casestudy = defineType({
  title: "Case Study",
  name: "casestudy",
  type: "document",
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
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the casestudy.",
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
        urlPrefix: "lcdshowcase.uk/casestudies/",
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
      // validation: (Rule) => Rule.required(),
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
      description:
        "A short summary about the who and what the case study is about (~20 words)",
      group: "content",
      rows: 2,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      description: "High resolution image for header.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alt text for the image.",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Sector Tag",
      name: "sectorTag",
      type: "string",
      options: {
        list: [
          { value: "retail", title: "Retail" },
          { value: "hospitality", title: "Hospitality" },
          { value: "healthcare", title: "Healthcare" },
          { value: "public", title: "Public" },
          { value: "residential", title: "Residential" },
          { value: "corporate", title: "Corporate" },
          { value: "education", title: "Education" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "Product Tags",
      name: "productTags",
      description: "Does this case study relate to any of our products?",
      type: "array",
      of: [
        defineArrayMember({
          title: "Related Item",
          name: "product",
          type: "reference",
          to: [{ type: "product" }],
        }),
      ],
    }),

    defineField({
      title: 'Images',
      name: 'images',
      type: 'array',
      description: 'Add images to the gallery',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
      // preview: {
      //   select: {
      //     images: 'images',
      //     image: 'images.0',
      //   },
      //   prepare(selection) {
      //     return {
      //       title: `Gallery block of ${Object.keys(images).length} images`,
      //       subtitle: `Alt text: ${image.alt}`,
      //       media: image,
      //     };
      //   },
      // },
    }),

    defineField({
      title: 'The Challenge',
      name: 'body_thechallenge',
      type: 'array',
      of: [
        CaseStudyBlockEditor
      ]
    }),
    defineField({
      title: 'Our Solution',
      name: 'body_oursolution',
      type: 'array',
      of: [
        CaseStudyBlockEditor
      ]
    }),
    defineField({
      title: 'The Outcome',
      name: 'body_theoutcome',
      type: 'array',
      of: [
        CaseStudyBlockEditor
      ]
    }),

    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',

      fields: [
        {
          name: 'enabled',
          title: 'Add testimonial?',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'testimonialText',
          title: 'Testimonial Text',
          type: 'text',
          rows: 3,
          hidden: ({parent}) => !parent?.enabled,
        },
        {
          name: 'testimonialAuthor',
          title: 'Author, Position',
          description: 'e.g. Alice Bellamy, Regional Director',
          type: 'string',
          hidden: ({parent}) => !parent?.enabled,
        }
      ],
    }),

    // defineField({
    //   name: 'relatedStudies',
    //   title: 'Related Studies',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'reference',
    //       title: "Select a case study",
    //       to: [
    //         {type: 'casestudy'}
    //       ]
    //     }
    //   ]
    // }),

    // defineField({
    //   name: 'form',
    //   title: 'Contact Form',
    //   type: 'object',

    //   fields: [
    //     {
    //       name: 'customize',
    //       title: 'Customize Form Text?',
    //       type: 'boolean',
    //       initialValue: false,
    //     },
    //     {
    //       name: 'formtitle',
    //       title: 'Form Title',
    //       type: 'text',
    //       rows: 1,
    //       hidden: ({parent}) => !parent?.customize,
    //     },
    //     {
    //       name: 'formsubtext',
    //       title: 'Form Sub Text',
    //       type: 'text',
    //       rows: 3,
    //       hidden: ({parent}) => !parent?.customize,
    //     },
    //   ],
    // }),

    // defineField({
    //   name: 'flip',
    //   title: 'Flip header layout?',
    //   type: 'boolean',
    //   initialValue: false,
    // }),

    // seo,
    pageBuilder
  ],
  preview: {
    select: {
      title: "name",
      subheader: "snippet",
      image: "headerImage",
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

// const textEditor = {
//   type: 'block',
//   // Only allow these block styles
//   styles: [
//     {title: 'Normal', value: 'normal'},
//   ],
//   // Only allow numbered lists
//   lists: [
//     {title: 'Bullet', value: 'bullet'}
//   ],
//   marks: {
//     // Only allow these decorators
//     decorators: [
//       // {title: 'Strong', value: 'strong'},
//       // {title: 'Emphasis', value: 'em', icon: myIcon}
//     ],
//     // Support annotating text with a reference to an author
//     annotations: [
//       // {name: 'author', title: 'Author', type: 'reference', to: {type: 'author'}}
//     ]
//   }
// }
