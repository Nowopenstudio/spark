

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
      <div className="navTitle">
        <div className="titleHolder">
          <h1 className='mb-[10px] uppercase'>{data.title}</h1>
          <div className='mb-[20px]'><PortableText value={data.intro}/></div>
          <div className="info">
            <p className="uppercase">{`${data.author.firstName} ${data.author.lastName?data.author.lastName:""}`} </p>
            <p className="uppercase">{`${data.date}`} </p>
          </div>
        </div>
      </div>
      
    </>
  );
})