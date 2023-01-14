---
layout: ../../../../templates/MetaPage.astro
type: decision
title: 'Router: React Router'
tags:
  - react-router
published: 2019 May 16
---

##

## Decision: remove `reach-router` and replace with `react-router`

## Why

- `reach-router` _divitis_ is unacceptable

## Trade-offs

- because now using `react-router` instead, need to implement accessible routing by hand

## Read more

- `@reach/router` issues
  - [provide a way to disable rendering `div` for Router](https://github.com/reach/router/issues/63)
  - [provide a way to disable rendering `div` for Router](https://github.com/reach/router/issues/105)
  - `react-static` interfering with `@reach/router` set focus, opened an [issue here](https://github.com/nozzle/react-static/issues/1147)
