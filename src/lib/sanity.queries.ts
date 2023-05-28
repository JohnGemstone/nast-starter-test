import { z } from "zod";
import { q } from "groqd";
import type { TypeFromSelection } from "groqd";

const image = {
  image: q.sanityImage("image", {
    withHotspot: true,
    additionalFields: { alt: q.string().nullable() },
    withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
  }),
};

export const pageMeta = {
  name: q.string(),
  slug: q.slug("slug"),
  title: q.string().nullable(),
  description: q.string().nullable(),
  snippet: q.string().nullable(),
};



// const navigation = q("*")
//   .filter("_type == 'navigation' && !(_id in path('drafts.**'))")
//   .grab({
//     environments: q("environments")
//       .filter()
//       .deref()
//       .grab({
//         name: q.string(),
//         slug: q.slug("slug"),
//       }),
//     environmentsTile: q("environmentTile")
//       .grab(
//         {
//           title: q.string(),
//           link: q.string(),
//           image: q.sanityImage("image", {
//             withHotspot: true,
//             additionalFields: { alt: q.string().nullable() },
//             withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
//           }).nullable(),
//         }
//       ),
//     solutions: q("solutions")
//       .filter()
//       .deref()
//       .grab({
//         name: q.string(),
//         slug: q.slug("slug"),
//       }),
//       solutionsTile: q("solutionsTile")
//       .grab(
//         {
//           title: q.string(),
//           link: q.string(),
//           image: q.sanityImage("image", {
//             withHotspot: true,
//             additionalFields: { alt: q.string().nullable() },
//             withAsset: ["base", "dimensions", "lqip", "hasAlpha", "isOpaque"],
//           }).nullable(),
//         }
//       ),
//     products: q("products")
//       .filter()
//       .deref()
//       .grab({
//         name: q.string(),
//         slug: q.slug("slug"),
//         snippet: q.string(),
//       }),
//   });

// export type Navigation = z.infer<typeof navigation.schema>;
