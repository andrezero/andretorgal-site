---
layout: ../../../../templates/MetaPage.astro
type: decision
title: 'Theming: css variables, globals & locals'
tags:
  - css
published: 2019 May 16
updated: 2023 Dec 20
---

## Decision: pure CSS

### Why

- pure CSS for theming
- :heart: simple, beautiful
- see implementation details in [Styling](/meta/docs/styling).

## History

This was previously adopted in 2019 for the [previous version of this website](/meta/records/rejected/react-static).

At the time there were some **trade-offs**:

- super involved, some significant SCSS cruft
- it's a progressive enhancement, not fully polyfilled at the moment, but fallbacks are always provided
