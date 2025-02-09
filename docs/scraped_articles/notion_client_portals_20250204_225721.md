# How To Create Client Portals For Notion

# How To Create Client Portals For Notion

## Can You Build Client Portals In Notion?

## How Softr can solve Notion Client Portals (for free)

## How to Use Softr to Build A Client Portal For Notion

### Step 1: Set up your Notion Databases for a Client Portal

### Step 2: How To Connect Notion To Softr

### Step 3: How To Build The Client Portal Home Page

### Step 4: How To Set Up Filters For Project Type and Status

### Step 5: How To Add A “Submit New Project Request” Button

### Step 6: How To Setup Granular Access Rights For Notion In Softr

### Step 7: How To Create A Project Dashboard In Softr

### Step 8: How To Create A Profile Page For Your Notion Client Portal

### Step 9: How To Change The Visibility Settings For Unauthorised Access

### Step 10: Finalising The Client Portal App In Softr

## Looking For Free Notion Templates?

### Did you miss the latest Notion Update?

## Continue Reading With These Related Posts

### How To Create Client Portals For Notion

### How To Get Any Data Into Notion (Without Typing)

### How To Build Calendly In Notion

Client Portals for Notion are an essential building block for many companies – and yet, it can be tough to get them right. Up until recently, the honest answer to “how can I build scalable and efficient Client Portals in Notion” was “unfortunately not at all”. But thanks to a recent update, this has finally changed. So in this blog post, you’ll learn everything you need to know to build your perfect Client Portals (and which traps along the way you should better avoid).

If you run an agency, are currently freelancing or work in any business that involves multiple clients, using Notion to create a Client Portal feels like an obvious next step if the rest of your business runs in Notion too.

Unfortunately, this is a lot easier said than done. Let’s take a quick look at this example.

Let’s say you currently use three databases to organise your company: Clients, Projects, and Tasks. Each client should have their own client portal where they can view relevant projects and tasks.

Unfortunately, there’s a catch.

If you want a system that’s best for your internal use, you need to use so-called global databases. A single database per item type.

That means ONE database to store all the projects in your company and ONE database for all the tasks.

(if you wonder why this is by far the best setup, check out this guide)

But while this system is amazing for your team, it has a hard time creating secure Client Portals.

That’s because Notion doesn’t have row level permissions.

It’s impossible to automatically set access rights & sharing settings on your database entries.

That means, you can’t just share the specific projects and tasks that belong to one client with that person.

Instead, you’re stuck with three options:

❌ build out separate databases for every client and abandon the best practices in your workspace (not good for your operations)

❌ use global databases, share a normal linked view with your client and hope no data leaks (not good for anyone)

❌ use my previous workaround that involved syncing items between Notion databases using third-party automation tools (works great in the right situation, but can be quite complex to maintain)

And I guess there’s also option Nr. 4: sharing each item individually by clicking into the share settings of the page – but who has time for that?

This limitation in Notion is really important to understand. And while there are a ton of tutorials on Youtube that teach you how to build Client Portals for Notion, very few take into account the security and scaling issues that go along with them.

Luckily, we now have a much better workaround that allows for an efficient and scalable internal data structure while still keeping all client data 100% secure.

All of this is possible thanks to a recent update by Softr.io.

Softr is a no-code platform that enables you to build apps without needing any programming skills. Put simply, you can create a frontend (i.e. an interface) by simply dragging and dropping pre-built components. For the backend (i.e. your data), you can integrate with tools like Airtable or Google Sheets and thanks to a very recent update, Notion itself.

Using Softr you can then set user-specific permissions and access levels, which essentially adds row level permissions for Notion.

In the case of Client Portals for Notion, you’ll be using Softr’s components to build a web app that pulls data (Projects and Tasks) directly from your Notion workspace, with proper access rights for each client. This way, each client will only see the projects and tasks relevant to them without having access to your full database.

And the best part? You can do all of this with Softr’s free plan, so you don’t need to add another paid tool to your tech stack.

Pretty amazing, right?

So let’s get started and build a client portal for Notion with granular access controls.

To get started, you’ll need to set up your core databases within Notion that form the foundation of your client portal. For this guide, let’s create three essential databases in Notion — Clients, Projects, and Tasks.

Here’s an outline of the properties each database should have to begin with (though you can of course customise this for your specific needs):

Tasks Database

Projects Database

For the project timeline formula, you can use:

dateStart(Duration).format() + ” – ” + dateEnd(Duration).format()

This Notion formula displays the project’s start and end dates, which Softr will use to show the project timeline.

Clients Database

Feel free to adapt these properties as needed, but this setup should suit this client portal example. Also, be sure to add some dummy data to each database. This will make it easier to visualise the portal once we start building it in Softr.

Before you proceed to the next step, create a template in the Projects database and include a linked Tasks database within that template. Apply a filter where the Project links to the specific template project.

(this isn’t really necessary for the client portal in Notion, but we might as well stick to the best practices for building a business workspace in Notion)

