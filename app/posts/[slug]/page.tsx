import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
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
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);
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
      <header>
        <p className="text-4xl font-bold">{metadata.title}</p>
        <p className='text-right text-sm'>등록일: {metadata.createdDate}</p>
        <p className='text-right text-sm'>수정일: {metadata.updatedDate ?? metadata.createdDate}</p>
      </header>
      <article>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}
