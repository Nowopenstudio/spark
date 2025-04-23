

import React,{useState, useCallback, memo} from 'react';
import { Handle, Position } from '@xyflow/react';
 
const handleStyle = { left: 10 };
 
export default  memo(({ data, isConnectable }:{data:any, isConnectable:any}) =>  {
  const onChange = useCallback((evt:any) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div>
      {data.label}
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
})