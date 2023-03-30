import { HiHome } from "react-icons/hi";
import { defineField, defineType } from "@sanity/types";
import * as pageBuilder from '@/sanity/schemas/pageBuilder'

const pageBuilderTypes = Object.values(pageBuilder).map((type) => {return {type: type.name}});

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HiHome,
  groups: [
    {
      name: "seo",
      title: "SEO",
    }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Used the <meta> title tag for SEO.",
      group: "seo",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      description: "Used the <meta> description tag for SEO.",
      group: "seo",
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      of: [...pageBuilderTypes]
    }),
  ],
  preview: {
    prepare() {
      return {
        subtitle: "Home",
        title: "Home Page Settings",
      };
    },
  },
});



