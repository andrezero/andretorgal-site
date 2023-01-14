---
layout: ../../../templates/MetaPage.astro
type: page
title: Changelog
published: 2019 May 20
updated: 2023 Jan 08
tags:
  - andretorgal-com
---

Tasks from [my website](/about)'s [backlog](/meta/project/backlog), eventually done (or archived).

---

<Year y="2023">

## From React Static to Astro

<Year y="2022">

## React Static to Astro

## Port `meta/**` content

- Content: port all `meta/**` content from `andretorgal.com`
- UI: navigation: `meta/**` section header - docs, project, decisions

## (Astro) Feature: image basics

- Meta: optimise favicon pack, clean up public folder
- Content: port all images from `andretorgal.com`
- Chore: update astro to `1.9.1` ... 2.0.0 is coming very soon!

## (Astro) Tools

- Testing: setup playwright
- Testing: tested title in `/` and screenshot in `/about`
- Tools: pre-commit hooks with Lefthook
- Testing: more visual regression tests, will be useful while we iterate (soon)
- configure Github actions

## (Astro) Feature: blog

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
- UI: make NodeDate compact for use in list items vs articles
- UI: separate Page from Section components
- Feature: blog home
- Feature: homepage latest posts
- Benchmark: 58 page(s) built in 5.90s

## (Astro) Port `posts/**` content

- Content: port all `posts/**` content from `andretorgal.com`
- Fix: switch to sharp to fix build https://github.com/withastro/astro/issues/5473
- Refactor: rename `layouts` to `templates` because more semantic
- Benchmark: 59 page(s) built in 7.93s

## (Astro) Port `posts/**` content

- IA: `BaseNode` `<-` `TagNode`, `BlogPost`, `MetaPage`
- UI: content components: `<PageTitle>` and friends
- UI: content components: `<Node*>`
- UI: content components: `<Audio>`, `<Image>`
- UI: color system, color schemes, both in CSS vars
- Accessibility: link outline focus and color contrasts across all schemes
- UI: layout / responsive
- Benchmark: 23 page(s) built in 5.16s

## (Astro) Port `about/**` content

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

## (Astro) Setup

- Setup: astro install
- Benchmark: 8 page(s) built in 2.93s
- Setup: ESLint setup https://github.com/ota-meshi/eslint-plugin-astro
- IA: basic `blog/**`, `about/**`, `tags/**`
- Benchmark: 13 page(s) built in 3.01s

<Year y="2022" />

## Feature: experiment's banner

- clicking banner goes to andretorgal.com homepage
- detect if framed, de-frame

## Feature: experiments

- model, template, source, routes
- iframe
- include experiments in feed

## fixes

- fix media create/update dates and media list sorted by
- fix image card with link, image detail double title

## Tools: migrate tslint to eslint

<Year y="2019">

## Optimisations

