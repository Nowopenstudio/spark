export default {
    name:"donate",
    type:"document",
    title:'Donations',
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
    },
        {
            type:'array',
            name:'donations',
            title:"Donations",
            of:[{type:'object',
                name:'donate',
                title:'Donate',
                fields:[
                    {
                        type:'string',
                        name:'title',
                        title:'Title'
                    },
                    {
                        type:'array',
                        name:'text',
                        title:'copy',
                        of:[{
                            type:'block'
                        }]
                    },
                    {
                        type:'text',
                        title:'Embed',
                        name:'embed'
                    },
                    {
                        type:"image",
                        name:"cover",
                        title:'Cover'
            
                    }
            
                ]

            }]
        }
        
    ]
}