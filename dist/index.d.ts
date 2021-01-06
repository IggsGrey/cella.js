import { DeletedStorageItem, CellaInstance, RetrievedStorageItem, StorageEngine, StorageItem, TransformObject } from '../declarations';
declare class Cella {
    storage: StorageEngine;
    transforms: TransformObject[];
    encrypt: Record<'secret', string> | undefined;
    private defaultStorage;
    constructor(props?: CellaInstance);
    store: ({ key, value }: StorageItem) => void;
    get: ({ key }: RetrievedStorageItem) => unknown;
    eject: ({ key }: DeletedStorageItem) => void;
}
export default Cella;
