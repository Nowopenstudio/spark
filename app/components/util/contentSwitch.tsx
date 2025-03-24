import { MuxVideoBG } from "./muxPlayer";
import Image from "next/image";

export function SwitchContent({work, title}: {work?: any, title?:string;}) {
  if (!work) return null

  
  if (work.vid){
    return <div className="w-full noControl object-fill"> <MuxVideoBG playbackId={work.vid.playbackId} title={title} /></div>
  

    }
   
  if (work.image) return <Image alt="image" height={0}  width={0} sizes="100vw"  src={work.image}  className="w-full object-fill"/>
    
 
}

