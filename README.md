# Cella.JS

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master) ![Made with Typescript](https://camo.githubusercontent.com/0f9fcc0ac1b8617ad4989364f60f78b2d6b32985ad6a508f215f14d8f897b8d3/68747470733a2f2f62616467656e2e6e65742f62616467652f547970655363726970742f7374726963742532302546302539462539322541412f626c7565) ![Documentation Status](https://img.shields.io/badge/docs-passing-sucess) [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://github.com/IggsGrey/cella.js/blob/main/LICENSE) ![Up to date dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-sucess)
<br/>
[![Undergoing development](https://img.shields.io/badge/Development-undergoing-yellow)](https://github.com/IggsGrey/cella.js#todo) [![Contributors wanted](https://img.shields.io/badge/Contributors-wanted-blueviolet)](https://github.com/IggsGrey/cella.js#contributing) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-sucess)](https://github.com/IggsGrey/cella.js/compare)
<br/>
![Tests unspecified](https://img.shields.io/badge/Tests-unspecified-critical) ![Logo Needed](https://img.shields.io/badge/Logo-needed%20🙏🏾-important)
<br/>
![Thanks](https://img.shields.io/badge/Say%20thanks-to%20no%20one%20yet-ff69b4)


Cella.JS is a JavaScript package that helps you manage data storage within the browser. It basically serves as a basic wrapper around the browser's default local storage APIs in order to provide extra functionality. Cella.JS eliminates the need to write extra code when working with the browser's local storage. It provides features such as:

- In-built support for encryption.
- Store abstract data types without needing to convert to a string first.
- Ability to add custom storage engine.
- Ability to add custom (data-transformational) functions to be executed before or after data is stored or retrieved.
- #Working on in-built support for indexedDB.


# Table of Contents

- [Installation](#installation)
  * [NPM](#npm)
  * [Yarn](#yarn)
  * [Browser](#browser)
- [Developing locally](#developing-locally)
- [Usage](#usage)
  * [Importing the Library](#importing-the-library)
    + [ES6 Modules](#es6-modules)
    + [NodeJS Modules / Commonjs](#nodejs-modules---commonjs)
    + [Browser](#browser-1)
  * [How to Use](#how-to-use)
    + [Examples](#examples)
      - [Basic Usage](#basic-usage)
      - [Applying Transforms And Encryption](#applying-transforms-and-encryption)
      - [Specifying A Custom Database Engine](#specifying-a-custom-database-engine)
  * [API](#api)
    + [Cella Class Properties (CellaInstance)](#cella-class-properties--cellainstance-)
    + [Interfaces](#interfaces)
      - [StorageEngine](#storageengine)
      - [StorageItem](#storageitem)
      - [RetrievedStorageItem](#retrievedstorageitem)
      - [DeletedStorageItem](#deletedstorageitem)
      - [SpecifiedStorageEngine](#specifiedstorageengine)
      - [TransformObject](#transformobject)
- [Contributing](#contributing)
- [License](#license)
- [Upcoming Features!](#upcoming-features-)
- [Todo](#todo)
- [Browser Support](#browser-support)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>



# Installation
## NPM
```sh
$ npm install cella.js
```

## Yarn
```sh
$ yarn add cella.js
```

## Browser
`https://`


# Developing locally
To clone and build this project locally, run the following commands:

```sh
$ git clone https://github.com/IggsGrey/cella.js.git
$ npm i
$ npm run dev
```

# Usage

## Importing the Library

### ES6 Modules
```js
import Cella from 'cella.js';
```

### NodeJS Modules / Commonjs
```js
const Cella = require('cella.js');
```

### Browser
Import the library with a script tag and the Cella API shall be made available.
```js
Cella
```

## How to Use
Usage is unbelievably simple.
- Import the library
- Create an instance of Cella.
- Specify properties (optional) ([CellaInstance](https://github.com/IggsGrey/cella.js#cella-class-properties-cellainstance))
- Operation methods are made available to the newly instantiated class.
([StorageItem](https://github.com/IggsGrey/cella.js#storageitem), [RetrievedStorageItem](https://github.com/IggsGrey/cella.js#retrievedstorageitem), [DeletedStorageItem](https://github.com/IggsGrey/cella.js#deletedstorageitem))

### Examples

#### Basic Usage

```js
import Cella from 'cella.js';

// create an instance of Cella!
const cella = new Cella();


// store an item
cella.store({
	key: 'sample-key',
	value: ['item1', 'item2', 'item3', 'item4']
});
// void


// retrieve an item
const retrievedItem = cella.get({
	key: 'sample-key'
});
console.log(retrievedItem);
// Array ['item1', 'item2', 'item3', 'item4']


// delete an item
cella.eject({
	key: 'sample-key',
});
// void

```

#### Applying Transforms And Encryption

```js
import Cella from 'cella.js'

const mySetData = new Set(['pineapples', 'are', 'great']);

console.log(mySetData);

const cella = new Cella({
	encrypt: {
		secret: 'my-secret-key' // yup that's it!
	},
	transforms: [
		{
			inbound: function(yourSetData) {
				// convert set to array
				return [...yourSetData];
			},
			outbound: function(yourConvertedSetData) {
				// convert array back to set
				return new Set(yourConvertedSetData);
			}
		},
		// ...unlimitedTransforms
	]
});


cella.store({
	key: 'my-key',
	value: mySetData
});

console.log(cella.get({ key: 'my-key' }));

```

#### Specifying A Custom Storage Engine

```js
import Cella from 'cella.js';

// create an instance of Cella!
const cella = new Cella({
    storage: {
        store: (key, value) => {
            // code to implement custom storing
        },
        get: (key) => {
            // code to implement custom retrieval
        },
        eject: (key) => {
            // code to implement custom deletion
        }
    }
});
```

## API

### Cella Class Properties (CellaInstance)
Properties you can pass to the new Cella class

| Property name | Description | Data type | Required | Default value |
| ------ | ------ | ------ | ------ | ------ |
| storage | Specify the StorageEngine to use and additional options. NOTE: If you specify a custom database storage engine object, it must implement the [StorageEngine](https://github.com/IggsGrey/cella.js#storageengine) interface. | [SpecifiedStorageEngine](https://github.com/IggsGrey/cella.js#specifiedstorageengine)<br/>OR<br/>[StorageEngine](https://github.com/IggsGrey/cella.js#storageengine) | no | { type: 'localStorage' }
| encrypt | An object that specifies encryption details including the encryption secret | Record<'secret', string><br/> Eg: `{ secret: 'some-string' }` | no | - |
| transforms | Array of objects defining function `inbound` and `outbound` functions. Useful for modifying data before storing and retrieving. | [TransformObject](https://github.com/IggsGrey/cella.js#transformobject)[] | no | - |

### Interfaces

#### StorageEngine
All instances of the in-built storage engines implement this interface, and all custom storage engines must implement this interface as well.

| Property name | Description | Data type | Parameters |
| ------ | ------ | ------ | ------ |
| store | The function that inserts data into the local database. | Function | [StorageItem](https://github.com/IggsGrey/cella.js#storageitem):<br/> {<br/>`key: string` (required)<br/>`value: string` (required)<br/>} |
| get | The function that retrieves data from the local database. | Function | [RetrievedStorageItem](https://github.com/IggsGrey/cella.js#retrievedstorageitem):<br/> {<br/>`key: string` (required)<br/>} |
| eject | The function that deletes data from the local database. | Function | [DeletedStorageItem](https://github.com/IggsGrey/cella.js#deletedstorageitem):<br/> {<br/>`key: string` (required)<br/>} |


#### StorageItem
The object parameter properties for each time you call ``cella.store()``

| Property name | Description | Data type | Required | Default value |
| ------ | ------ | ------ | ------ | ------ |
| key | The key/label that identifies the item in the localstorage. | string | true | - |
| value | The value of the item to be stored. | any | true | - |
| encrypt | Encryption properties for the data to be stored. | { secret: string } | false | null |


#### RetrievedStorageItem
The object parameter properties for each time you call ``cella.get()``

| Property name | Description | Data type | Required | Default value |
| ------ | ------ | ------ | ------ | ------ |
| key | The key/label that identifies the item in the localstorage. | string | true | - |
| decrypt | Decryption properties for the data to be stored. | { secret: string } | false | null |


#### DeletedStorageItem
The object parameter properties for each time you call ``cella.eject()``

| Property name | Description | Data type | Required | Default value |
| ------ | ------ | ------ | ------ | ------ |
| key | The key/label that identifies the item in the localstorage. | string | true | - |


#### SpecifiedStorageEngine
These properties are valid for the storage object value in the [CellaInstance](https://github.com/IggsGrey/cella.js#cella-class-properties-cellainstance).

| Property name | Description | Data type | Required | Default value |
| ------ | ------ | ------ | ------ | ------ |
| type | The preferred type of in-built storage. | 'localStorage' \| 'indexedDB' |  true | 'localStorage' |
| name | The preferred name of the indexedDB storage. | string |  required only when type == 'indexedDB' | - |

`NOTE: IN-BUILT SUPPORT FOR INDEXEDDB IS NOT YET IMPLEMENTED`

#### TransformObject
These properties are valid for an object value in the transforms array specified in a [CellaInstance](https://github.com/IggsGrey/cella.js#cella-class-properties-cellainstance).

| Property name | Description | Data type | Required | Default value |
| ------ | ------ | ------ | ------ | ------ |
| inbound | Function that is executed ech time data is being stored. This function is executed before any other changes are made to the data. | <T>(args0: T) => any | yes | - |
| outbound | Function that is executed ech time data is being retrieved. This function is executed after all other changes have been made to the data. | <T>(args0: T) => any | yes | - |




# Contributing
Want to contribute? Great! I am currently seeking contributors for remaining features including adding in-built support for more DB engines. You can get started by reading the current [issues]() or opening one yourself.
Don't forget to read the ethics and conduct code for contributors in the [CONTRIBUTING.md](https://github.com/IggsGrey/cella.js/blob/main/CONTRIBUTING.md)
You may also contact [@IggsGrey](https://github.com/IggsGrey) on:

  - [![jaygrey.jg@gmail.com](https://img.shields.io/badge/mailto-jaygrey.jg%40gmail.com-%23cc372e)](mailto:jaygrey.jg@gmail.com)
  - ![discord - scarrexx#5134](https://img.shields.io/badge/discord-scarrexx%235134-%236f86d4)
  - ![reddit - @scar_reX](https://img.shields.io/badge/reddit-%40scar__reX-%23f63000)
  - [![twitter - @devx_gh](https://img.shields.io/badge/twitter-%40devx__gh-%231c9cea)](https://twitter.com/devx_gh)


# License
This project uses the ISC license and it can be found here: [LICENSE](https://github.com/IggsGrey/cella.js/blob/main/LICENSE)




# Upcoming Features!

  - In-built support for indexedDB.
  - Integration with web workers.
  - Async callbacks.
  - Data compression.
  - Smart fallbacks for browser support issues. Eg: fallback to localStorage in browsers that do not support indexedDB (optional ofcourse).

# Todo
  - Write tests.
  - Implement features above (obviously Tom!).
  - Build docs site with demos
  - Work on browser support docs
  - Codesandbox examples

# Browser Support


| ![IE / Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)<br/>IE / Edge | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)<br/>Firefox | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)<br/>Chrome | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)<br/>Safari | ![iOS Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png)<br/>iOS Safari | ![Samsung](https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png)<br/>Samsung | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| 12| 3.5 | 4 | 4 | 3.2 | 1.0 | 10.5


![Developers for Firefox](https://code.cdn.mozilla.net/for-firefox/badges/assets/Developers_For_Firefox_Dark.png)