

import React,{useState, useCallback, memo} from 'react';
import { Handle, Position } from '@xyflow/react';
import { PortableText } from 'next-sanity';
 
const handleStyle = { left: 10 };
 
export default  memo(({ data, isConnectable }:{data:any, isConnectable:any}) =>  {
  const onChange = useCallback((evt:any) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Right} />
      <div>
      {data.label}
      </div>
      
    </>
  );
})