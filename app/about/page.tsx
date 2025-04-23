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
