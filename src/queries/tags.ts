import type { AstroNode, BaseNode, TagNode } from "../types";
import { today } from "../utils/date";

const newTag = (name: string): TagNode => ({
  type: " tag",
  url: `/tag/${name}`,
  title: name,
  published: today(),
  count: 0,
});

type TagMap = {
  [key: string]: TagNode;
};

export const allTags = (allNodes: AstroNode<BaseNode>[]) => {
  const tagNodes = allNodes.filter((node) => node.frontmatter.type === "tag");
  const tagAccumulator = tagNodes.reduce((acc, node) => {
    const tag = node.frontmatter.title || "!";
    acc[tag] = { ...node.frontmatter, count: 0 };
    return acc;
  }, {} as TagMap);

  const tags = allNodes
    .filter((item) => item.frontmatter.tags?.length)
    .reduce((acc, item) => {
      item.frontmatter.tags?.forEach((tag: string) => {
        const node = acc[tag] || newTag(tag);
        node.count++;
        acc[tag] = node;
      });
      return acc;
    }, tagAccumulator);

  return Object.entries(tags)
    .sort((entryA, entryB) => entryB[1].count - entryA[1].count)
    .map(([_, tag]) => tag);
};
