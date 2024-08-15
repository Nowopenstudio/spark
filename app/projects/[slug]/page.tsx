import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from 'next/image';




export default async function Home({params}:{params:{slug:string}}) {
    const { data } = await getData(`*[_type=='projects' && slug.current == '${params.slug}']{title,'imageUrl': cover.asset->url}`)
    console.log(data)
  return (
    <main className="w-full">
                   <div className="w-full"> <Image alt="image" src={data[0].imageUrl} width={1920} height={1920} className="object-cover"/></div>
     
    </main>
  );
}
