export default {
    name: "guide",
    type: "document",
    title: 'guide',
    groups: [{
        name: 'infoSet',
        title: 'Info',
        options: { columns: 2 },
    },
    {
        name: 'meta',
        title: 'Meta',
    }],
    fields: [
        {
            type: 'string',
            name: 'title',
            title: 'Title',
        },
        {
            type: 'string',
            name: 'subTitle',
            title: 'Sub Title',
        },
   
        {
            type: "object",
            name: "cover",
            title: 'Cover',
            fields: [

                {
                    name: "image",
                    type: 'image',
                    title: "file"
                },
                {
                    name: "video",
                    type: 'mux.video',
                    title: "Video"
                }

            ]

        },
        
        { name: 'summary', title: 'Summary', type: 'array', of: [{ type: 'block' }] },

        {
            type: 'array',
            name: 'content',
            title: 'Content',

            of: [
                {
                    name: 'single', title: "Single", type: "object", preview: {
                        select: {
                            title: 'content',
                            media: 'image'
                        }
                    }, fieldsets: [{
                        name: 'content',
                        title: 'Content Type',
                        options: { columns: 2 }
                    },
                    ], fields: [
                        {
                            name: 'content', title: 'Type', type: 'string', initialValue: 'image', fieldset: 'content', options: {
                                list: [
                                    { title: 'Text', value: 'text' },
                                    { title: 'Image', value: 'image' },
                                    { title: 'Image Gallery', value: "gallery" },
                                    { title: 'Video Upload', value: 'video' },
                                    { title: 'Video Embed', value: 'embed' },
                                    { title: 'List', value: 'list' }
                                ]
                            }
                        },
                        {
                                        name:'ordered',type:'boolean',title:"Ordered List", fieldset:'content',hidden: ({ parent }: any) => parent?.content !== "list"
                                    },
                        { name: 'text', title: 'Text', type: 'array', of: [{ type: 'block' }], hidden: ({ parent }: any) => parent?.content !== "text" },
                        { name: 'embed', title: 'Embed', type: 'text', hidden: ({ parent }: any) => parent?.content !== "embed" },
                        { name: 'image', title: 'Image', type: 'image', hidden: ({ parent }: any) => parent?.content !== "image" },
                        {
                            name: 'list', title: "List", type: 'object', hidden: ({ parent }: any) => parent?.content !== "list", fields: [
                               { name: 'text', title: 'Text', type: "array",of:[{type:'block'}] },
                                 { name: 'faqs', title:'FAQs', type:'boolean'},
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
                        {
                            name: 'gallery', title: 'Image Gallery', type: 'array', hidden: ({ parent }: any) => parent?.content !== "gallery", of: [{
                                type: "object",
                                name: "cover",
                                title: 'Cover',
                                preview: {
                                    select: {
                                        media: 'image'
                                    }
                                },
                                fields: [

                                    {
                                        name: "image",
                                        type: 'image',
                                        title: "file"
                                    },
                                    {
                                        name: "video",
                                        type: 'mux.video',
                                        title: "Video"
                                    }

                                ]

                            }]
                        },
                        { name: 'vid', title: 'Video', type: 'mux.video', hidden: ({ parent }: any) => parent?.content !== "video" },
                        { name: 'caption', title: 'caption', type: 'array', hidden: ({ parent }: any) => parent?.content !== "image", of: [{ type: 'block' }] },
                    ]
                }
            ]
        },

        {
            name: "meta",
            title: 'Metadata',
            type: "object",
            group: "meta",
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
        }



    ],
    preview: {
        select: {
            title: 'title',
        }
    }
}