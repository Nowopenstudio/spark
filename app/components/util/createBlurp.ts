// Server-Side
import { createBlurUp } from '@mux/blurup';


export const blurUp = (async (playbackId:string)=>{
   
    const { blurDataURL} = await createBlurUp(playbackId, { time: 0.5 });
    console.log('blur',blurDataURL)
    return blurDataURL
})
