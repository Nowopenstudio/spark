import {createClient} from 'next-sanity'
import {apiVersion, dataset, projectId,token} from '../../env'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any){
    return builder.image(source)
}

export const getData = (async (query:any) =>{
   
    const initQuery = query
    
    const data = await client.fetch(initQuery);
    return {data}
 })
