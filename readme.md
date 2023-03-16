# Spacemesh

> Static website for spacemesh.io


## Introduction

Welcome to the updated Spacemesh website! This site is currently live at spacemesh.io. All changes to content are managed through the [Forestry CMS](https://forestry.io/). More information is available below.


### Content Manager Guide

#### TLDR: How to publish a Blog Post

- Login to Forestry and access the correct branch of spacemesh.
- Go to `Blog Posts` from the sidebar, and click `create new`.
- Set DRAFT to OFF and run the preview to ensure it works; repeat as necessary.
- Hit save and wait for the site to build. This can take a few minutes.

> **Hint:** Content can also be added and editied directly in the markdown files. Since it's a static site you have no CMS vendor lock-in. Everything is stored in plain markdown.

> **Hint:** Hugo has a few built in embed features for Vimeo, tweets and YouTube. [See the full list here](https://gohugo.io/content-management/shortcodes/)

#### Arley Links

Use the following snippet to create links that opens Arley and explain a term:
```html
<a href="#term:satoshi">Satoshi's</a>
```
In this case `satoshi` is the URL encoded version of the `term` title.

If you're writing markdown use the following syntax:
```markdown
[Satoshi's](#term:satoshi)
```


#### Markdown Snippets

To insert videos into blog post use the following snippets.
```
{{< youtube YOUTUBEID >}}
```

You can also insert vimeo:
```
{{< vimeo VIMEOID >}}
```

[Find more snippets](https://gohugo.io/content-management/shortcodes/)


#### Aliases

You can create [aliases](https://gohugo.io/content-management/urls/#example-aliases) and redirect blog posts and pages in the front-matter by adding the folllowing:

```
aliases = [
    "/a-new-genesis"
]
```

---

## Developer Guide

 ### Technologies Overview
 - Typescript
 - SCSS
 - Netlify Functions (Crypto News API Proxy)
 - Hugo (Static Site Generator)
 - Forestry CMS (Optional)

The website is build in vanilla JavaScript and does not bundle any frameworks.
Animations and transitions are easier to work with when you have full control over the development stack.


### Getting Started


#### Install

Hugo is the static site geneartor used to build and bundle the website from Markdown into HTML. Install Hugo to get started:

[Install Hugo](https://gohugo.io/getting-started/installing/)

`brew install hugo`

Once hugo is installed, `cd` into the project root and install JavaScript dependencies:

`npm install`

#### Development

To run a local Hugo development server:
`npm run dev:hugo`

To also do type cheking while developing run the following command in a different terminal concurrently:
`npm run dev:ts`

#### Build

To build the site run:
`npm run build`

This will output the compiled static site in a folder called `public`.

> **Note:** The site is automatically build and deployed when pushed to the mani branch on GitHub.

To see more commands look at the `scripts` property in `package.json`.


### Deployment

The project is automtiaclly build and published on each commit to master.
This is handled by Netlify hooks.

Remember to define the `CRYTO_TOKEN` envrionment variable in Netlify. This is used in the Crypto News widget.


### Projcet Overview

Below is filetree only highlights the folders of importance.

```
community-website/
├─ .forestry/        # CMS front-matter templaltes
├─ api/              # Netlify functions. Contains the news endpoint
├─ assets/           # Source TypeScript and SCSS.
│  ├─ js/            # TypeScript files
│  │  ├─ app.ts      # Main TS entry point
│  │  ├─ behinds/    # Easter Egg modules
│  │  ├─ blocks/     # Widgets
│  │  ├─ components/ # Global, reusable components
│  │  ├─ global/     # Shared classes. Config, types, constants etc.
│  │  ├─ overlays/   # Arley, Video Player etc.
│  │  ├─ pages/      # Pages that need custom JS
│  │  ├─ utils/      # Helper classes, such as math functions.
│  │  ├─ webgl/      # Fluid simulation
│  ├─ style/         # Mirror js structure but with SCSS/styles
├─ content/          # Markdown content.
├─ data/             # Global configuration files
├─ layouts/          # Templates used to render from Markdown to HTML
│  ├─ partials/      # Contains reusable templates for blocks/widgets
│  ├─ ...
├─ static/           # Static assets (Images, etc.)
```

Most development will happen inside `layouts` and `assets`.

**Relevant dev resources:**
- https://forestry.io/docs/settings/front-matter-templates/
- https://gohugo.io/documentation/
- https://docs.netlify.com/functions/overview/
- https://docs.netlify.com/domains-https/custom-domains/


## Copyright
© Spacemesh 2021


```
       __
      / \`\          __
      |  \ `\      /`/ \
      \_/`\  \-"-/` /\  \
           |       |  \  |
           (d     b)   \_/
           /       \       -----------------------
       ,".|.'.\_/.'.|.",   S P A C E M E S H . I O
      /   /\' _|_ '/\   \  -----------------------
      |  /  '-`"`-'  \  |
      | |             | |
      | \    \   /    / |
       \ \    \ /    / /
        `"`\   :   /'"`
            `""`""`
```

*Happy Hacking!*