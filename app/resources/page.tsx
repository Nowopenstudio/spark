import { getData } from "../lib/sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";




export default async function Home() {
    const { data } = await getData(`*[_type=='categories']{title, catSlug}`)
  return (
    <main className="w-full flex justify-center">
        {data.map((item,i)=>{
            return(
                <Link key={`resource-${i}`} href={`/resources/${item.catSlug.current}`} className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto" >{item.title}</Link>
            )
        })}
     
    </main>
  );
}
