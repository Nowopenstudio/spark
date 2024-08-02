export default {
    name:"authors",
    type:"document",
    title:'Authors',
    fields:[
        {
            type:'string',
            name:'firstName',
            title:'First Name'
        },
        {
            type:'string',
            name:'lastName',
            title:'Last Name'
        },
        {
            type:'string',
            name:'email',
            title:'Email'
        },
        {
            name:'link',
            type:'array',
            title:'Link',
            of:[{type:'object', name:'singleLink',title:'singleLink',fields:[
                {
                    name:'title',
                    type:'string',
                    title:'Link Title'
                },
                {
                    name:'url',
                    type:'url',
                    title:"Link URL"
                }
            ]}]
        }
    ]
}