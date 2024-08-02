import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { myStructure } from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'spark',

  projectId: '98aksmt5',
  dataset: 'production',

  plugins: [structureTool({
    structure: myStructure
  })],

  schema: {
    types: schemaTypes,
  },
})
