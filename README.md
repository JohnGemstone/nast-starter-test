# NAST: typesafe starter using Next Appdir, Sanity (+groqd) and Tailwind
Bootstrapped using create-next-app

## Getting Started
Create

## Things to update
src/data/globals.ts
favicon

## Running Dev Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```




### GROQD 

groqd playground page builder query:

```js
import { runQuery } from "playground";
import { q } from "groqd";

const pricingSectionGroqd = {
  "_type == 'pricingSection'": {
    _type: q.literal("pricingSection"),
    heading: q.string(),
    description: q.string().nullable(),
    priceCards: q("priceCards")
    .filter()
    .grab$({
      name: q.string(),
      description: q.string(),
      features: q.array(q.string()).nullable(),
      priceFrequency: q.string(),
      price: q.string(),
      cta: q("cta").grab({
        label: q.string(),
        url: q.string(),
      }),
    terms: q.string(),
    }),

  },
};

const pageBuilder = {
  pageBuilder: q("coalesce(pageBuilder, [])")
    .filter()
    .grab(
      {
        _key: q.string(),
      },
      {
        ...pricingSectionGroqd,
      }
    ),
};

runQuery(
  q("*")
    .filter("_type == 'service'")
    .slice(0, 10)
    .grab$({
      _id: q.string(),
      ...pageBuilder
    }),
	// params (optional)
  {}
);
```