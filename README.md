# UWPSC Admin App

## Table of Contents
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the repository](#clone-the-repository)dfasfds
- [Development](#development)
  - [Starting the app](#starting-the-app)
  - [Running tests](#running-tests)
- [Production](#production)
- [Contributing](#contributing)
- [Licence](#licence)

## Installation
Before starting development or usage of the frontend app, ensure you have all of the prerequiste software installed below.

### Prerequisites
- [Docker](https://www.docker.com/) (with Docker Compose)
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

### Clone the repository
Clone the repository to your local development environment using:
```sh
# HTTPS
git clone https://github.com/uwpokerclub/app.git
# SSH
git clone git@github.com:uwpokerclub/app.git
# GH CLI
gh repo clone uwpokerclub/app

# Change into project directory
cd app
## first time installation
yarn install
```

## Development

### Starting the app
To start the app for local development you can run the following command:
```sh
yarn start
```
**_Note: If you are working on the admin portion of the app, you will also need to have the [API server](https://github.com/uwpokerclub/api) running locally as well._**

This will start the React development server on [http://localhost:3000](http://localhost:3000). The development server will also hot reload for almost all code changes so you can continue to develop without restarting the application.

### Running tests
To run tests, run the following command:
```sh
yarn test
```
## Production
To build a production ready version of the application, you can build the Docker image with the Dockerfile provided in this repository. This will internally run `yarn build` which will create a production ready build of the React app, and copy the build files into a thin nginx image.
```sh
docker build .
```

## Contributing
TBD

## Licence
The UWPSC Admin App is licensed under the terms of the Apache 2.0 License and can be found [here](LICENSE).
