import { StorageEngine } from '../../declarations';

const customLocalStorage: StorageEngine = {
	store: (key: string, value: string) => localStorage.setItem(key, value),
	get: (key: string) => localStorage.getItem(key),
	eject: (key: string) => localStorage.removeItem(key)
};


export default customLocalStorage;
