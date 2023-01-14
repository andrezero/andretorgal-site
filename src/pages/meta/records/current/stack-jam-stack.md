---
layout: ../../../../templates/MetaPage.astro
type: decision
title: 'Stack: SSG with Jamstack'
tags:
  - jam-stack
published: 2019 May 16
---

## Decision: Static website + Jamstack build

> [Jam Stack](https://jamstack.org/) is an architectural approach that decouples the web experience layer from data and business logic, improving flexibility, scalability, performance, and maintainability.
> Jamstack removes the need for business logic to dictate the web experience.
> It enables a composable architecture for the web where custom logic and 3rd party services are consumed through APIs.

Such fancy words :-D but what's not to like?

In the end, it's K.I.S.S. all the way, like the old school peeps always said it was.

**Note:** I wrote about this in [Static Site Generators: A Brief History](/posts/2019-06/static-site-generators-brief-history).

## Why

- full HTML static rendering
- ~~scss~~ pure CSS
- strict typescript
- markdown + MDX
- prefetching
- explicit data & code splitting
- full, unmediated control of SEO, layout,
- easy to add features, such as responsive images, RSS, ...
- simple deployment
- ~ zero operation costs

And because back in 2006, the folks were right about all this.

## Other options considered

:lol:

## Details

Which one? Well [it's Astro all the way](/meta/records/pending/rebuild-with-astro).
