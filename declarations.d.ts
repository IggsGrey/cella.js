export interface StorageItem {
	key: string,
	value: any,
}


export interface RetrievedStorageItem {
	key: string,
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
	storage?: SpecifiedStorageEngine | StorageEngine,
	transforms?: TransformObject[],
	encrypt?: {
		secret: string
	}
}

export interface TransformObject {
	inbound: (args0: any) => any,
	outbound: (args0: any) => any,
}
