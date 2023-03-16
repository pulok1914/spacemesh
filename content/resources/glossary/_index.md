---
title: "Glossary"
outputs: ["json"]
url: "/glossary.json"
# Do not render subpages for the FAQ
# https://gohugo.io/content-management/build-optionslisting-pages-without-publishing-them
# section build options:
_build:
  render: true
# children build options with cascade
cascade:
  _build:
    render: false
    list: true # default
---
