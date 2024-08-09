import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { myStructure } from './deskStructure'
import { dataset, projectId, token } from '../env.js'

export default defineConfig({
  name: 'default',
  title: 'spark',

  projectId:"98aksmt5",
  dataset:"production",

  plugins: [structureTool({
    structure: myStructure
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
