import { getData } from "../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";




export default async function Home() {
    const { data } = await getData(`*[_type=='categories']{title, catSlug}`)
  return (
    <main className="w-full flex justify-center">     
    </main>
  );
}

export async function generateMetadata() {
  const query = await getData(`{
    'data':*[_type=='info'][0]{meta{title,description,keywords,"image":image.asset->url}}
 }`)
 const {data} = query.data  
  return {
    title: `About - ${data.meta.title}`,
    keywords: `${data.meta.keywords}`,
    description:`${data.meta.description}`,
    openGraph: {
      images: data.meta.image
    }
  };
}

