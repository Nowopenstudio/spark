export const myStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('News')
        .child(
          S.documentTypeList('news')
            .title('News')
        ),
      S.divider(),
      S.listItem()
        .title('Articles')
        .child(
          S.documentTypeList('articles')
            .title('Articles')
        )
      ,
      S.listItem()
        .title('Filter Articles')
        .child(
          S.list()
            .title('Filter By')
            .items([
              S.listItem().title('By Category')
                .child(
                  S.documentTypeList('categories')
                    .title('Posts by Category')
                    .child(catId =>
                      S.documentTypeList('articles')
                        .title('Articles')
                        .filter('_type == "articles" && $catId == category._ref')
                        .params({ catId })
                    )
                ),
              S.listItem().title('By Author')
                .child(
                  S.documentTypeList('authors')
                    .title('Posts by Author')
                    .child(authorId =>
                      S.documentTypeList('articles')
                        .title('Articles')
                        .filter('_type == "articles" && $authorId == author._ref')
                        .params({ authorId })
                    )
                )
            ])
        ),
      S.divider(),
       S.listItem()
        .title('Projects')
        .child(
          S.documentTypeList('projects')
            .title('Projects')
        ),
      S.listItem()
        .title('Donations')
        .child(S.document().title('Donations').schemaType('donate').documentId('donate')),
      S.divider(),
      S.listItem()
        .title('Guide')
        .child(S.document().title('Guide').schemaType('guide').documentId('guide')),
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem()
                .title('What is Spark')
                .child(S.document().title('about').schemaType('about').documentId('about')),
              S.listItem('roadmap')
                .title('Roadmap')
                .child(S.document().title('Roadmap').schemaType('roadmap').documentId('roadmap')),
              S.listItem()
                .title('Membership')
                .child(S.document().title('Membership').schemaType('membership').documentId('membership')),
              S.listItem()
                .title('Contact')
                .child(S.document().title('Contact').schemaType('contact').documentId('contact')),


            ])
        ),
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Setting Documents')
            .items([
              S.listItem()
                .title('Categories')
                .child(

                  S.documentTypeList('categories')
                    .title('Categories')
                ),
              S.listItem()
                .title('Authors')
                .child(
                  S.documentTypeList('authors')
                    .title('Authors')
                ),
                S.listItem()
                .title('Info')
                .child(S.document().title('Info').schemaType('info').documentId('info')),


            ])
        ),

      ...S.documentTypeListItems().filter(listItem => !['donate', 'info','guide','news', 'projects', 'mux.videoAsset', 'categories', 'authors', 'about', 'roadmap', 'membership', 'contact', 'articles'].includes(listItem.getId())),
    ])