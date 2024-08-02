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

        {
            type:'array',
            name:'intro',
            of:[{
                type:'block'
            }]
        },
        {
            type:'array',
            name:'content',
            title: 'Article',
            of:[{
                type:'object',
                name:'sections',
                title:'Sections',
                fields:[
                    {
                        type:'string',
                        name:'header',
                        title:'Header'
                    },
                    {
                        type:'array',
                        name:'content',
                        of:[{
                            type:'block'
                        }]
                    }
            ]
            }]
        },
        {
            type:"image",
            name:"cover",
            title:'Cover'

        }

    ]
}