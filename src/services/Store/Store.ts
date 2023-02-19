import EventBus from './../../utils/EventBus';

type Indexed<T = unknown> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private state: Indexed = {};

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state[path] = value;

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
