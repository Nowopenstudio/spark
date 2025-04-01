export default {
    name:"contact",
    type:"document",
    title:'Contact',
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
            name:'text',
            title:'Text',
            of:[{type:'block'}]
        },
        {
            type:'array',
            name:'contacts',
            title:'Contact Types',
            of:[{
                type:'object',
                name:'single',
                title:'Contact',
                fields:[{
                    name:"header",
                    type:'string',
                    title:'header'
                },
                {
                    name:'link',
                    type:'array',
                    title:'Link',
                    of:[{
                        name:'title',
                        type:'string',
                        title:'Link Title'
                    },
                    {
                        name:'url',
                        type:'url',
                        title:"Link URL"
                    }]
                }
            ]
            }]
        }
    ]
}