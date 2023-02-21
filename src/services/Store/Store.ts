import EventBus from './../../utils/EventBus';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};
  private static STORE_NAME = 'mainStore';
  private static instance: any;

  constructor() {
    if (Store.instance) {
      return Store.instance;
    }

    super();

    const savedState = undefined; // localStorage.getItem(Store.STORE_NAME);

    this.state = savedState ? JSON.parse(savedState) ?? {} : {};

    Store.instance = this;

    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this.state));
    });
  }

  public getState() {
    return this.state;
  }

  public removeState() {
    this.state = {};
    this.emit(StoreEvents.Updated);
  }

  public set(path: string, value: unknown) {
    this.state[path] = value;

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
