'use client'

import { usePreview } from '@/lib/sanity.preview'
import { ServicePageQuery, ServicePageSchema } from '../queries'
import ServicePage from "./ServicePage";
import z from "zod"

type ServicePageSchema = z.infer<typeof ServicePageSchema>

export function ServicePagePreview({
  token,
  slug,
}: {
  token: null | string
  slug: string
}) {
  const page: ServicePageSchema = usePreview(token, ServicePageQuery, {slug: slug})
  console.log('page:', page)

  if (!page || "length" in page && page.length === 0 ) {
    return (
      <div className="text-center">
        Empty
      </div>
    )
  }

  return <ServicePage page={page[0]} />
}
