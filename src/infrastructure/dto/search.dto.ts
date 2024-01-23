export type SearchData = {
  hits: any[]
}

// {
//   hits: await Promise.all(result.Value.hits.map(async (hit: any) => {
//     return {
//       title: hit.title,
//       slug: hit.slug,
//       content: hit.content,
//       extract: hit.extract,
//       picture: await this.imageSetService.mapImageSet(hit.picture),
//       author: hit.author && {
//         username: hit.author?.username,
//       },
//       start_at: hit.start_at,
//     } as SearchDataItem
//   }))
// }