## Before start

PRs and issues are always welcome. Please feel free to open PRs and issues! Make sure that LTS version of [Node.js](https://nodejs.org/) is installed in your system before start.

## Development setup

I recommend you to use [Yarn](https://yarnpkg.com) as a package manager. You can use npm if you want.
You should rename (/batch/.env.sample)[../batch/.env.sample] file and (/server/.env.sample) to `.env`. There files have metadata about database connection, GitHub OAuth and AWS access key/secret key etc.
```sh
# To start a client:
cd client
yarn
yarn start


# To start a api server:
cd server
yarn
yarn build:watch

# To start a batch server:
cd server
yarn
yarn build:watch
```

`yarn build:watch` command starts a server and watches file changes. Server automatically restarts whenever file changes.


## Reporting bugs

To report bugs, please use the [Issue Tracker](https://github.com/soonoo/committrs.io/issues)

Steps to report a bug:
* Open the [url](https://github.com/soonoo/committrs.io/issues/new)
* Add all the needed information to reproduce the bug, the information include
    * steps to reproduce the bug
    * resources link if needed


## Submitting patches

If you want to contribute code, please follow these steps:

(If you are new to git and/or GitHub, you should read [Pro Git](http://progit.org/book/) , especially the section on [Contributing to a project:Small/Large Public Project](http://progit.org/book/ch5-2.html#public_small_project) )

-   Download the latest master branch from github:

```sh
git clone git://github.com/soonoo/committrs.io.git
cd committrs.io

# install dependencies
cd server && yarn
cd client && yarn
cd batch && yarn
```


This documentation was created with reference to [vue-cli](https://github.com/vuejs/vue-cli) and [cocos2d-x](https://github.com/cocos2d/cocos2d-x).
