type Post = {
  frontMatter: {
    date?: string;
    title?: string;
    tags?: string[];
    description?: string;
  };
  regularPath: string;
};

export function initTags(post: Post[]) {
  const data: any = {};
  for (let i = 0; i < post.length; i++) {
    const element = post[i];
    const tags = element.frontMatter.tags;
    // tags是数组，需要tags按照数组语法的格式书写
    if (Array.isArray(tags)) {
      tags.forEach((item) => {
        if (!data[item]) {
          data[item] = [];
        }
        data[item].push(element);
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
