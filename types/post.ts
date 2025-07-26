export interface PostMetadata {
  title: string;
  createdDate: string;
  updatedDate: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  contentHtml: string;
}
