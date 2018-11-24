---
id: contributing
title: Contributing
---

Use [Github issues](https://github.com/adazzle/react-data-grid/issues) for feature requests and bug reports.

## <a name="question"></a> Got a Question or Problem?

If you have questions about how to *use* react-data-grid, please direct them to [StackOverflow](http://stackoverflow.com/questions/tagged/react-data-grid). We are also available on our [Slack channel](https://react-data-grid.herokuapp.com/)

## <a name="issue"></a> Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository](https://github.com/adazzle/react-data-grid). Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Want a Feature?
You can *request* a new feature by submitting an issue to our [GitHub
Repository](https://github.com/adazzle/react-data-grid). If you would like to *implement* a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it. 
Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be
discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).


## Development
We want anyone contributing to react-data-grid to have the best experience possible.

### tl;dr
You can start coding in 5 minutes.

```sh
git clone https://github.com/adazzle/react-data-grid.git
cd react-data-grid
npm install
npm run dev-server
```

command                | outcome                                                                                               |
-----------------------|-------------------------------------------------------------------------------------------------------|
npm test               | runs tests in release mode                                                                            |
npm run dev-test       | runs tests in debug mode                                                                              |
npm run dev-server     | starts webpack dev server                                                                             |
npm run eslint         | runs the eslint task (runs automatically before npm test)                                             |
npm run build          | build the project in release mode                                                                     |
npm run postinstall    | boostraps the packages and fetches the individual dependencies (runs automatically after npm install) |
npm run lerna-publish  | prompts the user to choose between major, minor or patch release, then publishes each package in mono-repo  |
npm run web  | builds and runs a local copy of the public RDG Site   |
npm run web-publish  | publishes the public website to gh-pages   |


### Environment
We use webpack-dev-server for development. If you're fancy about knowing the tools you’re working with you can find the details about this awesome tool [in here](https://webpack.github.io/docs/webpack-dev-server.html).
To run webpack-dev-server all you need to do is to run the following command:
```sh
npm run dev-server
```
This will open your default browser at `http://localhost:8080/webpack-dev-server/` an you can navigate in our examples from there. 
HMR is enabled, that means you won't need to reload the page wherever you make a change, webpack-dev-server will watch for any changes in the source code.

### Testing
We use [karma](https://karma-runner.github.io/1.0/index.html) as our test runner combined with [Phantom JS](http://phantomjs.org/) and [jasmine](https://jasmine.github.io/). You can run your test in debug or release mode.
To run tests in release and dev mode you just need to run:
`npm test` for release
`npm dev-test` for debug

When testing react components we encourage the use of [enzyme](https://github.com/airbnb/enzyme) as it presents a clean and descriptive interface for component testing.

We want to keep our test coverage high, so when contributing you will need to test the changes you’re making and all the tests need to run successfully.

Any file inside a `__tests__` subfolder in the packages folder that looks like `*.spec.js` will be picked up an executed by the test runner.
When writing new tests you must follow the following guidelines:
-	If it is a test for a functionality that is already tested you need to write your tests in the existing spec file for that component.
-	If you’re adding a new functionality, or testing a untested one you will need to add a spec file (and maybe a `__tests__` folder if that directory level doesn’t have one),
  that spec file must be in the same deep level as the file your testing and by standard it will need to have the same name.

### Code style
We use [eslint](http://eslint.org/) to enforce some code standards.
An npm script will run automatically before testing to check if there are any violations to the set of rules we defined, you can also run that same script independently by running `npm run eslint` on your console.
The easiest way to be aware of any violation on coding time is to have a plugin in you text editor that will be checking for any violation on the run. 
Most modern text editor have their own plugins, you can find them in here for this popular editors:

- [VS Code eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Atom eslint plugin](https://atom.io/packages/linter-eslint)
- [Sublime Text](https://github.com/roadhump/SublimeLinter-eslint)

### Text Editor
Internally we use [VS Code](https://code.visualstudio.com/) as our main text editor, it is quite extensible and fully configurable.
It doesn’t mean you need to use it to contribute to our community.
You can use whatever is your personal preference, although it would be nice if it supports a eslint plugin as it would make your life a lot easier.

### Build
To build the project you will need to run `npm run build`.
It will create a dist folder for each package, that dist folder will be what is published to npm after your code being released.

### Review process
To be accepted your code needs to be mergeable with the master branch, and the CI builds needs to be passing. After a sign of from those requirements you code will be subject of a code review by one of the team members. 
All contributions are encouraged and most of all we hope you will have some fun writing code for react-data-grid.
