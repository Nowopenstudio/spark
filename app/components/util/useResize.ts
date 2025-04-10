
import React, { useState, useEffect } from 'react';




export default function useResize() {
    const [winX, setWidth] = useState<any>();
    const [winY,setHeight] = useState<any>();
    const [mobile,setMobile] = useState<any>(null);

    const onResize=()=>{
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
      if(window.innerWidth <= 850){
        setMobile(1)
      }else{
        setMobile(0)
      }
    }

  
    useEffect(() => {
      onResize();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      }
  }, []);
      
    return {winX,winY,mobile}
    

    
  }


