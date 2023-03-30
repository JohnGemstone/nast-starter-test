export function resolveHref(
  documentType?: string,
  slug?: string | { current: string }
): string | undefined {
  switch (documentType) {
    case "product":
      return slug ? `/products/${slug}` : undefined;
    case "post":
      return slug ? `/blog/posts/${slug}` : undefined;
    default:
      console.warn("Invalid document type:", documentType);
      return undefined;
  }
}
