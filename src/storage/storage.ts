import { StorageEngine } from '../../declarations';
import customIndexedDB from './indexedDB';
import customLocalStorage from './localStorage';


interface DefaultStorageEngines {
	localStorage: StorageEngine,
	indexedDB: (name: string) => StorageEngine
}

const storage: DefaultStorageEngines = {
	localStorage: customLocalStorage,
	indexedDB: (name: string) => customIndexedDB(name)
};

export default storage;