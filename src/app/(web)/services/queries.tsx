import { pageMeta, pageBuilder } from "@/lib/sanity.queries";
import { q, TypeFromSelection } from "groqd";
import { QueryParams } from "sanity";
import z from "zod";

const serviceContent = {
  name: q.string(),
};

export const { query: ServicePageQuery, schema: ServicePageSchema } = q("*")
  .filter(
    "_type == 'service' && slug.current == $slug && !(_id in path('drafts.**'))"
  )
  .grab({
    ...pageMeta,
    ...serviceContent,
    ...pageBuilder,
  });

export type serviceContent = TypeFromSelection<typeof serviceContent>;



export const { query: ServicesQuery, schema: ServicesSchema } = q("*")
  .filter("_type == 'service'")
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




