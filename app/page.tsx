import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { PostMetadata } from "../types/post";

const postsDirectory = path.join(process.cwd(), "posts");

export default function HomePage() {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents) as unknown as { data: PostMetadata };

    return {
      slug: filename.replace(".md", ""),
      metadata: data,
    };
  });

  return (
    <div>
      <h1>📖 김기현 블로그</h1>
      <p>기억 정리를 위한 블로그입니다. 최대한 심플하게 작성하기 때문에 잘못된 정보가 있을 수 있습니다.</p>
      <p>잘못된 부분에 대한 지적은 언제든 환영입니다 🤗</p>
      <ul>
        {posts.map((post) =>   (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.metadata.title}
            </Link>{" "}
            - {post.metadata.updatedDate ?? post.metadata.createdDate}
          </li>
        ))}
      </ul>
    </div>
  );
}