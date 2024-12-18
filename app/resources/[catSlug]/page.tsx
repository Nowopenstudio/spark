import { getData } from "../../lib/utils-sanity";
import { PortableText } from "next-sanity";
import Link from "next/link";




export default async function Home({params}:{params:{catSlug:string}}) {
    const { data } = await getData(`*[_type=='articles' && '${params.catSlug}' == category->catSlug.current]{title,slug,author->{firstName},category->{slug,title}}`)
  return (
    <main className="w-full flex justify-center">
     
    </main>
  );
}
