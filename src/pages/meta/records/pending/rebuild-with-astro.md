---
layout: ../../../../templates/MetaPage.astro
type: decision
title: Re-build with Astro
description: I have been playing with Astro for a while now. I am confident this is the static site generator I have always been looking for.
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
published: 2022 Dec 20
---

## Why

- My website's core metrics have been degrading over the last 3 years. Not acceptable anymore
- [React Static](/meta/records/rejected/react-static) is in maintenance mode now, need to replace it with something more modern
- Could use the opportunity to dream up some exciting new features for the website.
- I need a holiday project

## Decision: rebuild the site with [Astro](https://astro.build)

Is this is the static site generator I have _always_ been looking for?

No doubt, I have been having a great experience while helping friends build the [Button School website](https://buttonschool.com/) and it can certainly handle the

- :check: Markdown & MDX support
- :check: Fully SSG first, with opt-in client-side
- :check: SEO-friendly with canonical URLs and OpenGraph data
- :check: Sitemap support
- :check: RSS Feed support
- :check: 100/100 Lighthouse performance

## Trade-offs

Astro core maintainers seem to be very focused on "easy to use" use cases and the "non typescript person" out there. I can totally empathise with that and wish the best luck. Hopefully the opinionated parts of Astro don't get too much in the way fo building a more bare bones experience. Hopefully I can tag along for a while.

- :fingers-crossed: querying for data is not terribly optimised, let's see how this scales
- :sad: coupling URL with file-structure
- no (react) context available on SSG time - no miracles
- embracing `cjs` means some older tools may not be compatible, but let's embrace the future

## Other options considered

No serious contender.

### Next.js SSG

In Next.js, SSG is an afterthought. And an [advanced feature](https://nextjs.org/docs/advanced-features/static-html-export).

I already have to deal with this monster at work and I don't need the whole React stack for this web site, anyway, as I want to focus on content and IA, not interaction.

So, not dissing, Next.js is amazing and does the job well. At work.

### Gatsby

Gatsby was already bloating 3 years ago. Plus, I still don't find the GraphQL indirection comfortable.

> You’ll learn in this guide how Gatsby’s automatic GraphQL Typegen feature ...

No thanks.
