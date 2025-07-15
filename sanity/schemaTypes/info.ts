
export default{
    name: 'info',type: 'document',title:'info',
    fieldsets:[{name:'img',options:{columns:2}}],fields:[
       {
            name:"meta",
            title:'Metadata',
            type:"object",
            fields:[
                {
                  type:'string',
                  title:'Title',
                  name:'title',
                },
                {
                    type:'text',
                    title:'Description',
                    name:'description',
                },
                {
                    type:'string',
                    title:'Keywords',
                    name:'keywords',
                },
                {
                    type:'image',
                    name:'image',
                    title:'image'
    
                }
            ]
          }
    ]
    
         


    
    
       
}