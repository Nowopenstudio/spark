export default {
    name:"membership",
    type:"document",
    title:'Membership',
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