# React Native auth flow

This example is a monorepo template for basic authentication and authorization flows.
Including JWT access and refresh tokens.
With support for verify and reset password via email.

## Stack

### web

- next.js - framework
- urql - query lib
- emotion - design

## api

- mikro-orm - typescript ORM
- apollo-server-express - GraphQL API
- type-graphql - typescript GraphQL schemas

## app

- react-native - Android and iOS using React
- react-native - paper - design
- urql - query lib
- react-redux - state managment
- expo-secure-store - local storage

## Install dependency packages

```bash
yarn --cwd ./packages/app
yarn --cwd ./packages/server yarn
yarn --cwd ./packages/web yarn
```

## Run

Start node server

```bash
yarn --cwd ./packages/server dev
yarn --cwd ./packages/server watch
```

Start application

```bash
yarn --cwd ./packages/app start
yarn --cwd ./packages/app ios/android
```

Start web

```bash
yarn --cwd ./packages/web dev
```
