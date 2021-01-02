export interface StorageItem {
	key: string,
	value: any,
	encrypt?: {
		secret: string
	}
}


export interface RetrievedStorageItem {
	key: string,
	decrypt?: {
		secret: string
	}
}


export interface DeletedStorageItem {
	key: string
}


export interface StorageEngine {
	get: (key: string) => string | null,
	store: (key: string, value: string) => void,
	eject: (key: string) => void
}

export type SpecifiedStorageEngine = {
	type: 'localStorage'
} | {
	type: 'indexedDB',
	name: string
}

export type CellaInstance = {
	storage?: SpecifiedStorageEngine | StorageEngine
}

