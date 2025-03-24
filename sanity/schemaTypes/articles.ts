export default {
    name:"articles",
    type:"document",
    title:'Articles',
   groups:[{
        name: 'infoSet',
        title: 'Info',
        options: { columns: 2 },
      }],
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
            type:'string',
            name:'title',
            title:'Title',
        },
        {
            type:'slug',
            name:'slug',
            title:'Slug',
            group:'infoSet',
            options:{
                source:'title'
            }

        },
        {
            type:'reference',
            name:'author',
            title:'Author',
            group:'infoSet',
            to:[{type:'authors'}]
        },
        {
            type:'reference',
            name:'category',
            title:'Category',
            group:'infoSet',
            to:[{type:'categories'}]
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
    
         },
       
    ]
}