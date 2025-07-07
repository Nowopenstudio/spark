export default {
    name: "projects",
    type: "document",
    title: 'Project',
    fields: [

        {
            type: "string",
            name: 'title',
            title: 'Title'
        },
        {
            type: 'slug',
            name: 'slug',
            title: 'Slug',
            options: {
                source: 'title'
            }

        },
        {
            type: 'object', name: 'cover', title: 'Cover', fields: [
                { type: 'image', name: 'image', title: 'Image' },
                { type: 'mux.video', name: 'video', title: 'Video' }
            ]
        },

        { name: 'subhead', type: 'string', title: "Intro Header" },
        { name: 'copy', type: 'array', title: "Copy", of: [{ type: 'block' }] },
        {
            type: 'array',
            name: 'donations',
            title: "Donations",
            of: [{
                type: 'object',
                name: 'donate',
                title: 'Donate',
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        title: 'Title'
                    },
                    { type: 'array', name: "summary", title: 'summary', of: [{ type: 'block' }] },
                    {
                        type: 'array',
                        name: 'content',
                        title: 'Content',
                        of: [
                            {
                                name: 'single', title: "Single", type: "object", fieldsets: [{
                        name: 'content',
                        title: 'Content Type',
                        options: { columns: 2 }
                    }],fields: [
                                    {
                                        name: 'content', title: 'Type', type: 'string', initialValue: 'text', fieldset:'content', options: {
                                            list: [
                                                { title: 'Text', value: 'text' },
                                                { title: 'Image', value: 'image' },
                                                { title: 'Image Gallery', value: "gallery" },
                                                { title: 'Video', value: 'video' },
                                                { title: 'Video Embed', value: 'embed' },
                                                { title: 'List', value: 'list' }
                                            ],


                                        }
                                    },
                                    {
                                        name:'ordered',type:'boolean',title:"Ordered List", fieldset:'content',hidden: ({ parent }: any) => parent?.content !== "list"
                                    },
                                    {
                            name: 'list', title: "List", type: 'object', hidden: ({ parent }: any) => parent?.content !== "list", fields: [
                                { name: 'text', title: 'Text', type: "array",of:[{type:'block'}] },
                                {
                                    name: 'items', title: "Items", type: "array", of: [
                                        {
                                            name: 'item', type: "object", title: "Item", fields: [
                                                { name: "title", type: 'string', title: "Subhead" },
                                                { name: 'item', type: "array", title: "Item", of: [{ type: 'block' }] }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                         { name: 'embed', title: 'Embed', type: 'text', hidden: ({ parent }: any) => parent?.content !== "embed" },
                                    { name: 'text', title: 'Text', type: 'array', of: [{ type: 'block' }], hidden: ({ parent }) => parent?.content !== "text" },
                                    { name: 'image', title: 'Image', type: 'image', hidden: ({ parent }) => parent?.content !== "image" },
                                    { name: 'gallery', title: 'Image Gallery', type: 'array', hidden: ({ parent }) => parent?.content !== "gallery", of: [{ type: 'image', name: 'image', title: 'Image' }] },
                                    { name: 'vid', title: 'Video', type: 'mux.video', hidden: ({ parent }) => parent?.content !== "video" },
                                ]
                            }
                        ]
                    },
                    {
                        type: 'string',
                        title: 'Open Slug',
                        name: 'openSlug'
                    },
                    {
                        type: 'color',
                        name: 'color',
                        title: 'Color',
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


                ]

            }]
        }

    ]
}