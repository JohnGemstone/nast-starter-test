import { q } from "groqd";
import type { TypeFromSelection } from "groqd";
// import type { SectionBuilder, PageBuilder } from "@/lib/sanity.queries";

import CtaSection, { ctaSectionGroqd } from "./CtaSection";
import HeaderSection, { headerSectionGroqd } from "./HeaderSection";
// import HeroSection from "./HeroSection";
import PricingSection, { pricingSectionGroqd } from "./PricingSection";
import TestimonialSection, { testimonialSectionGroqd} from "./TestimonialSection";



type UnionFromUnionArray<T> = T extends (infer U)[] ? U : never;
type PageBuilderComponent = UnionFromUnionArray<PageBuilder>;

export const PageBuilderSerializer = ({
  component,
}: {
  component: PageBuilderComponent;
}) => {
  if ("_type" in component) {
    if (component._type === "ctaSection") {
      return (
        <CtaSection
          {...component}
        />
      );
    }
    if (component._type === "headerSection") {
      return (
        <HeaderSection
          {...component}
        />
      );
    }
    if (component._type === "pricingSection") {
      return (
        <PricingSection
          {...component}
        />
      );
    }
    if (component._type === "testimonialSection") {
      return (
        <TestimonialSection
          {...component}
        />
      );
    }
  }
  return null;
};


export const pageBuilder = {
  pageBuilder: q("coalesce(pageBuilder, [])")
    .filter()
    .grab$(
      {
        _key: q.string(),
      },
      {
        ...ctaSectionGroqd,
        ...headerSectionGroqd,
        ...pricingSectionGroqd,
        ...testimonialSectionGroqd
      }
    ),
};

export type PageBuilder = TypeFromSelection<typeof pageBuilder>["pageBuilder"];

