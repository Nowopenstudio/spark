export default {
    name:"categories",
    title:'Categories',
    type:"document",
    fields:[

        {
            type:'string',
            name:'title',
            title:'Title'
        },
        {
            type:'slug',
            name:'catSlug',
            title:'Category Slug',
            options:{
                source:'title'
            }

        },
        {
            type:'string',
            name:'string',
            title:'color'
        }
    ]
}