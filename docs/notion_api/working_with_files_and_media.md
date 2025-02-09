---
meta_tags:
  childrenProjects: '[{"subdomain":"notionapi","subpath":"","name":"Notion API","_id":"6038057d9c4b200067ba3c9a"}]'
  description: Learn how to add or retrieve files and media from Notion pages.
  hasOneChild: ''
  loadedProject: notionapi
  og:description: Connect Notion pages and databases to the tools you use every day,
    creating powerful workflows.
  og:image: https://files.readme.io/a507683-developer-portal-meta.png
  og:site_name: Notion API
  og:title: Start building with the Notion API
  parentProject: notion-group
  readme-deploy: 5.274.0
  readme-subdomain: notionapi
  readme-version: '1'
  siblingProjects: '[{"subdomain":"notionapi","name":"Notion API","_id":"6038057d9c4b200067ba3c9a"}]'
  twitter:card: summary_large_image
  twitter:description: Connect Notion pages and databases to the tools you use every
    day, creating powerful workflows.
  twitter:image: https://files.readme.io/a507683-developer-portal-meta.png
  twitter:title: Start building with the Notion API
  viewport: width=device-width, initial-scale=1.0
scraped_at: '2025-02-05T17:32:52.325271'
title: Working with files and media
url: https://developers.notion.com/docs/working-with-files-and-media#retrieving-files-and-media-via-the-notion-api
---

## Get started

* [Notion API Overview](/docs/getting-started)
* [Authorization](/docs/authorization)
## Data APIs

* [Working with page content](/docs/working-with-page-content)
* [Working with databases](/docs/working-with-databases)
* [Working with comments](/docs/working-with-comments)
* [Working with files and media](/docs/working-with-files-and-media)
## Integrations

* [Build your first integration](/docs/create-a-notion-integration)
## Link previews

* [Introduction](/docs/link-previews)
* [Build a Link Preview integration](/docs/build-a-link-preview-integration)
## Resources

* [Example code](https://notionapi.readme.io/page/examples)
* [Postman workspace](https://www.postman.com/notionhq/workspace/notion-s-api-workspace)
# Working with files and media

Learn how to add or retrieve files and media from Notion pages.

 [Suggest Edits](/edit/working-with-files-and-media)## Overview


Files, images, and other types of media are used throughout Notion to bring your pages to life. Files and media can be found in page covers, page icons, media blocks, and file properties in databases. 


In this guide, you’ll learn about how files and other types of media are represented in our API and what you can do with them.


## Files and media stored and hosted externally (Recommended)


Users can add externally hosted files and other media to Notion using the API. The developer is responsible for the asset and making it available via a secure URL.


### Add files and media via the Notion API


For details on how to add externally hosted files and media to a page or database, reference to [the API reference](/reference/file-object#external-file-objects).


### Retrieving files or media via the Notion API


In the API, files and media types are referenced by the source URL that points to where the file is stored. The source URLs for these files can be statically referenced.


## Files and media hosted by Notion


Users can upload files and other media directly to Notion [using the UI](https://www.notion.so/help/images-files-and-media). Files uploaded in this manner are stored on Notion S3 instance and access to the file is hosted by Notion. 


### Uploading files and media via the Notion API


The API currently does not support uploading new files.


### Retrieving files and media via the Notion API


In the API, files and media types are referenced by the public URL that points to where the file is stored. 


Each time a database or page is queried, a new public URL is generated for all files hosted by Notion. The public URLs are updated hourly and the previous public URLs are only valid for one hour. The exact time when the URL will expire can be found in the `expiry_time` property of the file object.


Since the public URLs expire hourly, they shouldn’t be statically referenced. If the public URL is directly referenced, the file will not be accessible at that URL after the expiration time is reached and a new URL must be retrieved via the Notion API.


Example file object hosted by Notion
```
{
	"url": "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9bc6c6e0-32b8-4d55-8c12-3ae931f43a01/brocolli.jpeg?...",
	"expiry_time": "2020-03-17T19:10:04.968Z"
}
//Sid Verma

```
Updated 6 months ago 



---

* [Table of Contents](#)
* + [Overview](#overview)
	+ [Files and media stored and hosted externally (Recommended)](#files-and-media-stored-and-hosted-externally-recommended)
		- [Add files and media via the Notion API](#add-files-and-media-via-the-notion-api)
		- [Retrieving files or media via the Notion API](#retrieving-files-or-media-via-the-notion-api)
	+ [Files and media hosted by Notion](#files-and-media-hosted-by-notion)
		- [Uploading files and media via the Notion API](#uploading-files-and-media-via-the-notion-api)
		- [Retrieving files and media via the Notion API](#retrieving-files-and-media-via-the-notion-api)