With your databases ready, it’s time to move on to setting up Softr.

First, create a free account on Softr. Go to Softr.io, register, and sign in. The free plan will be sufficient for this project.

Once logged in, you’ll see the welcome page. Under the Create new app section, select Start from scratch. This will allow you to configure the app any way you like.

Next, a popup will prompt you to choose pre-built pages to include in the app. For this setup, select the following:

Skip the Sign-up page for this case, as you’ll use a magic link to let clients access the portal directly.

Click Create Application, and Softr will load the selected pre-built pages for you.

In the Softr builder, you’ll see the app preview in the canvas. On the right, there’s a panel with application blocks you can add to the app.

Selecting a block opens the customisation settings in the right panel, allowing you to tweak everything from headings, labels, and tags to buttons, search bars, and logos.

On the left, you’ll find the general app navigation, including pages, themes, users, and settings. With these options, you can build and tweak your client portal in any way you like.

Now, it’s time to connect your Notion databases as data sources in Softr, which will allow you to pull in your Projects and Tasks.

To begin, select any list component in Softr – for example the big list that Softr added on the main landing page below the hero section.

In the side panel, under Source, click Select data source and choose Add another data source.

A variety of app integrations will appear.

Select Notion and follow the authentication process to connect Softr to your Notion workspace.

Make sure to connect the Notion page containing all three databases—Clients, Projects, and Tasks.

Once connected, simply refresh the side panel to load these databases along with their properties in Softr.

You’re now ready to start building the Client Portal’s Home Page!

With your Notion workspace linked to Softr, let’s start by building a home page where clients can view project details in a clean and organised way.

Think about the information your clients want to have. In this case, clients want to see project names, types, status, and durations. They may also want to search for projects, filter by categories, and submit new project requests.

On the pre-built home page, which might already include a list block, configure the list to pull data from the Projects database. If there’s no list block, add one from the side panel that matches your style.

In the Source tab, select the Projects database. Softr will update the list block based on your Project database.

Now, switch to the Content tab to start mapping each field to your Projects database properties.

When mapping properties, click on any item field to adjust the settings, such as Type (like heading or rich text) and Content (which database property to show). To keep things simple, let’s set it up like this:

This setup will display each project’s name, type, status, and duration.

If you need more information, you can continue mapping properties from Notion – and once done, you can delete the remaining pre-created elements on the Softr list.

Suppose you want your clients to be able to filter the projects by the project types. Filters allow them to easily narrow down projects based on specific criteria, like project type or status.

To do so, Go to the Filters section and change the following:

After that, you will modify the search bar — add an additional filter to narrow the projects by project status.

First, click Add Filter to add a new filter. This time, you’ll set it up as a dropdown menu in the search bar. So, customise it in this way:

To further customise your Client Portal for Notion, let’s add a button to submit a project request.

If you’d like to allow clients to submit new project requests or add comments, add a button for this on the home page. Go to the Actions tab, expand New Record, and set the label to Submit New Project Request.

Under Add Record, adjust the input fields to match your Project database’s properties. Modify input labels and placeholder text, and ensure mapping to the correct database property.

When clients will click this button, they’ll see a popup to submit new project requests. After finishing, click the Preview button (top right corner) to preview it from the client’s perspective.

Looking good, right?

Currently, clients still have access to the full Projects database. In the next step, you’ll set up access rights and permissions to ensure clients only see data relevant to them.

To set up client-specific access rights, you’ll first need to add users to Softr. This can be done manually, or you can automate the process by connecting Softr to your Client database in Notion. Start by navigating to the Users page in Softr’s left panel and select Sync with data source.

This opens a new window, where you’ll go through the familiar steps of adding your data source and mapping its properties. Here’s how to set up the mappings:

For authentication, you could also select Temporary password, though Magic link keeps the signup process simpler for both you and your clients.

Click Save and sync to start the syncing process. After a brief moment, you should see clients from your Clients database synced to Softr. Their magic links will also be added to the Client database.

With this in place, you can add new users directly from Notion’s Client database or from the Softr dashboard.

Now, you need to set up the home page to show only the items relevant to specific clients. For this, head to the client portal’s Home page in Softr. In the Source tab, under Conditional Filters, select Add Condition to create a filter that will show only items relevant to each logged-in client.

Set up the condition like this:

This filter ensures that each client will only see their own projects, matching the Project’s Client name property to the logged-in user’s name.

You can add additional conditions if needed, such as displaying only Not started and In progress projects to hide completed or archived items. This flexibility means you can create a custom experience tailored to your and your client’s specific needs.

With the homepage for the client portal now ready, you can further personalise it by adding elements like logos, links, or buttons. Once happy with the layout, publish the page and it will generate a unique Softr URL.

If you prefer to have your own custom URL, Softr also allows you to connect your own domain, completely free of charge.

Now, let’s create a project dashboard where clients can track all tasks related to each project.

To set up the project dashboard so clients can click on a project and view all associated tasks, go to the Actions tab and select Open details page from the Actions dropdown.

