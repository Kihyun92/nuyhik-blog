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
      <h1>📖 블로그</h1>
      <ul>
        {posts.map((post) =>   (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.metadata.title}
            </Link>{" "}
            - {post.metadata.date}
          </li>
        ))}
      </ul>
    </div>
  );
}