- redirect `www...` to `andretorgal.com` (Route53 > CF > S3 redirect)
- google search sitemap submit / [domain verification](https://support.google.com/a/answer/6149686?hl=en&ref_topic=4487770)

## Feedback and hot-fixes

- fix! a couple of 404 in `feed/`
- fix nested `<a>` in `tags/` page, improve tag list style
- fix blog post abstract style missing
- fix markdown is rendering an extra div (definitely messing with first/last-child margin resets)
- fix missing drop-caps style
- fix media list item in feed not rendering image
- mute recently updated
- fix empty tag list rendering empty `<ul>` is annoying for screen reading
- fix no-select missing in some navigation and meta
- fix meta list item is not picking up the right component
- exclude `home/`, `media/`, `feed/`, and `tags/` from feed, as they pick up tags from the listed items
- fix empty/repeated meta tags: refactor node meta tag objects to dicts, convert to array just before rendering
- fix tag page, tag count truncated
- fix layout, section v spacing
- fix feed path filter was duh
- enhance link to top with javascript scroll to top, prevents bottom & top of page from both being entries in browser history
- style suspense fallback loading component
- fix staging, link to prod was broken
- fix media pages not showing sources
- `ResponsiveImg` handle image [loaded](https://www.javascriptstuff.com/detect-image-load/) transition
- `ResponsiveImg` load on scroll into view
- replace utf chars with svg (external link and link to top)
- refactor details and cards; introducing node type mixins
- refactor schemes
- `/meta` `validateDOMNesting(...): <p> cannot appear as a descendant of <p>.`

## React Static: Deploy

- add banner to staging
- add banner to drafts
- deploy to prod
- setup staging buckets, cloudfront, `cname`
- s3 sync in dev time
- add a `!-- notes --` section to articles (stripped out in prod)
- production build: strip notes & filter drafts
- recreate separate buckets and distributions for staging/prod
- render different custom metas depending on stage (e.g. robots)
- add custom `robots.txt` to `dist/` folder depending on build stage
- local deploy scripts
- bounce andretorgal.com
- create R53 > CF > S3 > redirection `www.andretorgal.com` to `andretorgal.com`
- enable [gzip in Cloudfront?]([https://medium.com/faun/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128])

## Assets

- extract, manipulate, responsive print images and upload
- collect assets and generate asset nodes
  - refactor: move links to node.meta
  - refactor: DRY node/route creation
  - refactor: move link functions from `lib/node.ts` to `lib/link.ts`
- create media nodes and routes
- define asset preset/profiles
- locate and copy during dev build
- collect assets from hero too
- og image
  - complete meta headers
  - replace `ReactStatic.Head` with custom `<Head page={node} title={...} meta={[...]}>`
  - meta description defaults;
- generate resolutions during dev build
  - managing images, image sharp, other
  - refactor markdown, kill variants
- responsive print
- serve locally via `npm server` using `concurrently`

## Improve tooling

- update dependencies
- configure lintstyle, eslint, tslint

## Information architecture

- models, views

  - page style
  - meta style
  - tag style
  - hero component
  - fix `sronly` not being rendered
  - fix headings
  - differentiate external links
  - contents/meta abstracts (include in page body)
  - contents/page abstracts (include in hero if hero is on)

  - models: tags
  - page tags
  - page tag

  - format dates are missing month names
  - format checkboxes in markdown

- link nodes: children/parent

  - show children component in meta/
  - link to parent in meta/

- link nodes: next/previous

  - show next/previous in posts/
  - show related nodes

- cleanup templates, add feed route, improve route paths

  - rename meta/ to meta
  - improve header style
  - simplify link component, allow passing dom attributes link tabIndex
  - show recent nodes under feed/ and home page
  - refactor routes containers and templates
    - move containers next to templates, using a simple wrapper fn
    - declare route interfaces in template units as well
  - show tags in posts

## Styling

- CSS custom properties
- css global variables mixins
- move away from css modules
- site footer
- blog navigation
- fix page container
- configure browserslist
- drop support for IE 11 and opera mobile
- cleanup css

## Basic rendering

- read-more element
- breakdown blog components; introduce @mixin base-page
- refactor model: everything is a node (page, doc, post, ...)
- show post dates
- extract post meta, tag list, rename article > node

## Accessible routing

- set focus on page load, route change and anchor navigation
- scroll to anchor on page load and on route change
- scroll to top on page route change
- switch from `@reach/router` to `react-router`

## React Static custom routes and pages

- markdown factory, and specialised markdown elements
- no default exports, except for containers and App
- integrate docs into content
- re-organise docs
- split records into individual files
- spike: storybook + typescript + SCSS
- cleanup: react static config, watcher, routes, extraneous 404 page
- typed SCSS modules (IDE support + compile time)
- css ie11 support via postcss and prefixer
- SCSS lint
- fix: strip links from abstracts not working
- custom headings with anchor
- normalise code style
- abstract: extract text from a specific markdown block
- typed route data
- head, seo, helmet
- frontmatter: custom title
- custom template
- custom slug
- internal links should default to top anchor
- layout container
- watch content directories and re-render on change
- external vs local links in markdown renderer
- markdown POC blog posts [props](https://github.com/s-thom/website/blob/develop/src/components/MdRenderer/index.tsx)

## Spike: React Static (+ typescript + sass)

- [bootstrap](https://medium.com/@thetrevorharmon/how-to-make-a-super-fast-static-site-with-gatsby-typescript-and-sass-3742c00d4524)
- full static build
- 404
- typed SCCS modules (IDE support + compile time)
- IE11

## Spike: Gatsby (+ typescript + sass + markdown)

- bootstrap
- full static build
- move content to `./content`
- typed SCSS modules (IDE support + compile time)
- 404
- IE11
- env vars
- markdown pages
- markdown blog posts