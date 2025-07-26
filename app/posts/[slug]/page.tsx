import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "../../../types/post";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

async function getPostData(slug: string): Promise<Post> {
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents) as unknown as {
    data: Post["metadata"];
    content: string;
  };
  const processedContent = await remark().use(html).process(content);
  return {
    slug,
    metadata: data,
    contentHtml: processedContent.toString(),
  };
}

type Props =  {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: Props) {
  const slug = (await params).slug
  const { metadata, contentHtml } = await getPostData(slug);

  return (
    <div>
      <h1>{metadata.title}</h1>
      <p>created at: {metadata.createdDate}</p>
      <p>updated at: {metadata.updatedDate ?? metadata.createdDate}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
