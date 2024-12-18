import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import {getData} from "./lib/utils-sanity";
import { Test } from "./components/threeScene";



export const metadata: Metadata = {
  title: "Spark",
  description: "2nd Run",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const query = await getData(`{
    'categories':*[_type=='categories']|order(name){title,"slug":slug, color, "articles": *[ _type == "articles" && references(^._id)]{title,"slug":slug.current, intro, content, "cover":cover.asset->url,"author":author->{firstName,lastName}}}
 }`)
 const {categories} = query.data

  return (
    <html lang="en">
      <body className="bg-[--dark]">
      <Test/>
      <Navbar categories={categories}/>
     {children}
        </body>
    </html>
  );
}
