import Block from '../../components/common/Block';
import store, { StoreEvents } from './Store';

export interface BlockCounstuctor<P extends Record<string, any> = any> {
  new (props: P): Block<P>;
}
const Connect = (block: BlockCounstuctor, mapStateToProps: any): BlockCounstuctor => {
  return class extends block {
    constructor(props = {}) {
      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
};

export default Connect;
