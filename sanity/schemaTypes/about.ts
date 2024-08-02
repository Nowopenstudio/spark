export default {
    name:"about",
    type:"document",
    title:'About',
    fields:[
        {
            type:"string",
            name:'header',
            title:'Header'
        },
        {
            type:'array',
            name:'text',
            title:'Text',
            of:[{type:'block'}]
        }
    ]
}