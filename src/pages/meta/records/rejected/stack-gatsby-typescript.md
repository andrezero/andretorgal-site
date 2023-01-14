---
layout: ../../../../templates/MetaPage.astro
type: decision
title: 'Stack: Gatsby + Typescript + SASS'
tags:
  - jam-stack
  - static-websites
  - gatsby
  - typescript
  - graphql
published: 2019 May 16
---

## Why

- all data sources need a graphql layer
- data models in components, boilerplate
- not pure typescript (many js config files)
- typescript not compiled strict (not using tsconfig.json?) at develop/build time
- brittle, multiple compilation issues so far

### Issues

- typed graphql queries
  - https://www.isaacbroyles.com/2018/08/19/gatsbyjs-typescript.html
- integration with storybook painful

## Was

- static site, html burner
- react + typescript (tsx) sass
- plugin galore (images, attachments, meta, seo, ...)

## Read more

- [guide: gatsby+typescript+sass step by step](https://medium.com/@thetrevorharmon/how-to-make-a-super-fast-static-site-with-gatsby-typescript-and-sass-3742c00d4524)
- [starter: blog](https://github.com/mhadaily/gatsby-starter-typescript-power-blog)
- [example: blog](https://github.com/magarcia/magarcia.io/tree/greenkeeper/gatsby-2.3.2)