Next, click Create details page for projects and select any layout you like. For this example, try the first option.

In the layout, customise the elements to display key project details:

To display assigned tasks, add a list block below. Click the Plus icon, choose a List block, and select a layout that suits your needs, such as List with horizontal cards and visible button.

Then, set the data source to the Tasks database and configure fields like task name, due date, and status in the Content tab.

If you want a simplified view, remove any unnecessary features like the search bar, categories, and top action buttons. You can, however, add an Approve button to make the dashboard more functional. Go to the Actions tab, click Add item button > One-click update, and set it up as follows:

You can also add an option for clients to leave comments. Just add another button and select Edit record instead of One-click update.

Currently, the dashboard shows all tasks from the tasks database. To show only the project specific tasks, you need to add some conditions here.

Based on the relation property in your Notion Project Database, set the following conditions:

And,

This way, clients only see tasks specific to the opened project that need to be reviewed. Once a task is approved, it will no longer appear on the dashboard.

Now, you’re ready to style the page! Feel free to add blocks for any additional messages or information as needed.

You could for example add a second list that displays all completed tasks to give the client a running log of already delivered work.

Once you’re ready, you can save your progress by clicking Publish > Publish Updates.

Since you’ll be using the magic link to authenticate clients, you don’t really need to do much on the profile page. Simply remove the “change password” option and you’re good to go.

Lastly, you need to update the Visibility settings to finish configuring the client portal for Notion.

Currently, anyone with the link can access the client portal. That’s of course not what we want, so let’s quickly set up the proper visibility settings.

To do this, head over to Page > Home on the right panel, then click on the three-dot menu > Settings.

Under Visibility, set the following:

With this setup, only users who are logged in can access the page.

However, if you want to create a different page for visitors, consider adding an About Page where you can provide information about your business, what you offer, and more. Next, navigate to Pages > Page rules and configure the following:

This way, anyone without proper authorisation or users who have signed out will see the About page instead.

Now that everything is perfectly set up and ready for launch, you can make some final tweaks from the Settings options. Here, you can change the application name to Client Portal, update the favicon, add your own domain or stick with the Softr domain, and if you’re on a premium plan, you can even remove the Softr branding.

And there you have it!

With Softr on the frontend and Notion on the backend, you just created a fully automated client portal for your business. It’s easy to set up, scalable, and can be adjusted to the specific needs of your business.

Learn how to build secure and scalable Client Portals for Notion with this detailed step-by-step guide.

Learn how to quickly extract data from screenshots and add it to a Notion Database using free automation tools (and the power of AI)

Learn how to build a fully automated booking tool in Notion to replace Calendly, for free and fully customisable. Includes free Notion Template.

* Name (Default Text property)
* Due Date (Date property)
* Status (Status property)
* Person (Person property)
* Projects (Relation to Projects database)

* Name (Default Text property)
* Duration (Date property)
* Status (Status property)
* Project Type (Select property)
* Display Duration [Softr] (Formula property for project timeline)
* Client Comment (Text property)

* Name (Default Text property)
* Projects (Relation to Projects database)
* Email (Email property)
* Magic Link (Text property)

* Home (main client workspace)
* List Details (for project-specific details, like tasks)
* User Profile

* For the Heading, set the Type to Heading and the Content to the project’s Name.
* For Additional Labels:

Set Duration (Rich Text) to the Display Duration [Softr] property.
Set Status (Tag) to the Status property.
Set Project Type (Tag) to the Project Type property.
* Set Duration (Rich Text) to the Display Duration [Softr] property.
* Set Status (Tag) to the Status property.
* Set Project Type (Tag) to the Project Type property.

* Set Duration (Rich Text) to the Display Duration [Softr] property.
* Set Status (Tag) to the Status property.
* Set Project Type (Tag) to the Project Type property.

* Label: by Project Type
* Filter by: Project Type property
* Toggle on Sync options with data source

* Label: by Status
* Filter by: Status property
* Toggle on Sync options with data source
* Show as Dropdown

* Source: Your Notion workspace
* Database: Clients
* Email: Email property
* Name: Name property
* Magic Link: Magic Link property
* Default Authentication Method: Generate magic link

* If Clients includes any of Logged-in user > Name.

* Heading: Project name
* Text: Display duration [Softr]
* Tag: Status

* Label: Approve
* Field: Status
* Update method: Replace existing value
* Replace existing value with: Approved

* if Projects includes any of Name

* Status is In Review

* Who can see this page: Logged-in users
* Which user groups: All logged-in users

* Not Logged in users: Unauthorised access > About
* Logged in Users: After sign out > About

* How To Create Client Portals For NotionLearn how to build secure and scalable Client Portals for Notion with this detailed step-by-step guide.
* How To Get Any Data Into Notion (Without Typing)Learn how to quickly extract data from screenshots and add it to a Notion Database using free automation tools (and the power of AI)
* How To Build Calendly In NotionLearn how to build a fully automated booking tool in Notion to replace Calendly, for free and fully customisable. Includes free Notion Template.

