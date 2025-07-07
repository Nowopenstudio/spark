export default {
    name: "articles",
    type: "document",
    title: 'Articles',
    groups: [{
        name: 'infoSet',
        title: 'Info',
        options: { columns: 2 },
    }],
    fields: [
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
            type: 'slug',
            name: 'slug',
            title: 'Slug',
            group: 'infoSet',
            options: {
                source: 'title'
            }

        },
        {
            type: 'reference',
            name: 'author',
            title: 'Author',
            group: 'infoSet',
            to: [{ type: 'authors' }]
        },
        {
            type: 'reference',
            name: 'category',
            title: 'Category',
            group: 'infoSet',
            to: [{ type: 'categories' }]
        },

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
                        { name: 'desc', title: 'Text', type: 'array', of: [{ type: 'block' }], hidden: ({ parent }: any) => parent?.content !== "text" },
                        { name: 'embed', title: 'Embed', type: 'text', hidden: ({ parent }: any) => parent?.content !== "embed" },
                        { name: 'image', title: 'Image', type: 'image', hidden: ({ parent }: any) => parent?.content !== "image" },
                        {
                            name: 'list', title: "List", type: 'object', hidden: ({ parent }: any) => parent?.content !== "list", fields: [
                                { name: 'title', title: 'Title', type: "string" },
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

    ]
}