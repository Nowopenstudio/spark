'use client'

import MuxPlayer from "@mux/mux-player-react";

export function MuxVideoBG({playbackId, title,}: {playbackId?: string; title?: string;}) {

  if (!playbackId) return null

  return <MuxPlayer poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=0`} playbackId={playbackId} metadata={title ? {video_title: title} : undefined} muted playsInline autoPlay={true} loop={true} style={{ aspectRatio: 16/9 }}/>
}

export function MuxVideo({playbackId, title}: {playbackId?: string; title?: string}) {
  if (!playbackId) return null
  
  return <MuxPlayer poster={`https://image.mux.com/${playbackId}/thumbnail.webp?time=0`} playbackId={playbackId} metadata={title ? {video_title: title} : undefined}  autoPlay={"any"} loop={true} style={{ aspectRatio: 16/9 }}/>
}