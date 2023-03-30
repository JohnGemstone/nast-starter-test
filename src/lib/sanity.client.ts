import "server-only";

import { apiVersion, dataset, projectId, useCdn } from "@/lib/sanity.api";
import { cache } from "react";
import { createClient } from "next-sanity";
import { QueryParams } from "sanity";

export async function fetchFromClient({
  token,
  query,
  params,
}: {
  token?: string;
  query: string;
  params?: QueryParams;
}) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
  });

  const fetch = cache(client.fetch.bind(client));
  const data = await fetch(query, params ?? {});

  // await console.log("data:", data);
  console.log("fetch", query.slice(0, 100), query.length>100?"...":"");

  return data;
}