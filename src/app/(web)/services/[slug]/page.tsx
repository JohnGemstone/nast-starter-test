import type { Metadata } from "next";
import { getServiceBySlug, getServices } from "../fetch";
import ServicePage from "./ServicePage";
import { notFound } from "next/navigation";


export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getServiceBySlug({ slug: params.slug });
  const page = data[0];
  console.log("page:", page);

  if (!data) {
    notFound();
  }


  return <ServicePage page={page} />;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getServiceBySlug({ slug: params.slug });
  return {
    title: data[0].title || data[0].name,
    description: data[0].description || data[0].snippet,
  };
}

export async function generateStaticParams() {
  const services = await getServices({});
  if (!services) return [];
  return services.map((service) => {
    return {
      slug: service.slug,
    };
  });
}
