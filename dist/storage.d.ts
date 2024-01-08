import { StorageEngine } from '../../declarations';
interface DefaultStorageEngines {
    localStorage: StorageEngine;
    indexedDB: (name: string) => StorageEngine;
}
declare const storage: DefaultStorageEngines;
export default storage;
