// Type augmentation for MDX modules so imported `.mdx` files expose their
// exported `metadata` const with a real shape.
//
// @types/mdx only types the default export, so projects/articles export a
// typed `metadata` that we read for index pages.
declare module "*.mdx" {
  export const metadata:
    | import("@/types").ProjectMeta
    | import("@/types").ArticleMeta
    | import("@/types").ResearchNoteMeta;
}
