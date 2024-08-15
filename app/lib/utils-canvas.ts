import { Vector2, Vector3, ImageLoader, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";


export const sampleImage = (imageData, uv) => {
    const point =
      4 * Math.floor(uv.x * imageData.width) +
      Math.floor(uv.y * imageData.height) * (4 * imageData.width);
    
    return imageData.data.slice(point, point + 4);
    
  };


  export const spherePointToUV = (dotCenter, sphereCenter) => {
    // Create a new vector and give it a direction from the center of the sphere
    // to the center of the dot.
    const newVector = new Vector3();
    newVector.subVectors(sphereCenter, dotCenter).normalize();
  
    // Calculate the  UV coordinates of the dot and return them as a vector.
    const uvX = 1 - (0.5 + Math.atan2(newVector.z, newVector.x) / (2 * Math.PI));
    const uvY = 0.5 + Math.asin(newVector.y) / Math.PI;
    return new Vector2(uvX, uvY);
  };

  export const initImage = (source) =>{
    let imageData:object;
    console.log('sup')



    const wMap = useLoader(TextureLoader, source)
    
    const tempCanvas = document.createElement("canvas");
    
    tempCanvas.width = wMap.image.width;
    tempCanvas.height = wMap.image.height;
    
    const ctx = tempCanvas.getContext("2d");
    ctx.drawImage(wMap.image, 0, 0);
    imageData = ctx.getImageData(0, 0, wMap.image.width, wMap.image.height);
       
    console.log(imageData)

    return (imageData)

  
    }

