"use client"


import React, { useEffect, useRef, useState } from 'react';

import { PortableText } from 'next-sanity';
import { useScroll, useTransform,motion } from 'motion/react';
import useResize from '../../components/util/useResize';
import Image from 'next/image';


export default function Gallery({data}:any){
    const ref = useRef(null)
    const {winY} = useResize()
    const {scrollYProgress} = useScroll(
        {target:ref}
        
    );



    const x = useTransform(scrollYProgress, [0, 1],['0%',`-${data.length*75-100}%`])
  

    return(
        <div  ref={ref} className={`w-[100vw] h-full`}>
            <motion.div  className="flex  sticky top-[--lrg]" style={{x}} >
                
                     {data.map((image:any,m:number)=>{
                              return( <div key={`gallery-${m}`} className="w-3/4  mb-[--sm] p-[--sm] relative gridBox flex-shrink-0">
                              <div className="w-full h-auto">{image.image?( <Image alt="image" height={0}  width={0} sizes="100vw"  src={image.image}  className="w-full h-auto"/>):''}</div>
                            </div>

                              )
                            })}
               
            </motion.div>
        </div>
      
        
    
    );
}