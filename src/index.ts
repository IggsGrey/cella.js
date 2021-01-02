import { applyDecrypt, applyEncrypt } from './encrypt';
import exceptions from './exceptions';
import { DeletedStorageItem, CellaInstance, RetrievedStorageItem, SpecifiedStorageEngine, StorageEngine, StorageItem } from '../declarations';
import storage from './storage/storage';


export class Cella {
	storage: StorageEngine;
	private defaultStorage: StorageEngine = storage.localStorage

	constructor(props?: CellaInstance) {
		if (props ?.storage) {
			if (typeof props ?.storage == 'object') {
				const selectedEngine = props.storage as SpecifiedStorageEngine;
				if (selectedEngine.type == 'indexedDB') {
					this.storage = storage[selectedEngine.type](selectedEngine.name);
				} else {
					this.storage = storage[selectedEngine.type];
				}
			}
			this.storage = props ?.storage as StorageEngine ?? this.defaultStorage;
		} else {
			this.storage = this.defaultStorage;
		}
	}


	public store = ({ key, value, encrypt }: StorageItem): void => {
		if (!key || !key.length) throw exceptions.nullKey;

		// if(localStorage.getItem(key)) throw exceptions.keyExists

		if (!value) value = '';
		else value = JSON.stringify(value);

		if (encrypt) {
			if (!encrypt.secret || !encrypt.secret.length) throw exceptions.nullSecretKey;

			value = applyEncrypt(value, encrypt.secret);
		}

		this.storage.store(key, value);
	};


	public get = ({ key, decrypt }: RetrievedStorageItem): unknown => {
		if (!key || !key.length) throw exceptions.nullKey;

		let value: string = this.storage.get(key) ?? '';

		if (decrypt) {
			if (!decrypt.secret || !decrypt.secret.length) throw exceptions.nullSecretKey;

			value = applyDecrypt(value, decrypt.secret);
		}

		if (value.length) {
			try {
				value = JSON.parse(value);
			}
			catch {
				throw exceptions.retrievingUndecryptedItem;
			}
		}

		return value;
	};


	public eject = ({ key }: DeletedStorageItem): void => {
		if (!key || !key.length) throw exceptions.nullKey;

		this.storage.eject(key);
	};

}



// export const store = ({ key, value, encrypt }: StorageItem): void => {
// 	if (!key || !key.length) throw exceptions.nullKey;
// 
// 	// if(localStorage.getItem(key)) throw exceptions.keyExists
// 
// 	if (!value) value = '';
// 	else value = JSON.stringify(value);
// 
// 	if (encrypt) {
// 		if (!encrypt.secret || !encrypt.secret.length) throw exceptions.nullSecretKey;
// 
// 		value = applyEncrypt(value, encrypt.secret);
// 	}
// 
// 	localStorage.setItem(key, value);
// };





// export const get = ({ key, decrypt }: RetrievedStorageItem): any => {
// 	if (!key || !key.length) throw exceptions.nullKey;
// 
// 	let value: string = localStorage.getItem(key) ?? '';
// 
// 	if (decrypt) {
// 		if (!decrypt.secret || !decrypt.secret.length) throw exceptions.nullSecretKey;
// 
// 		value = applyDecrypt(value, decrypt.secret);
// 	}
// 
// 	if (value.length) {
// 		try {
// 			value = JSON.parse(value);
// 		}
// 		catch {
// 			throw exceptions.retrievingUndecryptedItem;
// 		}
// 	}
// 
// 	return value;
// };





// export const eject = ({ key }: DeletedStorageItem): void => {
// 	if (!key || !key.length) throw exceptions.nullKey;
// 
// 	localStorage.removeItem(key);
// };


