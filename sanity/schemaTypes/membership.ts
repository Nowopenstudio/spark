export default {
    name:"membership",
    type:"document",
    title:'Membership',
    fields:[
        {
            type:"object",
            name:"cover",
            title:'Cover',
            fields:[
                
                    {
                        name:"image",
                        type:'image',
                        title:"file"
                    },
                    {
                        name:"video",
                        type:'mux.video',
                        title:"Video"
                    }
                
            ]

        },
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
    
        {   name:'content',
            type:'array',
            title:'Content',
            options:{sortable:true,layout:"list"},
            of:[{
                name:"section",
                type: "object",
                title:'Content',
                fields:[
                    {
                        name:"image",
                        type:'image',
                        title:"file"
                    },
                    {
                        name:"video",
                        type:'mux.video',
                        title:"Video"
                    },
                    {
                        name:"desc",
                        type:'array',
                        title:"Content",
                        of:[{type:"block"}]
                    }
                ]
            }]
    
         }
    ]
}