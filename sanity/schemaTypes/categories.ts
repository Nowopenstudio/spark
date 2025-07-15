export default {
    name:"categories",
    title:'Categories',
    type:"document",
    groups: [{name: 'meta',title: 'Meta',}],
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
            type:'color',
            name:'color',
            title:'Color',
            options: {
                colorList: [
                  '#CBDFDB',
                  '#C9BEF3',
                  '#9CC0F7',
                  '#FDA490',
                  '#539543',
                  
                ]
              }
        }
    ]
}