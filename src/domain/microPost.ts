import ImageSet from "./image";
import Tag from "./tag";

// export enum PostType {
//   Article = "article",
//   Ad = "ad",
// }

type MicroPost = {
  title: string;
  slug: string;
  content: string;
  picture?: Partial<ImageSet>;
  tags?: Tag[];
};

export default MicroPost;
