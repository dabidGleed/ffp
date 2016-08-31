# Template for Angular1 and Meteor 1.3

# Linting:

$ meteor npm run lint

# Tokens and passwords on Salesforce:

- They expire, need to change password in SF (simply login, it will prompt you)
- Go to your personal settings then search for 'token', click the button to get
a new token (will be sent via email)
- Update the settings in the meteor app, the format is '<password><token>'

# Packages:

We are using npm, so, run:

    $ meteor npm install

We also have atmosphere packages, but they get installed when running:

    $ meteor

## Structure

The rationalle behind the Future First Platform development carries a structure
that can be as 'future proof' as possible, at the same time, this project aims
to keep the structure as simple as possible, so that new developers can pick it
up and be almost immediately productive creating new features and maintaining
the current codebase. To that effect, certain architectural decisions have been
taken:

- The app is divided in three directories:
  - client
  - server
  - imports

By default, all files are eagerly loaded on Meteor apps. Although very helpful,
large scale apps have a tendency to enconter many conflicts with namespaces and
the order to which files are loaded when taking this approach.

This is why, Meteor 1.3 introduced a new convention, any files located under a
directory named 'imports' will be lazy loaded, this means that as developers,
when dealing with files that are stored under the imports directory, we must
manually import them. This application strives to as much as possible, keep
files within the imports directory where their dependencies can be more closely
managed.

As an older Meteor convention, any files located under the server and client
directories will only load in the server or in the client, this application
keeps as little code as possible within those directories. It aims to make use
of those for the bare minimum import statements that will bootstrap the app. In
addition to that, the client directory has two extra purposes, it sets up the
initial HTML file to be served along with a scss file that sets up some general
styles and dictates the order to which the subsequent scss files should be
loaded.

The imports directory is subdivied in three:

- api
- startup
- ui

The startup directory, holds any scripts that should be executed every time the
app bootstraps. We are only using it so that we can add some default data to the
database, should it be empty.

The api directory acts like a glue between the server and the client, they will
hold the publications, the security rules and the methods exposed to the client.
Each entity should be stored in their own directory and contain one or more of
the following files:

- collection.js: the collection declaration along with any .allow rules
- helpers.js: any helper methods needed
- index.js: the entry point for the entity
- methods.js: the methods exposed to the client
- methods.tests.js: tests for the methods
- publish.js: the metheor publications
- other: any other files needed to accomplish the tasks

The UI directory holds two other directories, filters and components, components
are the standard Angular components which together will compose our final app,
filters or any other directories at this level should hold files that will share
functionality among different components.

Each component should follow a simple, short and expressive naming convention.
Any component that is expected to only be used within its parent, should be
prefixed with the parent component name using camelCase.

Each component should consist of at least two files, an html file and a
javascript file. The JavaScript file should declare a new module to hold the
Angular component and the html file, should be the template used by the
component. In addition, an scss file and any complementary files (such as
a modal template), should also go in the same directory. Tests should reside in
a subdirectory called client, so that Meteor does not load those when running
in test mode for the server side only.

The main component is called FutureFirst, it holds the recepie dictating how
the rest of the app will be put together. All files should follow the same
structure and convention, please refer to the official AngularMeteor guide for
more details:

- http://www.angular-meteor.com/tutorials/socially/


### Usage of Meteor 1.3

Despite being a really recent release, Meteor 1.3 brings certain features that
could not be left overlooked, most notably a much better support for testing as
well as a clear move towards NPM packages, leaving Atmosphere packages as a last
resort only for those sittuations when a deep integration into Meteor is
mandatory.



## Going forward

At the time of this writting, Angular2 is still under a release candidate and
will take some time until best practices and complete packages make its way into
the eco system. The way in which this application has been developed, aids a
smoother migration from Angular1.x to Angular2, most notably:

  - Packages have been developed as separate components on Angular2 style
  - Controllers are classes, rather than functions
  - Usage of officially supported packages, such as Angular Material and
  Angular UI-Router

In addition, going forward, the modules written in Angular1.x do not necessarily
have to be converted to Angular2, as both versions can run in parallel without
conflics. For more information, please refer to the official Angular.js
documentation and the documentation for the Angular Meteor package:

  - https://angular.io/docs/ts/latest/guide/upgrade.html
  - http://www.angular-meteor.com/angular2

For the server side development, a packaged called Apollo is being officially
backed up by the core team of Meteor, not only it will aid data fetching and
mutations, but also, it is a perfect fit for the purposes of Future First where
data is being collected from external sources, most notably SalesForce. Apollo
is now under a technical preview and once released, will integrate seamslesly
with Angular2 and Meteor. You may follow their progress here:

  - http://www.apollostack.com/

---

- use the npm version of chart-js
- use the npm version of font-awesome
- use the npm version of tinycolor.js instead of the cdn
- use the npm version of angular-material for the css too
