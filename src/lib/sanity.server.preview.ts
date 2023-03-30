import { previewData } from 'next/headers'

export function getPreviewToken(): string | undefined {
  //@ts-expect-error
  return (previewData() as { token?: string | null })?.token
}

export const sanityBranch = process.env.SANITY_BRANCH === 'dev'