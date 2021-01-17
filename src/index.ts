import { applyDecrypt, applyEncrypt } from './encryption/encrypt';
import exceptions from './exceptions/exceptions';
import { DeletedStorageItem, CellaInstance, RetrievedStorageItem, SpecifiedStorageEngine, StorageEngine, StorageItem, TransformObject } from '../declarations';
import storage from './storage/storage';


class Cella {
	public storage: StorageEngine;
	public transforms: TransformObject[] = [];
	public encrypt: Record<'secret', string> | undefined;
	private defaultStorage: StorageEngine = storage.localStorage;

	constructor(props?: CellaInstance) {
		// determine storage engine
		if (props ?.storage) {
			// type check probably not required.
			if (typeof props ?.storage == 'object' && 'type' in props ?.storage) {
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

		// assign modifier functions (transforms) if any
		if (props ?.transforms ?.length) {
			this.transforms = props ?.transforms;
		}

		// bind encrypt
		this.encrypt = props ?.encrypt;
	}


	private execStore = ({ key, value }: StorageItem): void => {
		if (!key || !key.length) throw exceptions.nullKey;

		// if(localStorage.getItem(key)) throw exceptions.keyExists

		// execute inbound transforms if any
		if (this.transforms.length) {
			this.transforms.forEach(t => {
				value = t.inbound(value);
			});
		}

		// ensure value is most defnitely a string
		if (!value) value = '';
		else value = JSON.stringify(value);

		// apply encryption if any
		if (this.encrypt) {
			if (!this.encrypt.secret || !this.encrypt.secret.length) throw exceptions.nullSecretKey;

			value = applyEncrypt(value, this.encrypt.secret);
		}

		this.storage.store(key, value);
	};


	private execGet = ({ key }: RetrievedStorageItem): unknown => {
		if (!key || !key.length) throw exceptions.nullKey;

		let value: string = this.storage.get(key) ?? '';

		// apply decryption if any
		if (this.encrypt) {
			if (!this.encrypt.secret || !this.encrypt.secret.length) throw exceptions.nullSecretKey;

			value = applyDecrypt(value, this.encrypt.secret);
		}

		// parse json
		if (value.length) {
			try {
				value = JSON.parse(value);
			}
			catch {
				// parsing from json will fail if
				// retrieved value is an 8byte (is that what crypto-js said?) encrypted item
				throw exceptions.retrievingUndecryptedItem;
			}
		}

		// execute outbound transforms if any
		if (this.transforms.length) {
			this.transforms.forEach(t => {
				value = t.outbound(value);
			});
		}


		return value;
	};


	private execEject = ({ key }: DeletedStorageItem): void => {
		if (!key || !key.length) throw exceptions.nullKey;

		this.storage.eject(key);
	};


	public store = ({ key, value }: StorageItem): Promise<void> => {
		return Promise.resolve(this.execStore({ key, value }));
	}


	public get = (param: string | RetrievedStorageItem): Promise<unknown> => {
		if (typeof param == 'object') {
			return Promise.resolve(this.execGet({ key: param ?.key }));
		} else if (typeof param == 'string') {
			return Promise.resolve(this.execGet({ key: param }));
		} else {
			return Promise.reject();
		}
	}


	public eject = (param: string | DeletedStorageItem): Promise<void> => {
		if (typeof param == 'object') {
			return Promise.resolve(this.execEject({ key: param ?.key }));
		} else if (typeof param == 'string') {
			return Promise.resolve(this.execEject({ key: param }));
		} else {
			return Promise.reject();
		}
		// return (new Promise((resolve, reject) => {
		// 	resolve(this.execEject({ key }));
		// })) as Promise<void>;
	}

}



export default Cella;