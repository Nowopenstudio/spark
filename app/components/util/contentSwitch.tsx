import { MuxVideoBG } from "./muxPlayer";
import Image from "next/image";

export function SwitchContent({work, title,ratio,cover, contain}: any) {
  if (!work) return null

  
  if (work.vid){
    return <div className={`w-full  noControl ${contain?"object-contain h-full":""} ${cover?"object-cover h-full":""}`}> <MuxVideoBG playbackId={work.vid} title={title} ratio={ratio}/></div>
    

    }
   
  if (work.image) return <Image alt="image" height={0}  width={0} sizes="100vw"  src={work.image}  className={`w-full ${contain?"object-contain h-full":""} ${cover?"object-cover h-full":""}`}/>
    
 
}

