---
meta_tags:
  childrenProjects: '[{"subdomain":"notionapi","subpath":"","name":"Notion API","_id":"6038057d9c4b200067ba3c9a"}]'
  description: Learn about page content and how to add or retrieve it with the Notion
    API.
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
scraped_at: '2025-02-05T17:33:15.554795'
title: Working with page content
url: https://developers.notion.com/docs/working-with-page-content#next-steps
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
# Working with page content

Learn about page content and how to add or retrieve it with the Notion API.

 [Suggest Edits](/edit/working-with-page-content)## Overview


[Pages](https://www.notion.so/help/category/write-edit-and-customize) are where users write everything from quick notes, to shared documents, to curated landing pages in Notion. Integrations can help users turn Notion into the single source of truth by syndicating content or help users gather, connect, and visualize content inside Notion.


In this guide, you'll learn about how the building blocks of page content are represented in the API and what you can do with them. By the end, you'll be able to create new pages with content, read content from other pages, and add blocks to existing pages. 


### Page content versus properties


In general, **page properties** are best for capturing structured information such as a due date, a category, or a relationship to another page. **Page content** is best for looser structures or free form content. Page content is where users compose their thoughts or tell a story. Page properties are where users capture data and build systems. Your integration should aim to use each in the way users expect.


![2238](https://files.readme.io/369b6a5-page-properties-and-content.png "page-properties-and-content.png")Visualizing page properties versus page content


## Modeling content as blocks


A page's content is represented by a list of [block objects](/reference/block). These blocks are referred to as the page's children. Each block has a type, such as a paragraph, a heading, or an image. Some types of blocks, such as a toggle list, have children of their own.


Let's start with a simple example, a [paragraph block](/reference/block#paragraph-blocks):


JavaScript
```
{
  "object": "block",
  "id": "380c78c0-e0f5-4565-bdbd-c4ccb079050d",
  "type": "paragraph",
  "created_time": "",
  "last_edited_time": "",
  "has_children": false,

  "paragraph": {
    "text": [/* details omitted */]
  }
}

```

Paragraph blocks include common properties which every block includes: `object`, `type`, `created_time`, `last_edited_time`, and `has_children`. In addition, it contains type-specific information inside the `paragraph` property. Paragraph blocks have a `text` property. Other block types have different type-specific properties.


Now let's look at an example where the block has child blocks: a paragraph followed by an indented [todo block](/reference/block#to-do-blocks):


JavaScript
```
{
  "object": "block",
  "id": "380c78c0-e0f5-4565-bdbd-c4ccb079050d",
  "type": "paragraph",
  "created_time": "",
  "last_edited_time": "",
  "has_children": true,

  "paragraph": {
    "text": [/* details omitted */],
    "children": [
      {
        "object": "block",
        "id": "6d5b2463-a1c1-4e22-9b3b-49b3fe7ad384",
        "type": "to_do",
        "created_time": "",
        "last_edited_time": "",
        "has_children": false,
  
        "to_do": {
          "text": [/* details omitted */],
          "checked": false
        }
      }
    ]
  }
}

```

Child blocks are represented as a list of blocks inside the type-specific property. When a block has children, the `has_children` property is `true`. Only some block types, like paragraph blocks, support children.



> ## 📘Pages are also blocks
> 
> Pages are a special kind of block, but they have children like many other block types. When [retrieving a list of child blocks](/reference/get-block-children), you can use the page ID as a block ID.
> 
> When a child page appears inside another page, it's represented as a `child_page` block, which does not have children. You should think of this as a reference to the page block.
> 
> 



> ## 🚧Unsupported block types
> 
> The Notion API currently supports a subset of Notion [block](/reference/block#block-type-object) types, with support for more coming soon. When an unsupported block type appears in a page, it will have the type `"unsupported"`.
> 
> 


### Rich text


In the previous block examples, the omitted value of the text property is a list of [rich text objects](/reference/rich-text). Rich text objects can describe more than a simple string - the object includes style information, links, mentions, and more.


Let's look at a simple example that just contains the words "Grocery List":


JavaScript
```
{
  "type": "text",
  "text": {
    "content": "Grocery List",
    "link": null
  },
  "annotations": {
    "bold": false,
    "italic": false,
    "strikethrough": false,
    "underline": false,
    "code": false,
    "color": "default"
  },
  "plain_text": "Grocery List",
  "href": null
}

```

Rich text objects follow a similar pattern for type-specific configuration. The rich text object above has a type of `"text"`, and it has additional configuration related to that type in the `text` property. Other information that does not depend on the type, such as `annotations`, `plain_text`, and `href`, are at the top level of the rich text object.


Rich text is used both in page content and inside [page property values](/reference/page-property-values).


## Creating a page with content


Pages can be created with child blocks using the [create a page](/reference/post-page) endpoint. This endpoint supports creating a page within another page, or creating a page within a database.


Let's try creating a page within another page with some sample content. We will use all three parameters for this endpoint. The parent parameter is a [page parent](/reference/page#page-parent). We can build this object using an existing page ID:


JavaScript
```
{
  "type": "page_id",
  "page_id": "494c87d0-72c4-4cf6-960f-55f8427f7692"
}

```


> ## 📘Permissions
> 
> Before an integration can create a page within another page, it needs access to the page parent. To share a page with an integration, click the `•••` menu at the top right of a page, scroll to `Add connections`, and use the search bar to find and select the integration from the dropdown list.
> 
> 



> ## 📘Where can I find my page's ID?
> 
> Here's a quick procedure to find the page ID for a specific page in Notion:
> 
> 
> > 
> > Open the page in Notion. Use the Share menu to Copy link. Now paste the link in your text editor so you can take a closer look. The URL ends in a page ID.  
> > 
> > It should be a 32 character long string. Format this value by inserting hyphens (-) in the following pattern: 8-4-4-4-12 (each number is the length of characters between the hyphens).  
> > 
> > Example: 1429989fe8ac4effbc8f57f56486db54 becomes 1429989f-e8ac-4eff-bc8f-57f56486db54.  
> > 
> > This value is your page ID.
> > 
> > 
> > 
> 
> While this procedure is helpful to try the API, **you shouldn't ask users to do this for your integration**. It's more common for an integration to receive a page ID by calling the [search endpoint](/reference/post-search).
> 
> 


The `properties` parameter is an object which describes the page properties. Let's use a simple example with only the required `title` property:


JavaScript
```
{
  "Name": {
    "type": "title",
    "title": [{ "type": "text", "text": { "content": "A note from your pals at Notion" } }]
  }
}

```


> ## 📘Page properties within a database
> 
> Pages within a database parent require properties to conform to the database's schema. Follow the [working with databases guide](/docs/working-with-databases) for an in-depth discussion with examples.
> 
> 


The children parameter is a list of block objects which describe the page content. Let's use some sample content:


JavaScript
```
[
  {
    "object": "block",
    "type": "paragraph",
    "paragraph": {
      "rich_text": [{ "type": "text", "text": { "content": "You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us." } }]
    }
  }
]

```


> ## 📘Size limits
> 
> When creating new blocks, keep in mind that the Notion API has [size limits](/reference/errors#size-limits) for the content.
> 
> 


Using all three of the parameters, we create a page by sending a request to [the endpoint](/reference/post-page).


cURLJavaScript
```
curl -X POST https://api.notion.com/v1/pages \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: <<latestNotionVersion>>" \
  --data '{
	"parent": { "page_id": "494c87d0-72c4-4cf6-960f-55f8427f7692" },
	"properties": {
		"title": {
      "title": [{ "type": "text", "text": { "content": "A note from your pals at Notion" } }]
		}
	},
	"children": [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [{ "type": "text", "text": { "content": "You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us." } }]
      }
    }
  ]
}'

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const response = await notion.pages.create({
    parent: {
      page_id: '494c87d072c44cf6960f55f8427f7692',
    },
    properties: {
      title: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'A note from your pals at Notion',
            },
          },
        ],
      },
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          text: [
            {
              type: 'text',
              text: {
                content: 'You made this page using the Notion API. Pretty cool, huh? We hope you enjoy building with us.',
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
})();

```

Once the page is added, you'll receive a response containing the new [page object](/reference/page). Take a look inside Notion and view your new page.


## Reading blocks from a page


Page content can be read from a page using the [retrieve block children](/reference/get-block-children) endpoint. This endpoint returns a list of children for any block which supports children. While pages are a common starting point for reading block children, you can retrieve the block children of other kinds of blocks, too.


The `block_id` parameter is the ID of any existing block. If you're following from the example above, the response contained a page ID. Let's use that page ID to read the sample content from the page. We'll use `"16d8004e-5f6a-42a6-9811-51c22ddada12"` as the block ID.


Using this `block_id`, we retrieve the block children by sending a request to [the endpoint](/reference/get-block-children).


cURLJavaScript
```
curl https://api.notion.com/v1/blocks/16d8004e-5f6a-42a6-9811-51c22ddada12/children?page_size=100 \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Notion-Version: <<latestNotionVersion>>"

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const blockId = '16d8004e5f6a42a6981151c22ddada12';
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });
  console.log(response);
})();

```

You'll receive a response that contains a list of block objects.


JavaScript
```
{
  "object": "list",
  "results": [
    {
      "object": "block",
      /* details omitted */
    }
  ],
  "has_more": false,
  "next_cursor": null
}

```

This is a paginated response. Paginated responses are used throughout the Notion API when returning a potentially large list of objects. The maximum number of results in one paginated response is 100. The [pagination reference](/reference/pagination) explains how to use the "start\_cursor" and "page\_size" parameters to get more than 100 results.


In this case, the individual child blocks we requested are in the "results" array.


### Reading nested blocks


What happens when the results contain a block that has its own children? In this case, the response will not contain those children, but the `has_children` property will be `true`. If your integration needs a complete representation of a page's (or any block's) content, it should search the results for blocks with `has_children` set to `true`, and recursively call the [retrieve block children](/reference/get-block-children) endpoint.


Reading large pages may take some time. We recommend using asynchronous operations in your architecture, such as a job queue. You will also need to be mindful of [rate limits](/reference/errors#rate-limits) to appropriately slow down making new requests after the limit is met.


## Appending blocks to a page


Integrations can add more content to a page by using the [append block children](/reference/patch-block-children) endpoint. Let's try to add another block to the page we created in the example above. This endpoint requires two parameters: `block_id` and `children`.


The `block_id` parameter is the ID of any existing block. If you're following from the example above, let's use the same page ID as the block ID: `"16d8004e-5f6a-42a6-9811-51c22ddada12"`.


The `children` parameter is a list of [block objects](/reference/block) which describe the content we want to append. Let's use some more sample content:


JavaScript
```
[
  {
    "object": "block",
    "type": "paragraph",
    "paragraph": {
      "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
    }
  }
]

```

Using both parameters, we append blocks by sending a request to [the endpoint](/reference/patch-block-children).


cURLJavaScript
```
curl -X PATCH https://api.notion.com/v1/blocks/16d8004e-5f6a-42a6-9811-51c22ddada12/children \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-06-28" \
  --data '{
	"children": [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
      }
    }
  ]
}'

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const blockId = '16d8004e5f6a42a6981151c22ddada12';
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          text: [
            {
              type: 'text',
              text: {
                content: '– Notion API Team',
                link: {
                  type: 'url',
                  url: 'https://twitter.com/NotionAPI',
                },
              },
            },
          ],
        },
      },
    ],
  });
  console.log(response);
})();

```

You'll receive a response that contains the updated block. The response does not contain the child blocks, but it will show `has_children` set to `true`.


By default, new block children are appended at the end of the parent block. To place the block after a specific child block and not at the end, use the `after` body parameter. `after` should be set to the ID of the existing child block you are appending the new block after. For example, if the parent `block_id` is for a block that contains a bulleted list, you can set the `after` parameter to the block ID of the list item you want the new block children to be appended after.


cURL
```
curl -X PATCH https://api.notion.com/v1/blocks/16d8004e-5f6a-42a6-9811-51c22ddada12/children \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2022-06-28" \
  --data '{
    "children": [
    {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "text": [{ "type": "text", "text": { "content": "– Notion API Team", "link": { "type": "url", "url": "https://twitter.com/NotionAPI" } } }]
      }
    }
  ], after: "<block_id_to_append_after>"
}'

```

## Conclusion


Nearly everything users see inside Notion is represented as blocks. Now that you've understood how your integration can build pages with blocks, read blocks, and add blocks to pages - you've unlocked most of the surface area in Notion. You integration can engage users where they do everything from creative writing, to building documentation, and more.


### Next steps


* This guide explains working with page content. Take a look at [working with database properties](/docs/working-with-databases#database-properties).
* Explore the [block object](/reference/block) to see other types of blocks you can create.
* Learn more about the various kinds of [rich text objects](/reference/rich-text).
* Learn more about [pagination](/reference/intro#pagination).
Updated 5 months ago 



---

* [Table of Contents](#)
* + [Overview](#overview)
		- [Page content versus properties](#page-content-versus-properties)
	+ [Modeling content as blocks](#modeling-content-as-blocks)
		- [Rich text](#rich-text)
	+ [Creating a page with content](#creating-a-page-with-content)
	+ [Reading blocks from a page](#reading-blocks-from-a-page)
		- [Reading nested blocks](#reading-nested-blocks)
	+ [Appending blocks to a page](#appending-blocks-to-a-page)
	+ [Conclusion](#conclusion)
		- [Next steps](#next-steps)
