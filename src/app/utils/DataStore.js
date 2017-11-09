/**
 * 数据队列
 */
let instance = undefined;

class DataStore {
    constructor() {
        if (!instance) {
            this.dataStore = new Map();
            instance = this;
        }
        return instance;
    }

    push = (key, value) => {
        if (key === undefined) {
            console.error('The key is null!');
        } else if (this.dataStore.has(key)) {
            console.warn(`The key ${key} has existed in the store!`);
            this.set(key, value);
        } else {
            this.set(key, value);
        }
    }

    set = (key, value) => {
        if (key === undefined) {
            console.error('The key is null!');
        } else {
            this.dataStore.set(key, value);
        }
    }

    pop = (key) => {
        if (key === undefined) {
            console.error('The key is null!');
        }
        let value = this.dataStore.get(key);
        this.dataStore.delete(key);
        return value;
    }

    get = (key) => {
        if (key === undefined) {
            console.error('The key is null!');
        }
        return this.dataStore.get(key);
    }

    clear = () => {
        this.dataStore.clear();
    }
}

export default DataStore;
