
export default {
    name: 'info', type: 'document', title: 'info',
    fieldsets: [{ name: 'img', options: { columns: 2 } }], fields: [
        {
            name: "meta",
            title: 'Site Meta',
            type: "object",
            fields: [
                {
                    type: 'string',
                    title: 'Title',
                    name: 'title',
                },
                {
                    type: 'text',
                    title: 'Description',
                    name: 'description',
                },
                {
                    type: 'string',
                    title: 'Keywords',
                    name: 'keywords',
                },
                {
                    type: 'image',
                    name: 'image',
                    title: 'image'

                }
            ]
        },
        {
            name: "resources",
            title: 'Resource Metadata',
            type: "object",
              options: {collapsible: true,collapsed: true },
            fields: [
                {
                    type: 'string',
                    title: 'Title',
                    name: 'title',
                },
                {
                    type: 'text',
                    title: 'Description',
                    name: 'description',
                },
                {
                    type: 'string',
                    title: 'Keywords',
                    name: 'keywords',
                },
                {
                    type: 'image',
                    name: 'image',
                    title: 'image'

                }
            ]
        },
        {
            name: "news",
            title: 'News Metadata',
            type: "object",
              options: {collapsible: true,collapsed: true },
            fields: [
                {
                    type: 'string',
                    title: 'Title',
                    name: 'title',
                },
                {
                    type: 'text',
                    title: 'Description',
                    name: 'description',
                },
                {
                    type: 'string',
                    title: 'Keywords',
                    name: 'keywords',
                },
                {
                    type: 'image',
                    name: 'image',
                    title: 'image'

                }
            ]
        }, {
            name: "projects",
            title: 'Projects Metadata',
            type: "object",
            modal: {type: 'popover'},
              options: {collapsible: true,collapsed: true },
            fields: [
                {
                    type: 'string',
                    title: 'Title',
                    name: 'title',
                   
                },
                {
                    type: 'text',
                    title: 'Description',
                    name: 'description',
                },
                {
                    type: 'string',
                    title: 'Keywords',
                    name: 'keywords',
                },
                {
                    type: 'image',
                    name: 'image',
                    title: 'image'

                }
            ]
        },
       
    ]







}