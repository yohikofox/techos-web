import Author from "./author";
import ImageSet from "./image";
import PostStats from "./postStats";
import Tag from "./tag";

export enum PostType {
  Article = "article",
  Event = "event",
  News = "news",
  Project = "project",
  Ad = "ad",
}

interface IPost {
  id: string;
  title: string;
  extract?: string;
  slug: string;
  content: string;
  start_at: string;
  end_at?: string;
  picture?: Partial<ImageSet>;
  author: Author;
  type: PostType;
  tags?: Tag[];
  stats?: PostStats;
  level?: string;
}

class Post implements IPost {
  id: string;
  title: string;
  extract?: string | undefined;
  slug: string;
  content: string;
  start_at: string;
  end_at?: string | undefined;
  picture?: Partial<ImageSet> | undefined;
  author: Author;
  type: PostType;
  tags?: Tag[] | undefined;
  stats?: PostStats | undefined;
  level?: string | undefined;

  constructor(post: IPost) {
    this.id = post.id;
    this.title = post.title;
    this.extract = post.extract;
    this.slug = post.slug;
    this.content = post.content;
    this.start_at = post.start_at;
    this.end_at = post.end_at;
    this.picture = post.picture;
    this.author = post.author;
    this.type = post.type;
    this.tags = post.tags;
    this.stats = post.stats;
    this.level = post.level;
  }
}

export default Post;
