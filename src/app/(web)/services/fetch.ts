import { fetchFromClient } from "@/lib/sanity.client";
import { pageMeta } from "@/lib/sanity.queries";
import { QueryParams } from "sanity";
import { ServicePageQuery,ServicePageSchema,ServicesQuery,ServicesSchema } from "./queries";

export async function getServiceBySlug({
  token,
  slug,
}: {
  token?: string;
  slug: string;
}) {

  const params: QueryParams = { slug: slug };
  return ServicePageSchema.parse(await fetchFromClient({ token,  query: ServicePageQuery, params }));
}


export async function getServices({ token }: { token?: string }) {
  return ServicesSchema.parse(
    await fetchFromClient({ token, query: ServicesQuery })
  );
}

