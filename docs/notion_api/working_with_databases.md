---
meta_tags:
  childrenProjects: '[{"subdomain":"notionapi","subpath":"","name":"Notion API","_id":"6038057d9c4b200067ba3c9a"}]'
  description: Learn about database schemas, querying databases, and more.
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
scraped_at: '2025-02-05T17:33:42.727977'
title: Working with databases
url: https://developers.notion.com/docs/working-with-databases#next-steps
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
# Working with databases

Learn about database schemas, querying databases, and more.

 [Suggest Edits](/edit/working-with-databases)## Overview


[Databases](https://www.notion.so/help/intro-to-databases) are collections of [pages](/reference/page) in a Notion workspace that can be filtered, sorted, and organized as needed. They allow users to create and manipulate structured data in Notion. 


Integrations can be used to help users sync databases with external systems or build workflows around Notion databases.


In this guide, you'll learn:


* [How databases are represented in the API.](#structure)
* [How to add items to a database.](#adding-pages-to-a-database)
* [How to find items within databases.](#finding-pages-in-a-database)


### Additional types of databases


In addition to regular Notion databases, there are two other types of databases to be aware of. *Neither of these database types are currently supported by the Public API.* 


#### Linked databases


Notion offers [linked databases](https://www.notion.so/help/guides/using-linked-databases) as a way of showing databases in multiple places. You can identify them by a ↗ next to the database title which, when clicked, takes you to the source database.


![Linked databases are indicated with an arrow next to the name.](https://files.readme.io/b551e28-linkeddb.png)Linked databases are indicated with an arrow next to the name.



> ## 🚧
> 
> The Public API does not currently support linked databases. When sharing a database with your integration, make sure it's the **source** one!
> 
> 


#### Wiki databases


Wiki databases are a special category of databases that allow [Workspace Owners](https://www.notion.so/help/add-members-admins-guests-and-groups) to organize child pages and databases with a homepage view. Wiki database pages can be verified by the Workspace Owner with an optional expiration date for the verification.


Pages in a wiki database will have a [`verification`](/reference/page-property-values#verification) property that can be set through your Notion workspace. See directions for [creating wikis](https://www.notion.so/help/wikis-and-verified-pages#create-a-wiki) and [verifying pages](https://www.notion.so/help/wikis-and-verified-pages#verifying-pages) in our Help Center.


Wiki databases can currently only be created through your Notion workspace directly (i.e., not the Public API). To learn more about creating and working with wiki databases, see the following Help Centre articles:


* [Wikis and verified pages](https://www.notion.so/help/wikis-and-verified-pages)
* [Wiki guides](https://www.notion.so/help/guides/category/wiki)


## Structure


Database objects describe a part of what a user sees in Notion when they open a database. (See our [documentation on database objects](/reference/database) and [database properties](/reference/property-object) for a complete description.) The most important part is the database's schema, defined in the `properties` collection.



> ## 📘
> 
> The columns of a Notion database are referred to as its “properties” or “schema”.
> 
> 


JavaScript
```
{
  "object": "database",
  
  "id": "2f26ee68-df30-4251-aad4-8ddc420cba3d",
  "created_time": "2020-03-17T19:10:04.968Z",
  "last_edited_time": "2020-03-17T21:49:37.913Z",
  "title": [/* details omitted */],
  "description": [/* details omitted */],
  
  "properties": {/* a collection of property objects */},
  "archived": false,
  "in_trash": false,
  "is_inline": false,
  "public_url": null
}

```


> ## 🚧Maximum schema size recommendation
> 
> Notion recommends a maximum schema size of **50KB**. Updates to database schemas that are too large will be blocked to help maintain database performance.
> 
> 


### Database properties


![Example of a database with three properties (Grocery item, Price, Last ordered).](https://files.readme.io/6a2c69a-databaseproperties.png)Example of a database with three properties (Grocery item, Price, Last ordered).


Let's assume you're viewing a database as a table. The columns of the database are represented in the API by database [property objects](/reference/property-object). Property objects store a description of a column, including a type for all the values in a column. 


You might recognize a few of the common types:


* [Text](/reference/property-object#rich-text)
* [Numbers](/reference/property-object#number)
* [Dates](/reference/property-object#date)
* [People](/reference/property-object#people)


 For each type, additional configuration may also be available. Let's take a look at the `properties` section of an example database object.


JavaScript
```
{
  "object": "database",
    
  "properties": {
    "Grocery item": {
      "id": "fy:{",
      "type": "title",
      "title": {}
    },
    "Price": {
      "id": "dia[",
      "type": "number",
      "number": {
        "format": "dollar"
      }
    },
    "Last ordered": {
      "id": "]\\R[",
      "type": "date",
      "date": {}
    },
  }
  
  // remaining details omitted
}

```

In this database object, there are three `properties` defined. Each key is the property name and each value is a property object. Here are some key takeaways:


* **The [`"title"`](/reference/property-object#title) type is special.** Every database has exactly one property with the `"title"` type. Properties of this type refer to the page title for each item in the database. In this example, the *Grocery item* property has this type.
* **The value of `type` corresponds to another key in the property object.** Each property object has a nested property named the same as its `type` value. For example, *Last ordered* has the type `"date"`, and it also has a `date` property. **This pattern is used throughout the Notion API on many objects and we call it type-specific data.**
* **Certain property object types have additional configuration.** In this example, *Price* has the type `"number"`. [Number property objects](/reference/property-object#number) have additional configuration inside the `number` property. In this example, the `format` configuration is set to `"dollar"` to control the appearance of page property values in this column.


### Iterate over a database object


A query to [Retrieve a database](/reference/retrieve-a-database) returns a database object. You can iterate over the `properties` object in the response to list information about each property. For example:


JavaScript
```
Object.entries(database.properties).forEach(([propertyName, propertyValue]) => {
    console.log(`${propertyName}: ${propertyValue.type}`);
});

```

## Adding pages to a database


Pages are used as items inside a database, and each page's properties must conform to its parent database's schema. In other words, if you're viewing a database as a table, a page's properties define all the values in a single row.



> ## 📘
> 
> If you are [creating a page](/reference/post-page) in a database, the page properties must match the properties of the database. If you are creating a page that is not a child of a database, `title` is the only property that can be set.
> 
> 


Pages are added to a database using the [Create a page API endpoint](/reference/post-page). Let's try to add a page to the example database above. 


The [Create a page](/reference/post-page) endpoint has two required parameters: `parent` and `properties`.


When adding a page to a database, the `parent` parameter must be a [database parent](/reference/parent-object). We can build this object for the example database above:


JavaScript
```
{
  "type": "database_id",
  "database_id": "2f26ee68-df30-4251-aad4-8ddc420cba3d"
}

```


> ## 📘Permissions
> 
> Before an integration can create a page within another page, it needs access to the page parent. To share a page with an integration, click the ••• menu at the top right of a page, scroll to `Add connections`, and use the search bar to find and select the integration from the dropdown list.
> 
> 



> ## 📘Where can I find my database's ID?
> 
> Here's a quick procedure to find the database ID for a specific database in Notion:
> 
> 
> > 
> > Open the database as a full page in Notion. Use the `Share` menu to `Copy link`. Now paste the link in your text editor so you can take a closer look. The URL uses the following format:
> > 
> > 
> > 
> > ```
> > https://www.notion.so/{workspace_name}/{database_id}?v={view_id}
> > 
> > ```
> > 
> > Find the part that corresponds to `{database_id}` in the URL you pasted. It is a 36 character long string. This value is your database ID.  
> > 
> > Note that when you receive the database ID from the API, e.g. the [search](/reference/post-search) endpoint, it will contain hyphens in the UUIDv4 format. You may use either the hyphenated or un-hyphenated ID when calling the API.
> > 
> > 
> > 
> 
> 


The `properties` parameter is an object which uses property names or IDs as keys, and [property value objects](/reference/page-property-values) as values. In order to create this parameter correctly, you refer to the [property objects](/reference/property-object) in the database's schema. We can build this object for the example database above too:


JavaScript
```
{
  "Grocery item": {
    "type": "title",
    "title": [{ "type": "text", "text": { "content": "Tomatoes" } }]
  },
  "Price": {
    "type": "number",
    "number": 1.49
  },
  "Last ordered": {
    "type": "date",
    "date": { "start": "2021-05-11" }
  }
}

```


> ## 📘Building a property value object in code
> 
> Building the property value object manually, as described in this guide, is only helpful when you're working with one specific database that you know about ahead of time. In order to build an integration that works with any database a user picks, and to remain flexible as the user's chosen database inevitably changes in the future, use the [Retrieve a database](/reference/retrieve-a-database) endpoint. Your integration can call this endpoint to get a current database schema, and then create the `properties` parameter in code based on that schema.
> 
> 


Using both the `parent` and `properties` parameters, we create a page by sending a request to [the endpoint](/reference/post-page).


cURLJavaScript
```
curl -X POST https://api.notion.com/v1/pages \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: <<latestNotionVersion>>" \
  --data '{
	  "parent": { "type": "database_id", "database_id": "2f26ee68-df30-4251-aad4-8ddc420cba3d" },
	  "properties": {
      "Grocery item": {
        "type": "title",
        "title": [{ "type": "text", "text": { "content": "Tomatoes" } }]
      },
      "Price": {
        "type": "number",
        "number": 1.49
      },
      "Last ordered": {
        "type": "date",
        "date": { "start": "2021-05-11" }
      }
    }
  }'

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const response = await notion.pages.create({
    parent: {
      database_id: '2f26ee68-df30-4251-aad4-8ddc420cba3d',
    },
    properties: {
      'Grocery item': {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: 'Tomatoes',
            },
          },
        ],
      },
      Price: {
        type: 'number',
        number: 1.49,
      },
      'Last ordered': {
        type: 'date',
        date: {
          start: '2021-05-11',
        },
      },
    },
  });
  console.log(response);
})();

```

Once the page is added, you'll receive a response containing the new [page object](/reference/page). An important property in the response is the page ID (`id`). If you're connecting Notion to an external system, it's a good idea to store the page ID. If you want to update the page properties later, you can use the ID with the [Update page properties](/reference/patch-page) endpoint.


## Finding pages in a database


Pages can be read from a database using the [Query a database](/reference/post-database-query) endpoint. This endpoint allows you to find pages based on criteria such as "which page has the most recent Last ordered date". Some databases are very large and this endpoint also allows you to get the results in a specific order, and get the results in smaller batches.



> ## 📘Getting a specific page
> 
> If you're looking for one specific page and already have it's page ID, you don't need to query a database to find it. Instead, use the [Retrieve a page](/reference/retrieve-a-page) endpoint.
> 
> 


### Filtering database pages


The criteria used to find pages are called [filters](/reference/post-database-query-filter). Filters can describe simple conditions (i.e. "*Tag* includes *Urgent*") or more complex conditions (i.e. "*Tag* includes *Urgent* AND *Due date* is within the next week AND *Assignee* equals *Cassandra Vasquez*"). These complex conditions are called [compound filters](/reference/post-database-query#compound-filters) because they use "and" or "or" to join multiple single property conditions together.



> ## 📘Finding all pages in a database
> 
> In order to find all the pages in a database, send a request to the [query a database](/reference/post-database-query) without a `filter` parameter.
> 
> 


In this guide, let's focus on a single property condition using the example database above. Looking at the database schema, we know the *Last ordered* property uses the type `"date"`. This means we can build a filter for the *Last ordered* property using any [condition for the `"date"` type](/reference/post-database-query-filter#date). The following filter object which matches pages where the *Last ordered* date is in the past week:


JavaScript
```
{
  "property": "Last ordered",
  "date": {
    "past_week": {}
  }
}

```

Using this filter, we can find all the pages in the example database which pages the condition.


cURLJavaScript
```
curl -X POST https://api.notion.com/v1/databases/2f26ee68df304251aad48ddc420cba3d/query \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"''
  -H "Content-Type: application/json" \
  -H "Notion-Version: <<latestNotionVersion>>" \
	--data '{
	  "filter": {
      "property": "Last ordered",
      "date": {
        "past_week": {}
      }
		}
	}'

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = '2f26ee68df304251aad48ddc420cba3d';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Last ordered',
      date: {
        past_week: {},
      },
    }
  });
  console.log(response);
})();

```

You'll receive a response that contains a list of matching [page objects](/reference/page).


JavaScript
```
{
  "object": "list",
  "results": [
    {
      "object": "page",
      /* details omitted */
    }
  ],
  "has_more": false,
  "next_cursor": null
}

```

This is a paginated response. Paginated responses are used throughout the Notion API when returning a potentially large list of objects. The maximum number of results in one paginated response is 100. The [pagination reference](/reference/pagination) explains how to use the `"start_cursor"` and `"page_size"` parameters to get more than 100 results.


### Sorting database pages


In this case, the individual pages we requested are in the `"results"` array. What if our integration (or its users) cared most about pages that were created recently? It would be helpful if the results were ordered so that the most recently created page was first, especially if the results didn't fit into one paginated response.


The `sort` parameter is used to order results by individual properties or by timestamps. This parameter can be assigned an array of sort object.


The time which a page was created is not a page property (properties that conform to the database schema). Instead, it's a property that every page has, and it's one of two kinds of timestamps. It is called the `"created_time"` timestamp. Let's build a [sort object](/reference/post-database-query-sort) that orders results so the most recently created page is first:


JavaScript
```
{
  "timestamp": "created_time",
  "direction": "descending"
}

```

Finally, let's update the request we made earlier to order the page results using this sort object:


cURLJavaScript
```
curl -X POST https://api.notion.com/v1/databases/2f26ee68df304251aad48ddc420cba3d/query \
  -H 'Authorization: Bearer '"$NOTION_API_KEY"''
  -H "Content-Type: application/json" \
  -H "Notion-Version: <<latestNotionVersion>>" \
	--data '{
	  "filter": {
      "property": "Last ordered",
      "date": {
        "past_week": {}
      }
		},
    "sorts": [{ "timestamp": "created_time", "direction": "descending" }]
	}'

```

```
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = '2f26ee68df304251aad48ddc420cba3d';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Last ordered',
      date: {
        past_week: {},
      },
    },
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending',
      },
    ]
  });
  console.log(response);
})();

```

## Conclusion


Understanding database schemas, made from a collection of database properties, is key to working with Notion databases. This enables you to add pages to a database and also get find items in a database.


You're ready to help users take advantage of Notion's flexible and extensible database interface to work with more kinds of data. There's more to learn and do with databases in the resources below.


### Next steps


* This guide explains working with page properties. Take a look at [working with page content](/docs/working-with-page-content).
* Explore the [database object](/reference/database) to see other kinds of information about databases available in the API.
* Learn about the other [page property value](/reference/property-value-object) types. In particular, try to do more with [rich text](/reference/rich-text).
* Learn more about [pagination](/reference/intro#pagination).
Updated 8 months ago 



---

* [Table of Contents](#)
* + [Overview](#overview)
		- [Additional types of databases](#additional-types-of-databases)
	+ [Structure](#structure)
		- [Database properties](#database-properties)
		- [Iterate over a database object](#iterate-over-a-database-object)
	+ [Adding pages to a database](#adding-pages-to-a-database)
	+ [Finding pages in a database](#finding-pages-in-a-database)
		- [Filtering database pages](#filtering-database-pages)
		- [Sorting database pages](#sorting-database-pages)
	+ [Conclusion](#conclusion)
		- [Next steps](#next-steps)
