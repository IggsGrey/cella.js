import { DeletedStorageItem, CellaInstance, RetrievedStorageItem, StorageEngine, StorageItem, TransformObject } from '../declarations';
declare class Cella {
    storage: StorageEngine;
    transforms: TransformObject[];
    encrypt: Record<'secret', string> | undefined;
    private defaultStorage;
    constructor(props?: CellaInstance);
    private execStore;
    private execGet;
    private execEject;
    store: ({ key, value }: StorageItem) => Promise<void>;
    get: (param: string | RetrievedStorageItem) => Promise<unknown>;
    eject: (param: string | DeletedStorageItem) => Promise<void>;
}
export default Cella;
