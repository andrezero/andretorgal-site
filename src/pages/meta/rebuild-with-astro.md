---
layout: ../../templates/MetaPage.astro
title: Re-build with Astro
description: I have been playing with Astro for a while now. I am confident this is the static site generator I have always been looking for.
published: 2022 Dec 20
tags:
  - ssg
  - decisions:current
links:
  - type: company
    name: Button School
  - type: software
    name: React Static
  - type: software
    name: Astro
  - type: software
    name: Next.js
  - type: software
    name: Gatsby
---

## Why

- My website's core metrics have been degrading over the last 3 years. Not acceptable anymore
- [React Static](https://github.com/react-static/react-static) is in maintenance mode now, need to replace it with something more modern
- Could use the opportunity to dream up some exciting new features for the website.
- I need a holiday project

## Decision: rebuild the site with [Astro](https://astro.build)

This is the static site generator I have always been looking for. I have been having a great experience
while helping friends build the [Button School website](https://buttonschool.com/) and it can certainly
handle the

- :check: Markdown & MDX support
- :check: Fully SSG first, with opt-in client-side
- :check: SEO-friendly with canonical URLs and OpenGraph data
- :check: Sitemap support
- :check: RSS Feed support
- :check: 100/100 Lighthouse performance

## Trade-offs

- the way that you query for data
- coupling URL with file-structure
- no (react) context available on SSG time
- embracing `cjs` means some older tools may not be compatible

## Other options considered

No serious contender.

### Next.js SSG

In Next.js, SSG is an afterthought. And an [advanced feature](https://nextjs.org/docs/advanced-features/static-html-export).

I already have to deal with this monster at work and I don't really even need the whole react stack for this web site.

### Gatsby

Gatsby was already bloating 3 years ago. Plus, I still don't find the GraphQL indirection comfortable.

> You’ll learn in this guide how Gatsby’s automatic GraphQL Typegen feature

No thanks.
