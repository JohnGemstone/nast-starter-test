import { fetchFromClient } from "@/lib/sanity.client";
import { pageMeta } from "@/lib/sanity.queries";
import { QueryParams } from "sanity";
import { servicePageQuery,servicePageSchema,servicesQuery,servicesSchema } from "./queries";

export async function getServiceBySlug({
  token,
  slug,
}: {
  token?: string;
  slug: string;
}) {

  const params: QueryParams = { slug: slug };
  return servicePageSchema.parse(await fetchFromClient({ token,  query: servicePageQuery, params }));
}


export async function getServices({ token }: { token?: string }) {
  return servicesSchema.parse(
    await fetchFromClient({ token, query: servicesQuery })
  );
}

