#Commander
A simple alternative for making your way to node.js by learning how to setup a
node.js project including a tested command line interface.

##Prerequisites
- Make sure you have access to the internet.
- Install Node.js 7.x depending on your os.
- Make sure you have access to your github account. [Create one](https://github.com/join), if you don't have one
already, make yourself familiar with the basic [hello World](https://guides.github.com/activities/hello-world/) concepts
for creating and using personal repositories.

##Getting started
This project simply consists of this README.md file. Ensure that you have a
node.js version >7.x installed. First thing we need to do is making this directory
a node.js project. So call ```npm init``` on the terminal/shell/dos box in this directory.
You'll be asked numerous questions about the content of your project. Specify
as name of your project 'simple-cli-tutorial' and leave the rest by their default
settings.
Your package.json file should look afterwards similar to this:
```json
{
  "name": "simple-cli-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [
    "cli"
  ],
  "author": "Oliver Fischer",
  "license": "ISC"
}
```
Congratulations! You defined your first empty node.js project ;-). Now let us
define some testing support to write the tests ensuring your simple-cli-tutorial
acts as it should. For a deeper understanding of npm, the **node package management**,
refer to the [docs](https://docs.npmjs.com/), especially the sections [01](https://docs.npmjs.com/getting-started/what-is-npm),
[04](https://docs.npmjs.com/getting-started/installing-npm-packages-locally),[05]
(https://docs.npmjs.com/getting-started/using-a-package.json) and for the contents of
the package.json [11](https://docs.npmjs.com/getting-started/creating-node-modules).
By the way reading and **trying out** the whole stuff from the docs helps you getting more
familiar with the concepts of npm.

## Add testing support
We simply use a popular testing library making it easy to write tests in a TDD or BDD manner,
[Mocha](https://mochajs.org/). For simplifying the writing of tests we use the [Chai](http://chaijs.com/)
library helping us to write expressive BDD tests. We install both libraries by
simply typing in the projects directory:
```
npm i chai --save-dev
npm i mocha --save-dev
```
We instruct npm to store the dependencies below a property "devDependencies" marking
them as not relevant for the app runtime. All dependencies for your project needed
to run the app, should be installed with the param "--save", this will store them
in the "dependencies" section. When you execute the command for installing chai on
the terminal, you see a similar output like this:
```
simple-cli-tutorial@1.0.0 /home/commander
└─┬ chai@3.5.0
  ├── assertion-error@1.0.2
  ├─┬ deep-eql@0.1.3
  │ └── type-detect@0.1.1
  └── type-detect@1.0.0
```
Chai is installed to the current version 3.5.0 specifying its own dependency tree
containing its dependencies as well as the dependencies of these. Your install
of chai will be frozen to a **specific** version and you are responsible later
to manage these dependencies properly when you upgrade the deps of your application later.

This instructs npm to download and install these libraries to a folder node_modules
(it will be created for you, if it does not exist). Now we add a command to npm to
run the tests we create in a moment by adding a scripts section to the package.json
file below the "main" property (it does not matter where you create the new property
but people may expect the new "scripts" section (t)here):
```json
{
  "main" : "index.js",
  "scripts" : {
    "test" : "./node_modules/.bin/_mocha --reporter spec"
  }
}
```
When you now run npm test, mocha is executed and resolves with zero tests passing.
Why does this work? In brevity, you can define a "bin" property in the package.json
file pointing to a bash/shell script executable in an environment where node is present.
It may look like this:
```
#!/usr/bin/env node

console.log('Hello to simple-cli-tutorial!');
```
Well, mocha is doing its stuff in the bin file allowing us to write tests executed
by mocha. Let us write our first test:

1. Create a directory test in the current project (```mkdir test```)
2. Create a file simple-cli-tutorial.test.js in the created dir(```touch test/simple-cli-tutorial.test.js```)
3. Pass as the first line a 'use strict' directive. (Why? read yourself [here](http://www.w3schools.com/js/js_strict.asp),
but in brevity we are not allowed to accidently create global vars as well as not assigning values to read-only, non-existing objects, vars or properties).
4. Create a block containing these locs:
```javascript
const should = require('chai').should()

describe('unit testing with mocha', () => {
  it('accepts the should dialect', () => {
    (1+1).should.equal(2)
  })
})
```
After you run this test, the terminal should respond with:
```
Unit testing with mocha
    ✓ accepts the should dialect


  1 passing (14ms)
```
**Hey, celebrate**, you executed your first test with mocha in the should dialect!
Now add a failing test to see what happens. Copy the first test and modify it to
```javascript
describe('unit testing with mocha', () => {
  it('should fail on invalid test', () => {
    (1+2).should.equal(2)
  })
})
```
After you run the test suite again, the terminal should show the following output:
```
Unit testing with mocha
    ✓ accepts the should dialect

  unit testing with mocha
    1) should fail on invalid test


  1 passing (14ms)
  1 failing


  1) unit testing with mocha should fail on invalid test:

      AssertionError: expected 3 to equal 2
      + expected - actual

      -3
      +2

      at Context.it (test/smoke.test.js:17:18)

      ... and some evil bash output...

```
**Hey, celebrate again**, you wrote your first failing test. OK, step back, what
have we done? At first we created after the line ```javascript use strict``` an
import statement instructing the node.js environment to load the library 'chai'
and invoke the function ```javascript .should()``` on it. Regardless of the implementation
of this function, it enables the mocha/should environment to call a should function
on each expression inside an 'it' block resolving to an [assertion](http://chaijs.com/api/bdd/)
object which can be inspected by .equal, .to.be, or something similar.  
