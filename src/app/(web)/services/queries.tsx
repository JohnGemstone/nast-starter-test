import { pageMeta } from "@/lib/sanity.queries";
import { q, TypeFromSelection } from "groqd";
import { QueryParams } from "sanity";
import z from "zod";
import { pageBuilder } from "@/components/pageBuilder/Serializers";

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
  });




