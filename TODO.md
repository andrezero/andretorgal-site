# TODO.md

## Feature: blog home

- UI: make NodeDate compact for use in list items vs articles
- Feature: blog home
- Feature: homepage latest posts

## Tools

- Testing: research
  - see https://github.com/astro-community/component-template/blob/main/test/example.test.js
- Husky: lint, test, build

## Feature: images

- Content: port all images from `andretorgal.com`
- Optimisation: SEO og:image
- IA: images/media nodes, easy?
  - "unblocks remark / rehype plugins appending to frontmatter"
  - as seen in https://github.com/withastro/astro/pull/4137
- UI: Content component
  - `<Hero>`
  - `<ImageCaption>`
  - `<Blockquote>`

## Feature:

## Abstract component

- UI: Abstract component. see https://github.com/astro-community/md

## Port `meta/**` content

- Content: port all `meta/**` content from `andretorgal.com`
- UI: navigation: `meta/**` section header - docs, project, decisions

## Port `tag/**` content

- Content: port all `tags/**` content from `andretorgal.com`
- Feature: top tags
- Feature: latest tags
- UI: navigation for `tags/**` section header - all, top, latest
- UI: tag styling

- UI: navigation: `things/**`: section header:

## Later

- Accessibility: audit and tweaks
- Feature: Media stream
- Feature: pagination
- Content: port `experiments/**` from `andretorgal.com`
- UI: content components: `NodeCard`, `NodeList`
- Features:
  - feed archive
  - search
  - rss: https://github.com/withastro/astro/tree/main/packages/astro-rss
  - site map: https://github.com/withastro/astro/tree/main/packages/integrations/sitemap
- Optimisation: prefetch:
  - benchmark first, interesting to document
  - see https://docs.astro.build/en/guides/integrations-guide/prefetch/
- UI: embeds:
- see https://github.com/astro-community/astro-embed/tree/main/packages/astro-embed-youtube
- SEO: audit and tweaks
  - see https://github.com/astro-community/astro-seo

## Navigation

- UI: navigation: `blog/**`: section footer: related

## Deployment

- Ops: S3 redirects (required to migrate some url schemes) https://primitive.dev/blog/aws-s3-redirects/

# Done

## Setup

- Setup: astro install
- Benchmark: 8 page(s) built in 2.93s
- Setup: ESLint setup https://github.com/ota-meshi/eslint-plugin-astro
- IA: basic `blog/**`, `about/**`, `tags/**`
- Benchmark: 13 page(s) built in 3.01s

## Port `about/**` content

- UI: CSS Reset: basic vars
- UI: layout components: `<Document>`, `<Layout>` and friends
- UI: space system in CSS vars
- UI: typography system in CSS vars
- UI: navigation components: `<NavLink>`, `<SiteHeader>` and friends
- UI: content components: `Logo`
- UI: navigation for `about/**` section
- Content: port all `about/**` content from `andretorgal.com`
- Content: bootstrap the section `meta/**`
- Benchmark: 23 page(s) built in 3.78s

## Port `posts/**` content

- IA: `BaseNode` `<-` `TagNode`, `BlogPost`, `MetaPage`
- UI: content components: `<PageTitle>` and friends
- UI: content components: `<Node*>`
- UI: content components: `<Audio>`, `<Image>`
- UI: color system, color schemes, both in CSS vars
- Accessibility: link outline focus and color contrasts across all schemes
- UI: layout / responsive
- Benchmark: 23 page(s) built in 5.16s

## Port `posts/**` content

- Content: port all `posts/**` content from `andretorgal.com`
- Fix: switch to sharp to fix build https://github.com/withastro/astro/issues/5473
- Refactor: rename `layouts` to `templates` because more semantic
- Benchmark: 59 page(s) built in 7.93s

## Feature: blog home

- Refactor: extract views from `pages/` because easier to navigate

  - keep controllers in `pages/**/.astro`
  - move those views to `template/*.astro`

- Refactor: categorise components by how they are used

  - use `@components/` - shortcut in import statements
  - `mdx/` - Abstract, Year, Audio, Image
  - `node/parts` NodeDate, NodeMeta, NodeAbstract, NodeMeta, TagLink
  - `node/lists` TagList, NodeList, NodeListItem
  - `document/` - Document, Head, Body
  - `navigation/` - NavLink
  - `page/` - Page\*, Article\*, Section\*, Markup
  - `site/` - SiteLayout, Site\*

- Cleanup: remove feed (will come back later)
- UI: new TopLine and Divider components aligned with global layout
- UI: navigation of `blog/**` section header - previous, next
