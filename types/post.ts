export interface PostMetadata {
  title: string;
  date: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  contentHtml: string;
}
