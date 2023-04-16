/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import {media} from 'sanity-plugin-media'

import { previewDocumentNode } from '@/sanity/plugins/previewPane'
import { productionUrl } from '@/sanity/plugins/productionUrl'

import { apiVersion, dataset, previewSecretId, projectId } from '@/lib/sanity.api'
// import { previewDocumentNode } from 'plugins/previewPane'
// import { productionUrl } from 'plugins/productionUrl'
import { singletonPlugin, pageStructure } from '@/sanity/plugins/desktool.settings'
import { defineConfig, isDev } from 'sanity'

import { deskTool } from 'sanity/desk'
import { homePage } from '@/sanity/schemas/singletons/home'
import { navigation } from '@/sanity/schemas/singletons/navigation'
import { service } from '@/sanity/schemas/documents/service'
import { blogPost } from '@/sanity/schemas/documents/blogpost'
import { link } from '@/sanity/schemas/objects/link'

import * as pageBuilder from '@/sanity/schemas/pageBuilder'


const title = 'Sanity Studio'

export const PREVIEWABLE_DOCUMENT_TYPES: string[] = [
  service.name,
  blogPost.name,
]

const devOnlyPlugins = [ visionTool({ defaultApiVersion: apiVersion })]

export default defineConfig({
  basePath: '/studio',
  projectId: projectId,
  dataset: dataset,
  title,
  schema: {
    types: [
      // singletons
      homePage,
      navigation,

      // pages
      service,
      blogPost,

      // objects
      link,

      // page builder
      ...Object.values(pageBuilder),
    ],
  },
  document: {
    // newDocumentOptions: (prev, { creationContext }) => {
    //   if (creationContext.type === 'global') {
    //     console.log('prev', prev)
    //     return prev.filter(
    //       (templateItem) => ![home.name as String].includes(templateItem.templateId)
    //     )
    //   }
    //   return prev
    // },
  },
  plugins: [
    deskTool({
      structure: pageStructure([homePage, navigation]),
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    singletonPlugin([homePage.name, navigation.name]),
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    media(),
    ...devOnlyPlugins
  ],
})