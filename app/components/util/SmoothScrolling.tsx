"use client";
import { ReactLenis} from "lenis/react";

export default function SmoothScrolling({ children }:any) {

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, orientation:'vertical',gestureOrientation:'both' }}>
      {children}
    </ReactLenis>
  );
}
