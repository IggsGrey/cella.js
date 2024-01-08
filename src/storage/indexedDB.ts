import { StorageEngine } from '../../declarations';

const customIndexedDB = (name: string): StorageEngine => {
	return {
		store: (key: string, value: string) => localStorage.setItem(key, value),
		get: (key: string) => localStorage.getItem(key),
		eject: (key: string) => localStorage.removeItem(key)
	};
};


export default customIndexedDB;