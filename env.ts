export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string
export const token = process.env.NEXT_PUBLIC_SANITY_TOKEN as string
export const open = process.env.NEXT_PUBLIC_OPEN_TOKEN as string

// Values you may additionally want to configure globally
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API || '2024-08-07'