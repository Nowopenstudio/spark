import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import {getData} from "./lib/utils-sanity";
import { Test } from "./components/threeScene";
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
    'categories':*[_type=='categories']|order(name){title,"slug":slug.current, color, "articles": *[ _type == "articles" && references(^._id)]{title, _createdAt,"slug":slug.current, intro, content, "cover":cover.asset->url,"author":author->{firstName,lastName}}},
    'projects': *[_type=='projects']{title,'slug':slug.current},
    'info':[*[_type=='about'][0]{title,'slug':slug.current},*[_type=='roadmap'][0]{title,'slug':slug.current}, *[_type=='membership'][0]{title,'slug':slug.current},*[_type=='contact'][0]{title,'slug':slug.current}]
 }`)
 const {categories,projects,info} = query.data
 console.log(info)

  return (
    <html lang="en">
      <SmoothScrolling>
        <body className="bg-[--dark]">
        <Test/>
        <Navbar categories={categories} projects={projects} info={info}/>
          {children}
          </body>
      </SmoothScrolling>
    </html>
  );
}
