import { z } from "zod";
import { q, InferType, nullToUndefined, makeSafeQueryRunner } from "groqd";
import type { TypeFromSelection, Selection } from "groqd";

export const pageMeta = {
  name: q.string(),
  slug: q.slug("slug"),
  title: q.string().nullable(),
  description: q.string().nullable(),
  snippet: q.string().nullable(),
};

//// Images

//@TODO: functionalise this to use custom name
const image = {
  image: q.sanityImage("image", {
    withHotspot: true,
    additionalFields: { alt: q.string().nullable() },
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
};

const headerImage = {
  headerImage: q.sanityImage("headerImage", {
    withHotspot: true,
    additionalFields: { alt: q.string().nullable() },
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
};

// Get image asset schema to use in conditional selector query for content blocks .etc
const imageZ = q.sanityImage("image", {
  withHotspot: true,
  withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
}).schema;


export type ImageProps = Pick<
  TypeFromSelection<typeof image>,
  "image"
>["image"];

export type ImagePropsNoAlt = Omit<ImageProps, "alt">;

//// Content Blocks

const contentBlock = () =>
  z.object({
    _type: z.literal("headerBlockEditor"),
    _key: z.string().optional(),
    children: z.array(
      z.object({
        _key: z.string(),
        _type: z.string(),
        text: z.string(),
        marks: z.array(z.string()),
      })
    ),
    markDefs: z
      .array(
        z
          .object({
            _type: z.string(),
            _key: z.string(),
          })
          .catchall(z.unknown())
      )
      .optional(),
    style: z.string().optional(),
    listItem: z.string().optional(),
    level: z.number().optional(),
  }).nullable();

const contentBlocks = () => z.array(contentBlock());
const contentBlocksSchema = contentBlocks();
export type contentBlocks = z.infer<typeof contentBlocksSchema>;

const blockImage = {
  _type: q.literal("image"),
  alt: q.string().optional().nullable(),
  asset: q("asset")
    .deref()
    .grab$({
      ...imageZ.shape.asset.shape,
    }),
};

const blockContent = {
  _type: z.literal("block"),
  _key: z.string().optional(),
  children: z.array(
    z.object({
      _key: z.string(),
      _type: z.string(),
      text: z.string(),
      marks: z.array(z.string()),
    })
  ),
  markDefs: z
    .array(
      z
        .object({
          _type: z.string(),
          _key: z.string(),
        })
        .catchall(z.unknown())
    )
    .optional(),
  style: z.string().optional(),
  listItem: z.string().optional(),
  level: z.number().optional(),
};

export const headerContent = {
  headerContent: q("headerContent").grab({
    headerText: contentBlocks(),
    CTA: q.string().nullable(),
    ...headerImage,
  }),
};

export type HeaderContent = TypeFromSelection<
  typeof headerContent
>["headerContent"];

export const headerContentwFeatures = {
  headerContent: q("headerContent").grab({
    headerText: contentBlocks(),
    CTA: q.string().nullable(),
    ...headerImage,
    showFeatures: q.boolean().optional().nullable(),
    features: q("coalesce(features, [])")
      .filter()
      .grab$({
        _type: q.literal("feature"),
        name: q.string(),
        description: q.string(),
        icon: q("icon")
          .grab({
            _type: q.literal("iconPicker"),
            name: q.string(),
            provider: q.string(),
          })
          .nullable(),
      })
      .nullable(),
  }),
};

export type headerContentwFeatures = TypeFromSelection<
  typeof headerContentwFeatures
>["headerContent"];

const testimonial = {
  "_type == 'testimonial'": {
    _type: q.literal("testimonial"),
    testimonialText: q.string(),
    testimonialAuthor: q.string(),
    testimonialCompany: q.string(),
    justification: q.string(),
    ...image,
    caseStudy: q("caseStudy").grab({
      enable: q.boolean(),
      text: q.string(),
    }),
  },
};

export type Testimonial = TypeFromSelection<
  typeof testimonial["_type == 'testimonial'"]
>;

const simpleBanner = {
  "_type == 'bannerSimple'": {
    _type: q.literal("bannerSimple"),
    title: q.string(),
    content: q.string(),
    cta: q.string(),
    ...image,
  },
};

export type BannerSimple = TypeFromSelection<
  typeof simpleBanner["_type == 'bannerSimple'"]
>;

const feature = {
  "_type == 'feature'": {
    _type: q.literal("feature"),
    name: q.string(),
    description: q.string(),
    icon: q("icon").grab({
      name: q.string(),
      provider: q.string(),
    }),
    // @ TODO: Add image support
    // image: q.sanityImage("image")
  },
};

const threeFeatures = {
  "_type == 'threeFeatures'": {
    _type: q.literal("threeFeatures"),
    useImages: q.boolean(),
    keyfeatures: q("coalesce(keyfeatures, [])")
      .filter()
      .grab$(
        {
          _key: q.string(),
        },
        {
          ...feature,
        }
      ),
  },
};

export type ThreeFeatures = TypeFromSelection<
  typeof threeFeatures["_type == 'threeFeatures'"]
>;

const keyFeaturesCard = {
  "_type == 'keyFeaturesCard'": {
    _type: q.literal("keyFeaturesCard"),
    headerContent: q.contentBlocks(),
    cta: q("cta").grab({
      text: q.string(),
      enable: q.boolean(),
    }),
    justification: q.string(),
    ...image,
    keyfeatures: q("coalesce(keyfeatures, [])")
      .filter()
      .grab$(
        {
          _key: q.string(),
        },
        {
          ...feature,
        }
      ),
  },
};

export type KeyFeaturesCard = TypeFromSelection<
  typeof keyFeaturesCard["_type == 'keyFeaturesCard'"]
>;

const twoColumn = {
  "_type == 'twoColumn'": {
    _type: q.literal("twoColumn"),
    leftColumn: q("coalesce(leftColumn, [])")
    .filter()
    .grab$(
      {
        _type: q.string(),
        _key: q.string(),
      },
      {
        "_type == 'block'": {
          ...blockContent,
          // @ TODO change back when groqd updates
        },
        "_type == 'image'": {
          ...blockImage,
        },
      }
    ),
    rightColumn: q("coalesce(rightColumn, [])")
    .filter()
    .grab$(
      {
        _type: q.string(),
        _key: q.string(),
      },
      {
        "_type == 'block'": {
          ...blockContent,
          // @ TODO change back when groqd updates
        },
        "_type == 'image'": {
          ...blockImage,
        },
      }
    ),
  }
}



export type TwoColumn = TypeFromSelection<typeof twoColumn["_type == 'twoColumn'"]>;

const bookDemo = {
  "_type == 'bookDemo'": {
    _type: q.literal("bookDemo"),
    altText: q.string().optional().nullable(),
    useDefaultImage: q.boolean().optional().nullable(),
  },
};

export type BookDemo = TypeFromSelection<
  typeof bookDemo["_type == 'bookDemo'"]
>;

const bannerCaseStudy = {
  "_type == 'bannerCaseStudy'": {
    _type: q.literal("bannerCaseStudy"),
    altText: q.string().optional(),
    caseStudy: q("caseStudy")
      .deref()
      .grab({
        name: q.string(),
        snippet: q.string(),
        slug: q.slug("slug"),
        headerImage: q.sanityImage("headerImage", {
          withHotspot: true,
          additionalFields: { alt: q.string().nullable() },
          withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
        }),
      }),
  },
};

export type BannerCaseStudy = TypeFromSelection<
  typeof bannerCaseStudy["_type == 'bannerCaseStudy'"]
>;

const accordionCenter = {
  "_type == 'accordionCenter'": {
    _type: q.literal("accordionCenter"),
    headerContent: q.contentBlocks(),
    accordionItems: q("coalesce(accordionItems, [])")
      .filter()
      .grab$({
        _key: q.string(),
        _type: q.literal("accordionItem"),
        title: q.string(),
        description: q.string(),
      }),
  },
};

export type AccordionCenter = TypeFromSelection<
  typeof accordionCenter["_type == 'accordionCenter'"]
>;

const accordionWithImage = {
  "_type == 'accordionWithImage'": {
    _type: q.literal("accordionWithImage"),
    headerContent: q.contentBlocks(),
    accordionItems: q("coalesce(accordionItems, [])")
      .filter()
      .grab$({
        _key: q.string(),
        _type: q.literal("accordionItem"),
        title: q.string(),
        description: q.string(),
      }),
    ...image,
    altLayout: q.boolean().optional().nullable(),
    shaded: q.boolean().optional().nullable(),
  },
};

export type AccordionWithImage = TypeFromSelection<
  typeof accordionWithImage["_type == 'accordionWithImage'"]
>;

const logoCarousel = {
  "_type == 'logoCarousel'": {
    _type: q.literal("logoCarousel"),
    header: q.string(),
    border: q.boolean().nullable(),
    logos: q.sanityImage("logos", {
      isList: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    }),
  },
};

export type LogoCarousel = TypeFromSelection<
  typeof logoCarousel["_type == 'logoCarousel'"]
>;

const relatedSection = {
  "_type == 'relatedSection'": {
    _key: q.string(),
    _type: q.literal("relatedSection"),
    titleHeader: q.string(),
    type: q.string(),
    cta: q("cta").grab({
      text: q.string(),
      enable: q.boolean(),
    }),
    linkToPages: q.boolean(),
    shaded: q.boolean(),
    relatedItems: q("coalesce(relatedItems, [])")
      .filter()
      .deref()
      .grab$({
        _type: q.string(),
        name: q.string(),
        snippet: q.string().nullable().optional(),
        slug: q.slug("slug"),
        headerContent: q("headerContent").grab({
          headerImage: q.sanityImage("headerImage", {
            withHotspot: true,
            additionalFields: { alt: q.string().nullable() },
            withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
          }),
        }),
      }),
  },
};

export type RelatedSection = TypeFromSelection<
  typeof relatedSection["_type == 'relatedSection'"]
>;

const featureSection = {
  "_type == 'featureSection'": {
    _type: q.literal("featureSection"),
    sectionName: q.string(),
    ribbon: q.boolean().nullable(),
    imageGallery: q("coalesce(imageGallery, [])")
      .filter()
      .grab$({
        ...imageZ.shape,
        alt: q.string().optional().nullable(),
        asset: q("asset")
          .deref()
          .grab$({
            ...imageZ.shape.asset.shape,
          }),
      }),
    headerContent: q("coalesce(headerContent, [])")
      .filter()
      .grab$(
        {
          _type: q.string(),
          _key: q.string(),
        },
        {
          "_type == 'block'": {
            ...blockContent,
            // @ TODO change back when groqd updates
            // ...q.contentBlock().shape
          },
          "_type == 'image'": {
            ...blockImage,
          },
        }
      ),
    cta: q("cta").grab({
      text: q.string(),
      enable: q.boolean(),
    }),
    sectionBuilder: q("coalesce(sectionBuilder, [])")
      .filter()
      .grab(
        {
          _key: q.string(),
        },
        {
          ...bookDemo,
          ...threeFeatures,
          ...testimonial,
          ...simpleBanner,
          ...bannerCaseStudy,
        }
      ),
  },
};

export type BlockImageProps = TypeFromSelection<typeof blockImage>;

export type FeatureSection = TypeFromSelection<
  typeof featureSection["_type == 'featureSection'"]
>;

export const pageBuilder = {
  pageBuilder: q("coalesce(pageBuilder, [])")
    .filter()
    .grab$(
      {
        _key: q.string(),
      },
      {
        ...keyFeaturesCard,
        ...accordionWithImage,
        ...accordionCenter,
        ...featureSection,
        ...simpleBanner,
        ...testimonial,
        ...relatedSection,
        ...threeFeatures,
        ...bookDemo,
        ...bannerCaseStudy,
        ...logoCarousel,
        ...twoColumn,
      }
    ),
};

export type PageBuilder = TypeFromSelection<typeof pageBuilder>["pageBuilder"];



const caseStudyContent = {
  logo: q.sanityImage("logo", {
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
  headerImage: q.sanityImage("headerImage", {
    withHotspot: true,
    additionalFields: { alt: q.string().nullable() },
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
  sectorTag: q.string().optional().nullable(),
  productTags: q("productTags")
    .filter()
    .deref()
    .grab({
      slug: q.slug("slug"),
      name: q.string(),
    })
    .nullable(),
  images: q
    .sanityImage("images", {
      withHotspot: true,
      isList: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    })
    .nullable(),
  body_thechallenge: q.contentBlocks().nullable(),
  body_oursolution: q.contentBlocks().nullable(),
  body_theoutcome: q.contentBlocks().nullable(),
  testimonial: q("testimonial").grab({
    enabled: q.boolean().nullable(),
    testimonialText: q.string().nullable(),
    testimonialAuthor: q.string().nullable(),
  }),
};

export type CaseStudyContent = TypeFromSelection<typeof caseStudyContent>;

const CaseStudies = q("*")
  .filter("_type == 'casestudy'")
  .grab({
    slug: q.slug("slug"),
    name: q.string(),
    snippet: q.string(),
    sectorTag: q.string().optional().nullable(),
    producttags: q("producttags")
      .filter()
      .grab({
        _key: q.string(),
        label: q.string(),
        value: q.string(),
      })
      .nullable(),
    logo: q.sanityImage("logo", {
      withHotspot: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    }),
    headerImage: q.sanityImage("headerImage", {
      withHotspot: true,
      additionalFields: { alt: q.string().nullable() },
      withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
    }),
  });


const BlogPosts = q("*")
.filter("_type == 'post'")
.order("publishedAt asc")
.grab({
  slug: q.slug("slug"),
  title: q.string(),
  description: q.string(),
  publishedAt: q.string(),
  tags: q("tags")
    .filter()
    .grab({
      _key: q.string(),
      label: q.string(),
      value: q.string(),
    }),
  headerImage: q.sanityImage("headerImage", {
    withHotspot: true,
    additionalFields: { alt: q.string().nullable() },
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }).nullable(),
});

export type BlogPostThumbnails = z.infer<typeof BlogPosts.schema>;



export type SectionBuilder = TypeFromSelection<
  typeof featureSection["_type == 'featureSection'"]
>["sectionBuilder"];




const navigation = q("*")
  .filter("_type == 'navigation' && !(_id in path('drafts.**'))")
  .grab({
    environments: q("environments")
      .filter()
      .deref()
      .grab({
        name: q.string(),
        slug: q.slug("slug"),
      }),
    environmentsTile: q("environmentTile")
      .grab(
        {
          title: q.string(),
          link: q.string(),
          image: q.sanityImage("image", {
            withHotspot: true,
            additionalFields: { alt: q.string().nullable() },
            withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
          }).nullable(),
        }
      ),
    solutions: q("solutions")
      .filter()
      .deref()
      .grab({
        name: q.string(),
        slug: q.slug("slug"),
      }),
      solutionsTile: q("solutionsTile")
      .grab(
        {
          title: q.string(),
          link: q.string(),
          image: q.sanityImage("image", {
            withHotspot: true,
            additionalFields: { alt: q.string().nullable() },
            withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
          }).nullable(),
        }
      ),
    products: q("products")
      .filter()
      .deref()
      .grab({
        name: q.string(),
        slug: q.slug("slug"),
        snippet: q.string(),
      }),
  });

export type Navigation = z.infer<typeof navigation.schema>;

// export async function getNavigation({ token }: { token?: string }) {
//   const { query, schema } = navigation;
//   return schema.parse(await fetchFromClient({ token, query }));
// }


// export async function getHomePage({ token }: { token?: string }) {
//   const { query, schema } = q("*")
//   .filter("_type == 'homePage' && !(_id in path('drafts.**'))")
//   .grab(
//     {
//       title: q.string(),
//       description: q.string(),
//       _id: q.string(),
//     }
//   );
//   return schema.parse(await fetchFromClient({ token, query }));
// }