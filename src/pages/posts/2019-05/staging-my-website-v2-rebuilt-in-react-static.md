---
layout: ../../../templates/BlogPost.astro
type: post
title: Staging My Website V2 Rebuilt In React Static
tags:
  - static-websites
  - react-static
  - cloudfront
  - backlog
  - andretorgal-com
published: 2019 May 23
---

Today my website V2 is uploaded to https://staging.andretorgal.com/.

What is happening, what is new, and what comes next.

---

Finished porting my website to React Static. Yay! But More importantly, today I setup S3 and Cloudfront to serve the static site under HTTPS.

I would love to say I had it all done in 1 hour, thanks to nice guides like this one: [Hosting Static React Websites on AWS S3 (& CloudFront) with SSL
](https://hackernoon.com/hosting-static-react-websites-on-aws-s3-cloudfront-with-ssl-924e5c134455). Unfortunately, the AWS experience is not the best so things got complicated a few times.

## AWS UX Sucks

[FREE! SSL certificates](https://hackernoon.com/getting-a-free-ssl-certificate-on-aws-a-how-to-guide-6ef29e576d22). Tricky. For some reason, to use AWS Certificate Manager with Cloudfront, you must [request the certificate in US East (N. Virginia)](https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html). That's `us-east-1` region. _Go figure_.

Serving the static `posts/index.html` page for requests like `/posts` or `/posts/` is trivial for S3 buckets with the website hosting feature enabled. But for yet another unimaginable reason, when you select the S3 origin for your Cloudfront distribution, you need to [manually type the "S3 website" endpoint](https://aws.amazon.com/premiumsupport/knowledge-center/s3-website-cloudfront-error-403/) instead of picking the suggested endpoint from the dropdown. Otherwise Cloudfront will always return a 403 with some sexy XML instead of the static page. _Go figure_.

![do not pick one from the list](/media/blog/2019-05/do-not-pick-one-from-the-list.jpg)

My initial strategy for keeping staging and production segregated also fell apart. _Another step, another bummer_, classic AWS experience. This time, [this issue (bug?) in S3 + Cloudfront integration](https://stackoverflow.com/questions/35427661/subfolder-redirect-issue-with-static-website-hosting-using-s3-cloudfront-and-or) does not allow pointing different distributions to same bucket plus path prefixes. _Go figure_.

To wrap this up, in order to redirect a legacy `www.andretorgal.com` to `andretorgal.com`, both under http and https, I followed the [official documentation for redirecting dns queries](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/tutorial-redirecting-dns-queries.html). A simple 7 step process: setup a CNAME in Route 53 pointing to a transparent Cloudfront distribution with an associated SSL certificate and http/https redirection, with origin in an empty S3 bucket with website hosting enabled and, finally, a domain redirection. Out of breath.

![fugly 403](/media/blog/2019-05/fugly-four-o-three.jpg)

Of course, it didn't work. _Go figure_.

With all the time wasted trying to solve all these puzzles and reconfiguring everything from scratch 3 or 4 times, at this point, the question is why do I insist in staying in AWS at all. _Go figure_.

## Controlling cache with Cloudfront and S3

Another challenge was to decide _what to cache and for how long_. The site has no service worker, so I'm looking only into caching static html files, `main.js` & `main.css`, and the React Static `routeInfo.json` files. Since `main.js` and `main.css` are hashed with each build, it's ok to load a stale `index.html` page here and there, since it will still be able to load the corresponding app version.

The failure mode, in this case, is loading a more recent `routeInfo.json` to navigate to another page, and running into a payload that is incompatible with the loaded app version.

Implementing the cache strategy was quite easy, by setting the headers straight in the S3 bucket objects, when syncing build and statics. With the help of this [caching best practices guide](https://jakearchibald.com/2016/caching-best-practices/) and this [AWS S3 sync gist](https://gist.github.com/kevindice/87ee5ffca9523810253de3d9a41c3ae5),

Hopefully, I got this right. But I'm not even going to double check. At this point, I'm just suffering AWS fatigue and want to go back to play with the interesting stuff.

Finally, [configuring robots.txt and meta tags](https://www.polemicdigital.com/protect-your-staging-environment to _keep search engines from indexing staging_ is tricky, and might not work as expected. I'll have to keep an eye on what's being indexed to make sure I don't screw this up.

## Next

Need to make sure I keep my Cloudfront bills in check, so [compression in cloudfront](https://medium.com/faun/this-is-how-i-reduced-my-cloudfront-bills-by-80-a7b0dfb24128) is top priority.

For now, the entire `dist/` is synced up to S3 in a few seconds. I couldn't be happier with this. But _continuous integration and deployment_ will help focusing more on authoring and experimentation.

## Later

Publish my "design system". Get it up with [Storybook](https://storybook.js.org/use-cases/) first, then suit it up. Thank you [Hanseo](https://medium.com/@hanseopark) for the tips. I'll be glad to pay you back helping you out of Medium ;-)

![plenty of features to come](/media/blog/2019-05/andretorgal-com-next.jpg)

Plenty of other [features, fixes and tweaks](/meta/project/backlog) to develop.

And a lot more content.
