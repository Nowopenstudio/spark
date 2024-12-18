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
            name:'slug',
            title:'Category Slug',
            options:{
                source:'title'
            }

        },
        {
            type:'string',
            name:'color',
            title:'color'
        }
    ]
}