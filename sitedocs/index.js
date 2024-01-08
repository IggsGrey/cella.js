// --------------------------------
// CLASS: Cella
// --------------------------------

/**
	* This is the default class used for manipulating data
	* in the browser storage. It is the default export from
	* the `cella.js` Node module.
	*@example
	import Cella from 'cella.js';
*/


class Cella {

	/**
	* Initializes a new instance of Cella
	* @example
	* const cella = new Cella(config);
	* @param {Object} [config=null] - Implements {@link #CellaInterface|`CellaInterface`}
	* This object parameter specifies the configuration for initialiszing
	* the `Cella` class instance. You may specify encryption, storage engine or transforms.
	*
	* <blockquote>See {@link #CellaInterface|`CellaInterface`} for more details</blockquote>
		*/
	constructor() { } // eslint-disable-line


	/**
	* Method used to store data.
	* @param {Object} storeParams - Specification for the item to be stored.
	* @return {Promise<void>}
	* <blockquote>See {@link #StorageItem|`StorageItem`} for more details</blockquote>
	* @example
	* cella.store(storeParams);
	*/
	store() { } // eslint-disable-line


	/**
	* Method used to retrieve stored data.
	* @param {Object} getParams - Specification for the item to be retrieved.
	* @return {Promise<any>} - The initial data type of the data that was stored. i.e: store an array, retrieve an array!
	* See {@link #RetrievedStorageItem|`RetrievedStorageItem`} for more details
	* @example
	* cella.get(getParams);
	*/
	get() { } // eslint-disable-line


	/**
	* Method used to delete data.
	* @param {Object} ejectParams - Specification for the item to be deleted.
	* @return {Promise<void>}
	* See {@link #DeletedStorageItem|`DeletedStorageItem`} for more details
	* @example
	* cella.eject(ejectParams);
	*/
	eject() { } // eslint-disable-line

}


/**
	* The object parameter properties for the {@link #Cella#store|`store`} method
	*
	* @typedef StorageItem
	* @type Object

	* @param {string} key - The key/label that identifies the item in the localstorage.
	* @param {any} value - The value of the item to be stored.
	* @example
	* cella.store({
	* 	key: 'itemKey',
	* 	value: ['array', 'as', 'item', 'value']
	* }).then(() => console.log('stored'));
*/


/**
	* The object parameter properties for the {@link #Cella#get|`get`} method
	*
	* @typedef RetrievedStorageItem
	* @type Object

	* @param {string} key - The key/label that identifies the item in the localstorage.
	* @example
	* cella.get({
	* 	key: 'itemKey'
	* }).then(res => console.log(res));
*/


/**
	* The object parameter properties for the {@link #Cella#eject|`eject`} method
	*
	* @typedef DeletedStorageItem
	* @type Object

	* @param {string} key - The key/label that identifies the item in the localstorage.
	* @example
	* cella.eject({
	* 	key: 'itemKey'
	* }).then(() => console.log('deleted, got void'));
*/




