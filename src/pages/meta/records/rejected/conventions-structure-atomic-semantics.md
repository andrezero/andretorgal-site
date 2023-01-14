---
layout: ../../../../templates/MetaPage.astro
type: decision
title: 'Coding Conventions: Group code by module / atomic-ish semantics'
tags:
  - atomic-design
published: 2019 May 16
---

@todo: Rejected by "group components by how they are used"

## Details

- elements, blocks, groups, templates and behaviours (instead of atoms, molecules, ...)
- see [docs/project-structure](/meta/docs/project-structure#atomic-ish-semantics-translated-to)

## Why

- pedantic
- atomic-ish design system
- clearer module boundaries
- segregate shared components and utils from specific domains

## Trade-offs

- ugly enterprise import statements
- even uglier with all the `../../` (typescript was struggling with aliases)