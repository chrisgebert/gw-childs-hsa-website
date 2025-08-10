---
title: Newsletter
layout: layouts/page.njk
lang: en
---

# Sign up for our newsletter!

<form
  action="https://buttondown.com/api/emails/embed-subscribe/gwchildshsa"
  method="post"
  target="popupwindow"
  onsubmit="window.open('https://buttondown.com/gwchildshsa', 'popupwindow')"
  class="embeddable-buttondown-form"
>
  <label for="bd-email">Enter your email</label>
  <input type="email" name="email" id="bd-email" />
  
  <input type="submit" value="Subscribe" />
</form>

Subscribe for updates on the following and more!

<div class="image right"><img src="/assets/images/IMG_7072.jpg"></div>

- Project Updates
- Requests of the Community
- Meeting Notes

*Looking to get involved? [Contact us]({{ '/pages/contact/' | locale_url }}) to find out how you can volunteer.*

## Recent posts

{% set recentPosts = collections.posts | reverse %}
{% for post in recentPosts.slice(0,15) -%}
  * [{{ post.data.title }}]({{ post.url | locale_url }}) <br />
{% endfor %}

#### [Read more...]({{ '/pages/newsletter-archive' | locale_url }})
