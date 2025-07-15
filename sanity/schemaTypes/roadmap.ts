export default {
    name:"roadmap",
    type:"document",
    title:'Roadmap',
    groups: [{name: 'meta',title: 'Meta',}],
    fields:[
        {
            type:"string",
            name:'title',
            title:'Title'
        },
        {
        type:'slug',
        name:'slug',
        title:'Slug',
        options:{
            source:'title'
        }

    },
        {
            type:'array',
            name:'roadmapItem',
            title:"Item",
            of:[{type:'object',
                name:'milestone',
                title:'Milestone',
                fields:[
                    {
                        type:'string',
                        name:'title',
                        title:'Title'
                    },
                    {
                        type:'boolean',
                        name:'status',
                        title:'Status'
                    },
                    {
                        type:'array',
                        name:'text',
                        of:[{
                            type:'block'
                        }]
                    },
                    {
                        type:"image",
                        name:"cover",
                        title:'Cover'
            
                    }
            
                ]

            }]
        },
         {
            name:"meta",
            title:'Metadata',
            type:"object",
            group:"meta",
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