import { getData } from "../lib/sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";




export default async function Home() {
    const { data } = await getData(`*[_type=='categories']{title, catSlug}`)
  return (
    <main className="w-full flex justify-center">
      
                <Link href={`/information/about`} className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto" >About</Link>
                <Link href={`/information/roadmap`} className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto" >Roadmap</Link>
                <Link href={`/information/membership`} className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto" >Membership</Link>
                <Link href={`/information/contact`} className="px-5 py-2 rounded-full border border-white border-solid m-2 pointer-events-auto" >Contact</Link>
     
     
    </main>
  );
}
