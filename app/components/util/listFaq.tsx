'use client'

import React, { useState } from "react";
import { PortableText } from "next-sanity";
import { ViewActive } from "./viewActive";
import { Reveal } from "./reveal";



export default function ListFaqs({ data,count,ordered }: any) {
  const [active, setActive] = useState(false)



  return (

    
      <Reveal styleSet="faqsItem w-full cursor-pointer" >
        <div onClick={()=>setActive(!active)} className={` w-full p-[--xs]  lg:p-[--sm] gridBox relative ${active?'itemActive':''}`}>
          <div>
            <div className="relative bgBlur flex flex-wrap justify-between items-start p-[--xs] lg:p-[--sm] overflow-hidden" style={{ backgroundColor: `rgba(255, 255, 255, 0.1)` }}>
              <div className={`items-start col-span-full lg:col-span-6 lg:col-start-4 flex-wrap lg:flex-nowrap flex px-0 gap-[--xs]`}>
                <div ><div className="aspect-square w-[50px] rounded-sm flex-shrink-0 relative" style={{ backgroundColor: `#ffffff` }}>
                  {ordered ? (
                    <h1 className="absolute xy-center ol-number text-black">{count + 1}</h1>
                  ) : ('')}
                </div></div>
                <div >
                  <h2 className="mb-[--xs] flex-shrink-0 pt-[--2xs] pr-[70px]">{data.title}</h2>
                </div>
                 <div ><div className="aspect-square w-[50px] rounded-sm flex-shrink-0 faqBut border-white border absolute top-[--xs] right-[--xs] lg:top-[--sm] lg:right-[--sm]" >
                  
                    <h1 className="absolute xy-center ol-number ">{active?`↑`:'↓'}</h1>
           
                </div></div>
              </div>
              <div className={`w-full flex-shrink-0 mono faqQuest `}><PortableText value={data.item} /></div>
            </div>
          </div>

        </div>



      </Reveal>



  );
}



