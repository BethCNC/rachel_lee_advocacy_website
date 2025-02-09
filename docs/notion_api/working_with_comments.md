---
meta_tags:
  childrenProjects: '[{"subdomain":"notionapi","subpath":"","name":"Notion API","_id":"6038057d9c4b200067ba3c9a"}]'
  description: Learn how to add and retrieve comments with the Notion API.
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
scraped_at: '2025-02-05T17:34:02.090764'
title: Working with comments
url: https://developers.notion.com/docs/working-with-comments#next-steps
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
# Working with comments

Learn how to add and retrieve comments with the Notion API.

 [Suggest Edits](/edit/working-with-comments)# Overview


Notion offers the ability for developers to add [comments](https://www.notion.so/help/comments-mentions-and-reminders) to pages and page content (i.e. [blocks](/docs/working-with-page-content#modeling-content-as-blocks)) within a workspace. Users may add comments:


* To the top of a page.
* Inline to text or other [blocks](/docs/working-with-page-content#modeling-content-as-blocks) within a page.



> ## 📘
> 
> When using the public API, inline comments can be used to respond to *existing* [discussions](#responding-to-a-discussion-thread).
> 
> 


![Notion UI with a page comment and inline comment added.](https://files.readme.io/bec3d37-Screen_Shot_2023-05-22_at_3.38.28_PM.png)The Notion UI with a page and inline/block comment added.


This guide will review how to use the public REST API to add and retrieve comments on a page. It will also look at considerations specific to [integrations](https://www.notion.so/help/add-and-manage-connections-with-the-api) when retrieving or adding comments.


## Permissions


Before discussing how to use the public REST API to interact with comments, let’s first review who can comment on a page. Notion relies on a tiered system for [page permissions](https://www.notion.so/help/sharing-and-permissions#permission-levels), which can vary between: 


* `Can view`
* `Can comment`
* `Can edit`
* `Full access`


When using the Notion UI, users must have `Can comment` access or higher (i.e. less restricted) to add comments to a page.


[Integrations](/docs/getting-started#what-is-a-notion-integration) must also have comment permissions, which can be set in the [Integrations dashboard](https://notion.so/my-integrations).



> ## 📘
> 
> Integrations are apps developers build to use the public API within a Notion workspace. Integrations must be given explicit permissions to read/write content in a workspace, included content related to comments.
> 
> 


### Integration comments capabilities


To give your integration permission to interact with comments via the public REST API, you need to configure the integration to have comment capabilities.


There are two relevant capabilities when it comes to comments — the ability to:


1. Read comments.
2. Write (or insert) comments.


You can edit your integration's capabilities in the [Integrations dashboard](https://notion.so/my-integrations). If these capabilities are not added to your integration, REST API requests related to comments will respond with an error.


![Configuring capabilities on the integration settings page.](https://files.readme.io/497c553-Configuring_capabilities_on_the_integration_settings_page.png)Configuring capabilities on the integration settings page.


See our reference guide on [Capabilities](/reference/capabilities) for more information.


## Comments in Notion’s UI vs. using the REST API


In the Notion UI, users can:


* Add a comment to a page.
* Add an inline comment to child blocks on the page (i.e. comment on page content).
* Respond to an inline comment (i.e. add a comment to an existing discussion thread).
* Read open comments on a page or block.
* Read/re-open resolved comments on a page or block.
* Edit comments.


✅ Using the public REST API, integrations **can**:


* Add a comment to a page.
* Respond to an inline comment (i.e. add a comment to an existing discussion thread).
* Read open comments on a block or page.


❌ When using the public REST API, integrations **cannot**:


* Start a new discussion thread.
* Edit existing comments.
* Retrieve resolved comments.



> ## 👍
> 
> Keep an eye on our [Changelog](/page/changelog) for new features and updates to the REST API.
> 
> 


# Retrieving comments for a page or block


The [Retrieve comments](/reference/retrieve-a-comment) endpoint can be used to list all open (or “un-resolved”) comments for a page or block. Whether you’re retrieving comments for a page or block, the `block_id` query parameter is used. This is because [pages are technically blocks](/docs/working-with-page-content).


This endpoint returns a flatlist of comments associated with the ID provided; however, some block types may support multiple discussion threads. This means there may be multiple discussion threads included in the response. When this is the case, comments from all discussion threads will be returned in ascending chronological order. The threads can be distinguished by sorting them `discussion_id` field on each comment object.


cURLJavaScript
```
curl 'https://api.notion.com/v1/comments?block_id=5c6a28216bb14a7eb6e1c50111515c3d'\
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Notion-Version: 2022-06-28"

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const blockId = 'd40e767c-d7af-4b18-a86d-55c61f1e39a4';
  const response = await notion.comments.list({ block_id: blockId });
  console.log(response);
})();

```

By default, the response from this endpoint will return a maximum of 100 items. To retrieve additional items, you will need to use [pagination](/reference/intro#pagination).


# Adding a comment to a page


You can add a top-level comment to a page by using the [Add comment to page](/reference/create-a-comment) endpoint. Requests made to this endpoint require the ID for the parent page, as well as a [rich text](/reference/rich-text) body (i.e. the comment content).


ShellJavaScript
```
curl -X POST https://api.notion.com/v1/comments \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-06-28" \
  --data '
  {
    "parent": {
      "page_id": "59e3eb41-33b2-4151-b05b-31115a15e1c2"
    },
    "rich_text": [
      {
        "text": {
          "content": "Hello from my integration."
        }
      }
    ]
  }
  '

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const response = await notion.comments.create({
    parent: {
      page_id: "59e3eb41-33b2-4151-b05b-31115a15e1c2"
    },
    rich_text: [
      {
        text: {
          content: "Hello from my integration.",
        },
      },
    ],
  });
  console.log(response);
})();

```

The response will contain the new [comment object](/reference/comment-object). 


The exception to what will be returned occurs if your integration has “write comment” capabilities but not “read comment” capabilities. In this situation, the response will be a partial object consisting of only the `id` and `object` fields. This is because the integration can create new comments but can’t retrieve comments, even if the retrieval is just the response for the newly created one. (Reminder: You can update the read/write settings in the [Integrations dashboard](https://notion.so/my-integrations).)


In the Notion UI, this new comment will be displayed on the page using your integration's name and icon.


# Inline comments


## Responding to a discussion thread


The [Add comment to page](/reference/create-a-comment) endpoint can also be used to respond to a discussion thread on a block. (Reminder: Page blocks are the child elements that make up the page content, like a paragraph, header, to-do list, etc.)


If you’re using this endpoint to respond to a discussion, you will need to provide a `discussion_id` parameter *instead of* a `parent.page_id`.



> ## 📘
> 
> Inline comments cannot be directly added to blocks to start a new discussion using the public API. Currently, the API can only be used to respond to inline comments (discussions).
> 
> 


### Retrieving a discussion ID


The are two possible ways to get the `discussion_id` for a discussion thread.


1. You can use the [Retrieve comments](/reference/retrieve-a-comment) endpoint, which will return a list of open comments on the page or block.
2. You can also get a `discussion_id` manually by navigating to the page with the discussion you’re responding to. Next, click the "Copy link to discussion" menu option next to the discussion.


!["Copy link to discussion" menu option in Notion UI.](https://files.readme.io/8536d28-Screen_Shot_2023-05-22_at_7.27.12_PM.png)"Copy link to discussion" menu option in Notion UI.


This will give you a URL like:



```
https://notion.so/Something-something-a8d5215b89ae464b821ae2e2916ab9ce?d=5e73b63447c2428fa899e906b1f1d20e#b3e87b2b5e114cbd99f96288c22bacce

```

The value of the `d` query parameter is the `discussion_id`.


Once you have the `discussion_id`, you can make a request to respond to the thread like so:


cURLJavaScript
```
curl -X POST https://api.notion.com/v1/comments \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-06-28" \
  --data '
  {
    "discussion_id": "59e3eb41-33b2-4151-b05b-31115a15e1c2",
    "rich_text": [
      {
        "text": {
          "content": "Hello from my integration."
        }
      }
    ]
  }
  '

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const response = await notion.comments.create({
    "discussion_id": "8fa6e3ecbebf494b94bae5e9737842fb"
    "rich_text": [
      {
        "text": {
          "content": "Hello world"
        }
      }
    ]
	});
  
  console.log(response);
})();

```

# Conclusion


In this guide, you learned about comment permissions and how to interact with page and block-level comments using Notion’s public REST API. There are many potential use-cases for this type of interaction, such as:


* Commenting on a task when a related pull request is merged.
* Periodically pasting reminders to any pages that meet a certain criteria. For example, you could use the [Query a database](/reference/post-database-query) endpoint to search for a certain criteria and add a comment to any pages that do.
* For apps that use Notion as a CMS (Content Management System) — like a blog — users can give feedback to pages by adding a comment.


## Next steps


* Check out the [API reference documentation](/reference/comment-object) for the comments API.
* Update your version of the Notion JavaScript SDK to make use of this API: `npm install @notionhq/client@latest`.
* Clone our [notion-sdk-typescript-starter](https://github.com/makenotion/notion-sdk-typescript-starter) template repository for an easy way to get started using the API with [TypeScript](https://typescriptlang.org/).
Updated over 1 year ago 



---

* [Table of Contents](#)
* + [Overview](#overview)
		- [Permissions](#permissions)
		- [Comments in Notion’s UI vs. using the REST API](#comments-in-notions-ui-vs-using-the-rest-api)
	+ [Retrieving comments for a page or block](#retrieving-comments-for-a-page-or-block)
	+ [Adding a comment to a page](#adding-a-comment-to-a-page)
	+ [Inline comments](#inline-comments)
		- [Responding to a discussion thread](#responding-to-a-discussion-thread)
	+ [Conclusion](#conclusion)
		- [Next steps](#next-steps)
