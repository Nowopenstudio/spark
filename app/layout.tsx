import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import {getData} from "./lib/utils-sanity";
import { Test } from "./components/three/threeScene";
import SmoothScrolling from "./components/util/SmoothScrolling";



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
    'categories':*[_type=='categories']|order(name){title,"slug":slug.current, 'color':color.hex, "articles": *[ _type == "articles" && references(^._id)]{title, _createdAt,"slug":slug.current, intro, content, "cover":cover.asset->url,"author":author->{firstName,lastName}}},
    'projects': *[_type=='projects']{title,'slug':slug.current},
    'info':[*[_type=='contact'][0]{title,'slug':slug.current},*[_type=='roadmap'][0]{title,'slug':slug.current},*[_type=='membership'][0]{title,'slug':slug.current},*[_type=='about'][0]{title,'slug':slug.current}],
    'donate':*[_type=='donate'][0]{"slug":slug.current,title,color,donations}
 }`)
 const {categories,projects,info,donate} = query.data
 console.log(categories)

  return (
    <html lang="en">
      <SmoothScrolling>
        <body className="bg-[white]">
        <Test/>
        <Navbar categories={categories} projects={projects} info={info} donate={donate}/>
          {children}
          </body>
      </SmoothScrolling>
    </html>
  );
}
