import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import {getData} from "./lib/sanity";
import { Test } from "./components/threeScene";



export const metadata: Metadata = {
  title: "Spark",
  description: "First Pass",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let {data} = await getData(`*[_type=='info']`)
  return (
    <html lang="en">
      <body>
      <Test/>
      <Navbar info={data[0]}/>
       <div className="z-99 relative"> {children}</div>
        </body>
    </html>
  );
}
