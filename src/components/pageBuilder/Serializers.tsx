import type { SectionBuilder, PageBuilder } from "@/lib/sanity.queries";
import AccordionCenter from "./AccordionCenter";
import AccordionWithImage from "./AccordionWithImage";
import BannerCaseStudy from "./BannerCaseStudy";

import BannerSimple from "./BannerSimple";
import FeatureSection from "./FeatureSection";
import KeyFeaturesCard from "./KeyFeaturesCard";
import LogoCarousel from "./LogoCarousel";
import RelatedSection from "./RelatedSection";
import TwoColumn from "./TwoColumn";

type UnionFromUnionArray<T> = T extends (infer U)[] ? U : never;

type SectionBuilderComponent = UnionFromUnionArray<SectionBuilder>;

export const SectionBuilderSerializer = ({
  component,
}: {
  component: SectionBuilderComponent;
}) => {
  if ("_type" in component) {
    if (component._type === "bannerSimple") {
      return (
        <BannerSimple
          title={component.title}
          content={component.content}
          cta={component.cta}
          image={component.image}
          key={component._key}
        />
      );
    }
  }
  return null;
};

type PageBuilderComponent = UnionFromUnionArray<PageBuilder>;

export const PageBuilderSerializer = ({
  component,
}: {
  component: PageBuilderComponent;
}) => {
  if ("_type" in component) {
    if (component._type === "bannerSimple") {
      return (
        <BannerSimple
          title={component.title}
          content={component.content}
          cta={component.cta}
          image={component.image}
          key={component._key}
        />
      );
    }

    if (component._type === "featureSection") {
      return (
        <FeatureSection
          sectionName={component.sectionName}
          headerContent={component.headerContent}
          imageGallery={component.imageGallery}
          cta={component.cta}
          sectionBuilder={component.sectionBuilder}
          key={component._key}
        />
      );
    }

    if (component._type === "relatedSection") {
      return (
        <RelatedSection
          titleHeader={component.titleHeader}
          items={component.relatedItems}
          cta={component.cta}
          _key={component._key}
          shaded={component.shaded}
          type={component.type}
          linkToPages={component.linkToPages}
        />
      );
    }

    if (component._type === "bannerCaseStudy") {
      return (
        <BannerCaseStudy
          headerImage={component.caseStudy.headerImage}
          name={component.caseStudy.name}
          flavourText={component.caseStudy.snippet}
          slug={component.caseStudy.slug}
          altText={component.altText}
          key={component._key}
        />
      );
    }

    if (component._type === "logoCarousel") {
      return (
        <LogoCarousel
          title={component.header}
          logos={component.logos}
          border={component.border}
          key={component._key}
        />
      );
    }

    if (component._type === "accordionCenter") {
      return (
        <AccordionCenter
          headerContent={component.headerContent}
          list={component.accordionItems}
          key={component._key}
        />
      );
    }

    if (component._type === "accordionWithImage") {
      return (
        <AccordionWithImage
          headerContent={component.headerContent}
          list={component.accordionItems}
          image={component.image}
          altLayout={component.altLayout}
          key={component._key}
        />
      );
    }

    if (component._type === "keyFeaturesCard") {
      return (
        <KeyFeaturesCard
          headerContent={component.headerContent}
          features={component.keyfeatures}
          cta={component.cta}
          image={component.image}
          justfication={component.justification}
          key={component._key}
        />
      );
    }

    if (component._type === "twoColumn") {
      return (
        <TwoColumn
          leftColumn={component.leftColumn}
          rightColumn={component.rightColumn}
          key={component._key}
        />
      );
    }
  }
  return null;
};
