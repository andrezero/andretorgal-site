---
layout: ~/templates/BlogPost.astro
type: post
title: From generative UX writing to startup as a service
tags:
  - generative-design
  - ux-writing
  - artificial-intelligence
draft: true
published: 2023 Mar 20
---

<Abstract>

You certainly heard the take that AI will makes us work faster and better, and if we adapt and learn how to write better prompts. But the job of writing prompts can also be automated and can be learned.

Can the state of AI and APIs of today already be combined to model, automate, and replace humans in the entire digital product and UX/UI engineering space?

</Abstract>

## Imagine I need to write some copy

It's for my website.

The website is for our bike rental service. With our service, our customers can quickly find a bike near them, unlock it, ride for a maximum of 30 minutes, and then park it on the docking station closest to their destination. Our regular customers pay a fixed amount per ride. Basic subscribers to our service pay $30 per month and can ride 10 times a day for free.

We are launching a new Premium subscription tier where customers pay $60 per month and can ride any number of rides per day and park the bikes anywhere they want.

The copy is for a new page that will be shown only to subscribers of the Basic tear and the goal is to have as many as possible convert to Premium subscribers.

I need 5 different options for a content module that combines headings, subheadings, and bullet points, always with one call to action. The action will take the customers to a page with more information about the Premium tier and the option to confirm the upgrade.

---

I don't own or work for a bike rental service and the above is just a thought exercise.

I pasted all of the above :point_up: in ChatGPT and I got:

> Sure! Here are 5 different options for your content module

And indeed, there were 5 different options.

```
## Option 1:

Heading: Upgrade to Premium and Ride without Limits
Subheading: Enjoy the Ultimate Bike Rental Experience

With Premium, you can
- Ride as many times as you want
- For as long as you want
- Park anywhere, anytime
- No more worrying about exceeding the 30-minute time limit

Upgrade now to unlock the full potential of our bike rental service.

Button: Upgrade to Premium

## Option 2:

Heading: Ride More, Pay Less with Premium
Subheading: Get the Most Out of Your Bike Rental Service
...
```

## Content design

Content design is both a concern for UX writing and UI designers. Defining the format and structure, goes hand-in-hand-in-hand with defining the goal, and the message, and picking the actual words. If you want to learn more about this, I suggest watching [UX writing step by step](https://www.youtube.com/watch?v=x5WQUeEe_wE), an awesome workshop by Noah, _for writers, designers and beyond_.

ChatGPT seems to be refusing to play use different structures. It's clearly good with words, and arguably even inventing the whole message, it's not even shy to

At some point I asked it simply to promote my referral program, without any boundaries or context, and it decided on rules, benefits, percentages, the works. Trained on typical discount referral programs it went straight for 10% and when I asked I corrected that it was cash-back program, it went straight to "$50 off your next purchase". :rolling

Even when asked to produce options with some variance, it still used the same heading + subheading + question paragraph + 4 bullet points + another paragraph + CTA.

> Write 3 more options that use different content structures: choose between different number of paragraphs and different number of bullet points.

I had to add an extreme constraint to have it drop the bullet points.

> Write 1 more option with less than 40 words.

My typical reflex is to [treat it like a shy or stubborn human](https://en.wikipedia.org/wiki/Anthropomorphism). But the machine is just spitting out what it learned form the internet. So there's no guarantee that questions answered with bullet points are always the most effective structure for a certain content block. And 10% or $50 might as well be the least performant parameters of typical referrals programs. For the AI, it's nothing but tokens commonly occurirring in the data it was fed.

## Constraints

> Write one more option using maximum 10 words

```
Heading: Refer. Save. Eat healthy.
Refer now and save on organic vegetables!
CTA:
```

> write one more option using maximum 3 words

```
Heading: Refer, Save, Enjoy.
CTA: Refer and Save!
```

> write one more option using maximum 1 word

```
Heading: Refer.
CTA: Refer Now!
```

## Context switching

> imagine a whole new startup

```
Sure! What type of startup is it? What's the product or service it offers? Let me know and I'll do my best to help you come up with some ideas for its website copy.
```

> Forget about it, let's go back to the bike rental website

```
Sure, what do you need help with for the bike rental website?
```

## From the top: values, styleguide, tone of voice

Our brand makes our customers feel free and powerful because they can get anywhere in their city faster than anyone else.

Our brand also resonates with feelings of eco-consciousness and our customers enjoy the feeling of saving the planet by not taking a more polluting mode of transportation

Have in mind our main persona: young adults with a busy work and social life that need to commute fast between home, work and social gatherings

Our tone voice is joyful, energetic, and witty

Our style-guide enforces all caps headings and full stops on bullet points

> Write my another option for the upgrade to Premium copy. Use to 80 words. Take into account our brand motto, our target audience and our tone of voice and writing styleguide.

```
Heading: UPGRADE TO PREMIUM AND RIDE FREE

Subheading: Unlimited Rides, Unlimited Adventure

Get ready to take your bike rides to the next level with our Premium subscription?

- Ride as much as you want
- Wherever you want
- Feel the power of freedom.

You'll be doing your part for the planet by choosing a greener mode of transportation. Our subscription is perfect for busy young adults like you, who need to get around fast without sacrificing style. So why wait? Upgrade now and experience the joy of unlimited adventure!

Upgrade to Premium now and start your unlimited adventure!
```

## Visual design

TODO

## In visionary terms, everything can be automated

With AI working at this level, a rather thin layer can model the context, these structures and enforce them via more specific prompts.

- vision and mission
- brand values, archetype,
- tone of voice and styleguide
- content block templates

Services like TODO and TODO are already abstracting these templates and structures, providing a rather thin contexts, channels. Let's call it MVP. I am sure they're getting some traction.

In visionary terms, this layer can provide context and templates for specific scenarios, specific channels and platforms, in order to speed up the copy writing and even the visual design process:

1. define business context
2. create campaign
3. generate emails, content blocks, adds
4. send, experiment, measure, scale
5. observe, measure, iterate

> Design 5 options for an email campaign promoting our new

// TODO

Not only these steps can also be provided via APIs, the whole deployment, measurement and iteration can be automated via already existing APIs for cloud services, advertisement, email, and other channels.

Beyond the purely digital world, very real and physical activities such as logistics and fulfillment are being automated and exposed as programatic APIs.

Analytics, marketing optimisation, customer insights, logistics,

A bit further down this road,

> make me website now

1. define business context
2. define design system principles
3. generate design system
4. generate website
5. launch

And you can then sit and watch the dashboards while it starts spamming, acquiring push a few buttons now and then to course correct.

SimStartup.
A bit like playing SimCity or City Skylines.
