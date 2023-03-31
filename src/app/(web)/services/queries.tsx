import { pageMeta, pageBuilder } from "@/lib/sanity.queries";
import { q, TypeFromSelection } from "groqd";
import { QueryParams } from "sanity";
import z from "zod";

const caseStudyContent = {
  logo: q.sanityImage("logo", {
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
  headerImage: q.sanityImage("headerImage", {
    withHotspot: true,
    additionalFields: { alt: q.string().nullable() },
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
  sectorTag: q.string().optional().nullable(),
  productTags: q("productTags")
    .filter()
    .deref()
    .grab({
      slug: q.slug("slug"),
      name: q.string(),
    })
    .nullable(),
  images: q
    .sanityImage("images", {
      withHotspot: true,
      isList: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    })
    .nullable(),
  body_thechallenge: q.contentBlocks().nullable(),
  body_oursolution: q.contentBlocks().nullable(),
  body_theoutcome: q.contentBlocks().nullable(),
  testimonial: q("testimonial").grab({
    enabled: q.boolean().nullable(),
    testimonialText: q.string().nullable(),
    testimonialAuthor: q.string().nullable(),
  }),
};

export const { query: CaseStudyPageQuery, schema: CaseStudyPageSchema } = q("*")
  .filter(
    "_type == 'casestudy' && slug.current == $slug && !(_id in path('drafts.**'))"
  )
  .grab({
    ...pageMeta,
    ...caseStudyContent,
    ...pageBuilder,
  });

export type CaseStudyContent = TypeFromSelection<typeof caseStudyContent>;



export const { query: CaseStudiesQuery, schema: CaseStudiesSchema } = q("*")
  .filter("_type == 'casestudy'")
  .grab({
    slug: q.slug("slug"),
    name: q.string(),
    snippet: q.string(),
    sectorTag: q.string().optional().nullable(),
    producttags: q("producttags")
      .filter()
      .grab({
        _key: q.string(),
        label: q.string(),
        value: q.string(),
      })
      .nullable(),
    logo: q.sanityImage("logo", {
      withHotspot: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    }),
    headerImage: q.sanityImage("headerImage", {
      withHotspot: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    }),
  });


export type CaseStudyThumbnails = z.infer<typeof CaseStudiesSchema>;



