# `@swishh/api`

Swishh protobuf codegen

# Setup

## Yarn

```sh
yarn add @swishh/api
```

## NPM

```sh
npm install @swishh/api
```

# Usage

## NodeJS

```js
const beapi = require('@swishh/api')

const accountInterface = { displayName: 'Alice' }

console.log('as interface:', accountInterface)

const accountBytes = beapi.messenger.Account.encode(accountInterface).finish()

console.log('as bytes:', accountBytes)

const accountObject = beapi.messenger.Account.decode(accountBytes)

console.log('as decoded object:', accountObject)
```

Output

```
❯ node .
as interface: { displayName: 'Alice' }
as bytes: <Buffer 12 05 41 6c 69 63 65>
as decoded object: Account { serviceTokens: [], displayName: 'Alice' }
```
