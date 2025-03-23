---
title: Newsletter
layout: layouts/page.njk
lang: en
---

# Sign up for our newsletter!

[Subscribe here](https://buttondown.com/gwchildshsa#subscribe-form) to updates on the following and more!

<div class="image right"><img src="/assets/images/IMG_7072.jpg"></div>

- Project Updates
- Requests of the Community
- Meeting Notes

*Looking to get involved? [Contact us]({{ '/pages/contact/' | locale_url }}) to find out how you can volunteer.*

## Recent posts

{% set recentPosts = collections.posts | reverse %}
{% for post in recentPosts.slice(0,5) %}
   * [{{ post.data.title }}]({{ post.url | locale_url }})
{% endfor %}

#### [Read more...]({{ '/pages/newsletter-archive' | locale_url }})
