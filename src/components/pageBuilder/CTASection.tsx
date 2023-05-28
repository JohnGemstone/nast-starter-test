import { q } from "groqd";
import type { TypeFromSelection } from "groqd";
import { Button } from "../ui/Button";
import { Link, linkGroqd } from "../Link";

// Free Tailwind CSS CTA Section Component
// https://tailwindui.com/components/marketing/sections/cta-sections

export default function CtaSection({
  heading,
  description,
  image,
  primaryLink,
  secondaryLink,
}: ctaSection) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {heading}
            </h2>
            {description && (
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {description}
              </p>
            )}
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              {primaryLink.enable && primaryLink.link && primaryLink.label && (
                <Button asChild>
                  <Link href={primaryLink.link}>{primaryLink.label}</Link>
                </Button>
              )}
              {secondaryLink.enable && secondaryLink.link && secondaryLink.label && (
                <Button asChild>
                  <Link href={secondaryLink.link}>{secondaryLink.label}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src={image.asset.url}
              alt={image.alt || "CTA Section Image"}
              width={image.asset.metadata.dimensions?.width}
              height={image.asset.metadata.dimensions?.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export const ctaSectionGroqd = {
  "_type == 'ctaSection'": {
    _type: q.literal("ctaSection"),
    heading: q.string(),
    description: q.string().nullable(),
    primaryLink: q("primaryLink").grab({
      ...linkGroqd
    }),
    secondaryLink: q("secondaryLink").grab({
      ...linkGroqd
    }),
    image: q.sanityImage("image", {
      withHotspot: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    }),
  },
};

export type ctaSection = TypeFromSelection<
  (typeof ctaSectionGroqd)["_type == 'ctaSection'"]
>;


