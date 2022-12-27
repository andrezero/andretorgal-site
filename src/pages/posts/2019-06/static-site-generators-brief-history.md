---
layout: ../../../templates/BlogPost.astro
type: post
title: 'Static Site Generators: A Brief History'
tags:
  - static-websites
  - web-history
  - server-side-rendering
published: 2019 Jun 02
---

Hype keeps building up around [static site generators](https://www.google.com/search?q=best+static+site+generator+2019). But this approach has been around for much longer than most people think. Our industry's collective memory is very short, and it sometimes needs a little help. Maybe I can also conclude something about the hype itself, but don't get your hopes up, this is more of a story than anything else.

---

In the beginning the whole web was [static](http://info.cern.ch/). Then there was [CGI](https://en.wikipedia.org/wiki/Common_Gateway_Interface). Webmasters could now stitch together some dynamic rendering, as well as respond to forms posted by users.

In less than 3 years, CGI evolved into a panoply of [glue languages](https://en.wikipedia.org/wiki/Scripting_language#Glue_languages) developed exclusively for this purpose - e.g.: ColdFusion, PHP, Ruby, ASP, JSP - or quickly adapted to it - e.g.: Perl, Python.

## The golden age of MVC

With the rise of these scripting languages, application servers, and the free relational databases - free as in free beer! - [dynamic server-side rendering](https://dev.to/sunnysingh/the-benefits-and-origins-of-server-side-rendering-4doh) went from being the next big thing to completely taking over the landscape, all in a couple of years.

At some point, MVC was everywhere, and OO was the craft. And with them, a hundred frameworks written in ColdFusion, PHP, Ruby, Python, Java, and .Net. Soon enough, the scene matured into CMSs of all sizes and flavors. Here's an article from 2007 about the [history of the dynamic web](https://royal.pingdom.com/a-history-of-the-dynamic-web/) for a bit of perspective, from deep within the bubble.

## Actually, the dark age of MVC

When I joined [SAPO](https://www.sapo.pt/) in 2008 I had totally jumped on the MVC framework bandwagon and I didn't really know better. A single code base, a _monolith application_ for several interfaces - public website, rss, atom, back office. We had reached peak design patterns, maximum reusability, and couldn't even sense the smell.

![The hammer/nail quote comes later. Leo Moko on Unsplash https://unsplash.com/photos/B4YHKz6lLrQ](./blog/hammer-by-leo-moko.jpg)

Unfortunately, yet not surprisingly, these _database driven websites_ were not scaling that well. Don't get me wrong, they were dealing with complexity pretty fine, consuming and producing a variety of services, plugged into offline distributed processes, brokers, full-on SOA, the works.

Run-time, though, writes and reads were competing for stretched out DB servers, and in order to keep the latency at acceptable levels, and to serve the apps with decent availability the operational costs were spiking. Blinded by the automagical lights, we were categorizing all the challenges under _optimise this later_. Caching partials and responses, abusing cache farms, replicating the DB, micro optimising code, ... Plenty of technical solutions evolving, but at what cost?

## Rendering like rebels

Meanwhile, back to SAPO, the older crew there, thought differently.

These were a bunch of very talented engineers, and a handful of legend level Perl and C developers, that had built a network of hundreds of large scale, _high traffic, high availability websites_, among so many other things, like dozens of mobile apps and even [sending tech to space](http://makerfairelisbon.com/en/2014/07/16/spacebits.html) just for fun.

So how did they think differently from the predominant MVC doctrine? Quite simple. First: _pre-rendering all the static content_, and serving pure html+css. Second: _a layer of client-side progressive enhancement_, rendering the user aware content, such as comments, ratings, favorites, directly in the browser. Sounds familiar?

Whenever an editor published something on their CMS, entire websites or sections, were re-generated. After all, these back offices had like 2 journalists and an intern doing most of the writes. While the actual websites had millions of users doing all the reads and, only occasionally, an interaction.

What was going on here? How could a bunch of disconnected perl scripts be better, faster, and cheaper than the elegant, modular, extensible approach? Turns out pre-rendering, or pre-burning, "queimar" in Portuguese, _materializing the end user state_ as soon as the source data was updated, wasn't even news in 2008. If you read the first section above, it was the actual origin story of the dynamic web. It had already been around for 10 years.

## The plot twist we deserved

Meanwhile, the web-standards movement was striking win after win. With Firefox and Chrome, the browser was becoming a viable application platform, and client-side rendering, beyond the initial AJAX hacks, was becoming a believable idea.

Suddenly, the paradigm was shifting. Along came NodeJS, the NoSQL movement, and a _massive simplification of the application server_ approach. Ditch relational and transactional where you actually don't needed it. Embrace REST, eventual consistency, schemaless, streams, client-side rendering, and much more long awaited techniques. Looked like we now had more options and combining the best of both (all) worlds would be the sensible thing to do.

But it is not surprising that the new bandwagon and its rising tide of followers was riding fast and furious as far away as possible from its starting point. The past is wrong and all prior art needs to be forgotten! Rewrite all the things! Let's now _over engineer all things front-end_ because we can!

Fast forward to 2013: we now have ES6, javascript build tools, Webpack, the NPM ecosystem and a new framework war fueled by Google and Facebook. Suddenly every project must be built as a front-end rendered single page application. Every startup is now hiring the new breed: the _full stack developer_, a.k.a. let's just use Javascript everywhere for everything. So, what's next? [Javascript fatigue](https://www.rtorr.com/on-javascript-fatigue/), [Javascript framework fatigue](https://allenpike.com/2015/javascript-framework-fatigue), and more [Javascript fatigue](https://ericclemmons.com/blog/javascript-fatigue).

The new problem to solve? [Overcoming javascript framework fatigue](https://teropa.info/blog/2015/07/15/overcoming-javascript-framework-fatigue.html). How did this happen? Did we stop to consider the implications? Were we leveraging all the options? Combining the best of each technology to solve the different problems with the right tools?

![It breaks the egg, right? on Pixabayhttps://pixabay.com/photos/weakness-hammer-crush-egg-eggshell-314401/](./blog/hammer-and-egg-pixabay.jpg)

When everything you ~~have~~ WANT TO USE is a hammer, everything looks like a nail. Landing page? SPA! personal website? SPA! newspaper? SPA! e-commerce? SPA! dating app for lonely pets? SPA! SPA! SPA! _SPA! is the new hammer and it makes the most lovely sound_.

## History repeats itself

Long story long, welcome to 2019. People are writing posts [explaining SSG](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38) maybe ignoring that so much of the original web was built exactly that way. Somewhere else, someone is [making the case for static site generation](https://davidwalsh.name/introduction-static-site-generators) every single day.

[Gatsby](https://www.gatsbyjs.org/), [React Static](https://github.com/react-static/react-static/), [Next.js](https://nextjs.org/) are all the rage. But to be fair to prior art, in the early 2010s, projects like [Jekyll](https://jekyllrb.com/) then [Hugo](https://gohugo.io/) were already getting a lot of traction in some circles and paved the way for [so many SSG options we have now](https://www.staticgen.com/). They are unfortunately not written in everyone's love/hate scripting language, but in Ruby and Go, respectively.

> Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organisation sites. Think of it like a file-based CMS, without all the complexity.

_Circling back to the whole point of this post._ If you do a quick search for "static site generation" pre 2000s you can find gems like this paper on [Tools and Approaches for Developing Data-Intensive Web Applications: a Survey](http://webml.deib.polimi.it/upload/ent5/1/CompSurvey.pdf), all the way back in 1998.

> An orthogonal architectural issue concerns the time of binding between the content of the information base and the application pages delivered to the client, which can be static when pages are computed at application definition time and are immutable during application usage; or dynamic, when pages are created just-in-time from fresh content.

Do we already know better than letting the bandwagon mentality shoot us again with the new silver bullet? Are we going to make everything static site generated like we did with SPAs? Probably not. But if we don't stop obsessing (and click-baiting) about whether or not SSG is _paradigm of the year_ we will do a lot of damage to projects, businesses, and users.

We have to be a bit less excited about the present and contemplate prior art as well. Better decisions are taken when considering all the options. And the next next big thing will always be a smart mashup of a few old things.

## Conclusion

There has never been a more _exciting time to develop for the web_. We have the codebase, the tools, and the infrastructure to design, develop, and deploy faster, better than ever. And also options: modern SPAs, dynamic SSR, isomorphic rendering, serverless architectures, and more recently SSG.

![Know your tools Leo Moko on Unsplash https://unsplash.com/photos/NL_DF0Klepc](./blog/tools-by-cesar-carlevarino-aragon.jpg)

And it's never been easier to _mix and match all these ingredients_ in secure, reliable, and cost-effective ways. Technologically, the entire web landscape has changed 5 times over and we are being gifted with all this potential under open source licenses for our fun and profit.

We all - developers, teams, companies - just need to take a step back sometimes, and appreciate the options. Learn a bit about the techniques we understand the least and remember that the best solutions are almost always the result of combining different tools.
