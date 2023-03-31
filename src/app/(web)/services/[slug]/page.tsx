import type { Metadata } from "next";
import { getServiceBySlug, getServices } from "../fetch";
import { getPreviewToken, sanityBranch } from "@/lib/sanity.server.preview";
import { PreviewSuspense } from "next-sanity/preview";
import { PreviewWrapper } from "@/components/preview/PreviewWrapper";
import ServicePage from "./ServicePage";
import { ServicePagePreview } from "./ServicePagePreview";
import { notFound } from "next/navigation";
import { previewData } from "next/headers";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const token = getPreviewToken();
  const data = await getServiceBySlug({ slug: params.slug });
  const page = data[0];
  // console.log("page:", page);

  if (!data && !token) {
    notFound();
  }

  // Sanity preview
  //
  if (token) {
    return (
      <PreviewSuspense
        fallback={
          <PreviewWrapper>
            <ServicePage page={page} />
          </PreviewWrapper>
        }
      >
        {token ? (
          <ServicePagePreview token={token} slug={params.slug} />
        ) : (
          <ServicePage page={page} />
        )}
      </PreviewSuspense>
    );
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
