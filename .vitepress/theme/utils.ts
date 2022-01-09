import globby from "globby";
import matter from "gray-matter";
import fs from "fs-extra";
import path from "path";

export async function getPosts() {
  let paths = await getPostMDFilePaths();
  let posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, "utf-8");
      const { data } = matter(content);
      data.date = _convertDate(data.date);
      return {
        frontMatter: data,
        regularPath: `/${item.replace(".md", ".html")}`,
      };
    })
  );
  posts.sort(_compareDate);
  return posts;
}

export function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON();
  return json_date.split("T")[0];
}

export function _compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
}

export async function getPostMDFilePaths() {
  let paths = await globby(["**.md"], {
    ignore: ["node_modules", "README.md"],
  });
  return paths.filter((item) => item.includes("posts/"));
}

type Post = {
  frontMatter: {
    date: string;
    title: string;
    tags: string[];
    description: string;
  };
  regularPath: string;
};

export function initTags(post: Post[]) {
  const data: any = {};
  for (let index = 0; index < post.length; index++) {
    const element = post[index];
    const tags = element.frontMatter.tags;
    if (tags) {
      tags.forEach((item) => {
        if (data[item]) {
          data[item].push(element);
        } else {
          data[item] = [];
          data[item].push(element);
        }
      });
    }
  }
  return data;
}

export function useYearSort(post: Post[]) {
  const data = [];
  let year = "0";
  let num = -1;
  for (let index = 0; index < post.length; index++) {
    const element = post[index];
    if (element.frontMatter.date) {
      const y = element.frontMatter.date.split("-")[0];
      if (y === year) {
        data[num].push(element);
      } else {
        num++;
        data[num] = [] as any;
        data[num].push(element);
        year = y;
      }
    }
  }
  return data;
}
