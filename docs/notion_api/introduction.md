---
meta_tags:
  childrenProjects: '[{"subdomain":"notionapi","subpath":"","name":"Notion API","_id":"6038057d9c4b200067ba3c9a"}]'
  description: This guide introduces Link Previews, how they work, and what you need
    to build them.
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
scraped_at: '2025-02-05T17:31:56.192641'
title: Introduction
url: https://developers.notion.com/docs/link-previews#link-preview-integration-resources
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
# Introduction

This guide introduces Link Previews, how they work, and what you need to build them.

 [Suggest Edits](/edit/link-previews)A Link Preview is a real-time excerpt of authenticated content that unfurls in Notion when an authenticated user shares an enabled link. Instead of logging in to multiple tools at a time, collaborators can use Link Previews to centralize their work in Notion. 


![1440](https://files.readme.io/a9a8a31-link_unfurling_v2.gif "link_unfurling_v2.gif")An example Link Preview for a GitHub workflow


With the Link Previews API, you can set up integrations that share a Link Preview for your product. For example: 


* Trello created a Link Preview that unfurls information about a linked task.
* Figma built a Link Preview that shares a linked board’s image preview and corresponding metadata.
* Amplitude created a Link Preview that shares a linked graph in an iFrame along with an interface to modify the graph.
* Slack built a Link Preview that unfurls a linked message’s content and author.


If your customers use Notion, then building a Link Preview can help them to integrate your product into their existing workflows.


## How Link Previews work


A user shares a Link Preview enabled URL. Notion detects enabled URLs based on the settings that you provide when you create the integration. If it’s the first time that a user has shared an enabled URL, then Notion kicks off an auth flow to authenticate with your service. After the user authenticates, Notion and your service exchange tokens that enable your integration to share a Link Preview in the user’s workspace. 


![1800](https://files.readme.io/e121163-lp_overview.png "lp_overview.png")A diagram of the Link Preview flow


Your integration also detects any changes to the data embedded in the Link Preview, and alerts Notion when the Link Preview needs to be updated. 


Notion alerts your integration when a Link Preview is deleted, so that your integration can stop listening for updates.


## Build your own Link Preview integration


Notion offers the tools for developers to build their own Link Preview integration to unfurl links for a specified domain.


![Anatomy of an unfurled link preview](https://files.readme.io/57f4b0d-Untitled_1.png)Anatomy of an unfurled link preview


Using the [Integration dashboard](https://www.notion.so/my-integrations) and Notion’s public API, developers can customize each section of a Link Preview to show relevant data to users.


### Link Previews vs. Embed blocks


If you have used [Embed blocks](/reference/block#embed) in Notion’s UI before, you may be wondering how Link Previews differ from them. Embeds allow Notion users to embed online content — such as a webpage, PDF, and more — directly in a Notion page. This allows users to preview the content without leaving Notion. 


Link Previews are similar but specifically allow developers to determine and customize the content displayed when an authenticated link is unfurled. Rather than embedding the full content of a webpage or file being shared, Link Previews pull data from a linked page and display it in an unfurled format that has been specified by the developer.


Since Link preview integrations require [OAuth 2.0](https://www.oauth.com/) authentication, unfurled link content will update as the data being shared updates. For example, if a GitHub pull request is shared as a Link Preview, the data displayed in the preview will update as the pull request updates (e.g. when it is merged).



> ## 📘
> 
> To learn more about Embed blocks, read our [reference docs](/reference/block#embed) and [Help Centre guide](https://www.notion.so/help/embed-and-connect-other-apps).
> 
> 


## Requirements for building a Link Preview integration



> ## 🚧
> 
> To build a Link Preview integration, developers must first apply for access to the feature through the [Notion Link Preview API request form](https://notionup.typeform.com/to/BXheLK4Z?typeform-source=developers.notion.com).
> 
> Additionally, all Link Preview integrations published for distribution require a review from Notion's platform and security teams.
> 
> 


In order to build Link Preview integrations, you need to meet the following requirements: 


* Support OAuth 2.0 in your application, or be ready to implement it.
* Own the domain that you’d like to set up with Link Preview enabled URLs.


If you meet these requirements and you’d like to start building with the Link Previews API, then please [request access](https://notionup.typeform.com/to/BXheLK4Z?typeform-source=developers.notion.com). 


## Next steps


To learn how to build your own Link Preview integration, read:


* [Build your own Link Preview integration](/docs/build-a-link-preview-integration) guide


## Link Preview integration resources


To learn more about Link Previews, see the following resources:


* [Build your own Link Preview integration](/docs/build-a-link-preview-integration) guide
* [API reference docs for the Link Preview unfurl attribute object](/reference/unfurl-attribute-object)
* [Help Centre](https://www.notion.so/help/guides/notion-api-link-previews-feature) guide
Updated over 1 year ago 



---

* [Table of Contents](#)
* + [How Link Previews work](#how-link-previews-work)
	+ [Build your own Link Preview integration](#build-your-own-link-preview-integration)
		- [Link Previews vs. Embed blocks](#link-previews-vs-embed-blocks)
	+ [Requirements for building a Link Preview integration](#requirements-for-building-a-link-preview-integration)
	+ [Next steps](#next-steps)
	+ [Link Preview integration resources](#link-preview-integration-resources)
