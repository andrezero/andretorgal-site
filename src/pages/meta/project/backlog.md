---
layout: ../../../templates/MetaPage.astro
type: page
title: Backlog
description: Stuff I want to do or at least experiment with on this website
published: 2019 May 20
updated: 2023 Jan 08
tags:
  - andretorgal-com
---

The done stuff is on the [changelog](/meta/project/changelog) page.

---

## Feature: advanced images

- IA: images/media nodes, easy?
- Optimisation: SEO og:image
  - "unblocks remark / rehype plugins appending to frontmatter"
  - as seen in https://github.com/withastro/astro/pull/4137
- UI: Content component
  - `<Hero>`
  - `<ImageCaption>`
  - `<Blockquote>`

## UI: footer

## Abstract component

- UI: Abstract component. see https://github.com/astro-community/md

## Port `tag/**` content

- Content: port all `tags/**` content from `andretorgal.com`
- Feature: top tags
- Feature: latest tags
- UI: navigation for `tags/**` section header - all, top, latest
- UI: tag styling

## Migration

- Decide [/meta/records/pending/hosting]
- Lighthouse
- Firefox security audit
- Ops: S3 redirects (required to migrate some url schemes) https://primitive.dev/blog/aws-s3-redirects/
- Accessibility: audit and tweaks

## Feature: Links

- Content: Add links to existing posts
- Feature: show links in article
- Feature: Link page
- Feature: Links home
- Feature: navigation in links section

## Feature: Experiments

- Content: port `experiments/**` from `andretorgal.com`

## Later

- Tooling: accessibility linting
- Feature: Media stream
- UI: pagination
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
- UI: navigation: `blog/**`: section footer: related
- Observability
- Feature: link roll
- UI: Theming
- Feature: related posts
- Feature: footnotes
- Feature: emojis https://openmoji.org/
- Feature: link to source file on some content
- Feature: search

## Link dump

- [ ] [solid](https://solid.inrupt.com/)

  - [ ] [linked-data-developer-experience](https://ruben.verborgh.org/blog/2018/12/28/designing-a-linked-data-developer-experience/)

- [ ] svg trickery

  - [ ] via [postcss](https://github.com/jonathantneal/postcss-write-svg)

- [ ] Accessibility: [On demand announcements](https://github.com/Heydon/on-demand-live-region)
- [ ] Micro formats
- [ ] [Micropub](https://indieweb.org/Micropub) + [micropub-express](https://github.com/voxpelli/node-micropub-express) + [Micropub](https://micropub.rocks/)
- [ ] [Web mentions](https://webmention.io/)
