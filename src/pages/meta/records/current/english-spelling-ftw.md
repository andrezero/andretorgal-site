---
layout: ../../../../templates/MetaPage.astro
type: decision
title: Re-build with Astro
description: I have been playing with Astro for a while now. I am confident this is the static site generator I have always been looking for.
tags:
  - language
  - andretorgal-com
links:
  - type: software
    name: Spell Right
published: 2023 Jan 02
---

## Why

- Support for en-gb in tools is sometimes lacking
- It's frustrating to have the red underline.
- I honestly prefer english spelling. `realising` over `realizing` and `neighbour` over `neighbor`. And many more.

## Decision: stick to _English_, use a spelling extension

- Stick to :uk-flag: English like a stickler.

- Use VS Code extension [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright) because
  - fast: tested on huge documents with thousands of spelling errors
  - entirely offline :notbad:
  - good UX: `CMD+.` -> suggestions (multi-lingual) and add to dictionary
  - easy to track dictionaries and separate user and workspace dictionaries

## Curious note

:explode: everyone but Cambridge seems to think that trade-off should be spelled _trade-off_ and not _tradeoff_:

- [Cambridge: tradeoff](https://dictionary.cambridge.org/dictionary/english/trade-off)
- [Oxford: trade-off](https://www.oxfordlearnersdictionaries.com/definition/english/trade-off_2?q=tradeoff)
- [Merriam Webster: trade-off](https://www.merriam-webster.com/dictionary/trade-off)
- [macmillan: trade-off](https://www.macmillandictionary.com/dictionary/british/trade-off_2)
- [Collins: trade-off](https://www.collinsdictionary.com/dictionary/english/trade-off)

The free dictionary believes both [tradeoff](https://www.thefreedictionary.com/tradeoff) and [trade-off](https://www.thefreedictionary.com/trade-off) are the same thing, and both equally :uk-flag: and :en-flag: ... :sweatsmile: