'use client'

import MuxPlayer from "@mux/mux-player-react";
export function MuxVideoBG({playbackId, title, ratio}: any) {

  if (!playbackId) return null

  return <MuxPlayer poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=0`} playbackId={playbackId} metadata={title ? {video_title: title} : undefined} muted minResolution="720p" playsInline autoPlay={true} loop={true} style={{ aspectRatio:`${ratio.split(':')[0]}/${ratio.split(':')[1]}`}}/>
}

export function MuxVideo({playbackId, title, poster, ratio}:any) {
  if (!playbackId) return null
  
  return <MuxPlayer poster={poster?poster:`https://image.mux.com/${playbackId}/thumbnail.webp?time=0`} playbackId={playbackId} metadata={title ? {video_title: title} : undefined}  minResolution="720p" style={{ aspectRatio:`${ratio.split(':')[0]}/${ratio.split(':')[1]}`}} />
}