/**
	* The object parameter properties used to initialize the {@link #Cella|`Cella`} class
	* @typedef CellaInterface
	* @type Object
	*
	*
	* @param { Object } [encrypt=null] - The object parameter that specifies encryption details.
	*
	*
	* @param { Object } [storage={type: 'localStorage'}] - Implements the {@link #SpecifiedStorageEngine | `SpecifiedStorageEngine`} type.
	* This property is used to specify which in -built storage engine to use(eg: localStorage).
	*
	* It may also may also be used to define a custom storage engine
	* (which must implement the {@link #StorageEngine | `StorageEngine`} interface).
	* <blockquote>
	* See {@link #SpecifiedStorageEngine | `SpecifiedStorageEngine`} and {@link #StorageEngine | `StorageEngine`} for more.
	* </blockquote>
	*
	*
	@param { TransformObject[] } [transforms=[]] - An array of objects that implement the {@link #TransformObject|`TransformObject`} interface.
	* This property may be used to add custom transformations to data before
	* they are inserted and after they are retrieved. The `inbound` property of this object expects
	* a `Function` and it is executed before any other transformations take place.
	* This means the specified inbound function is the first to be executed when your data to
	* be stored reaches {@link #Cella|`Cella`}.
	* <blockquote>See {@link #TransformObject|`TransformObject`} for more.</blockquote>
	*
	*
	* @example <caption>Example of how to pass the `CellaInterface`</caption>
	* const cella = new Cella({
	* 	encrypt: {
	* 		'secret-key': 'something-secret'
	* 	},
	*		// use `localStorage` as the default storage engine
	* 	storage: {
	* 		type: 'localStorage'
	* 	},
	* 	transforms: [
	*			{
	*				inbound: function(yourSetData) {
	*					// convert a set data type being stored to an array
	*					// sets may not work too well with JSON.stringify
	*					// and the returned data may be altered.
	*					return [...yourSetData];
	*				},
	*				outbound: function(yourConvertedSetData) {
	*					// convert from array
	*					return new Set(yourConvertedSetData);
	*					// Set ['22', 45, 'eighteen']
	*				}
	*			},
	*		]
	* });
	*
	*
	* @example <caption>Below is an example specifying a custom storage engine.</caption>
	*
	* import Cella from 'cella.js';
	*
	* // create an instance of Cella!
	* const cella = new Cella({
	* 	storage: {
	*			store: (key, value) => {
	*				// code to implement custom storing
	* 		},
	* 		get: (key) => {
	* 			// code to implement custom retrieval
	* 		},
	* 		eject: (key) => {
	* 			// code to implement custom deletion
	* 		}
	* 	}
	* });
*/






/**
	* This property may be used to specify custom transformations
	* applied to the data before or after being stored or retrieved.
	* 	The example below shows one would handle
	*		`set` data with a custom transform.
	* @example
	* const setData = new Set(['22', 45, 'eighteen']);
	* console.log(setData);
	* // Set ['22', 45, 'eighteen']
	*
	* const cella = new Cella({
	* 	transforms: [
	*			{
	*				inbound: function(yourSetData) {
	*					// convert to array
	*					return [...yourSetData];
	*				},
	*				outbound: function(yourConvertedSetData) {
	*					// convert from array
	*					return new Set(yourConvertedSetData);
	*					// Set ['22', 45, 'eighteen']
	*				}
	*			},
	*		]
	* });
	* @typedef TransformObject
	* @type Object
*/

/**
	* Pass a custom storage engine to use as the storage engine
	* for storing data. The custom storage must be an object that
	* implements the operational methods `store`, `eject` and `get.`
	*
	*@example
	* const cella = new Cella({
	* 	storage: {
	*			store: (key, value) => {
	*				// code to implement custom storing
	* 		},
	* 		get: (key) => {
	* 			// code to implement custom retrieval
	* 		},
	* 		eject: (key) => {
	* 			// code to implement custom deletion
	* 		}
	* 	}
	* });
	*
	* @typedef StorageEngine
	* @type Object
	*
	*@param {Function(key, string)} store - The method that stores the data.
	* It accepts two arguments,
	* `key` and `value` and returns `void`.
	*
	*@param {Function(key)} get - The method that retrieves stored data.
	* It accepts one argument, `key` and returns the initial data type of the
	* stored data.
	*
	*
	*@param {Function(key)} eject - The method that deletes stored data.
	* It accepts one argument, `key` and returns void.
	*
*/

/**
	* Choose an in-built storage engine to use as the storage engine
	* for storing data. The custom storage must be an object that
	* implements the operational methods `store`, `eject` and `get.`
	*
	* <blockquote>
	* Note: At the moment, the localStorage engine API is the only StorageEngine
	* with in-built support available. Work on in-built support for indexedDB is
	* still in progress.
	* </blockquote>
	*
	*@example
	* const cella = new Cella({
	* 	storage: {
	* 		type: 'localStorage'
	* 	},
	* });
	*
	* @typedef SpecifiedStorageEngine
	* @type Object
	*
	*@param {string} [type=localStorage] - The in-built StorageEngine to use.
	*/
