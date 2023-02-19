import Block from '../../components/common/Block';
import store from './store';

interface BlockCounstuctor<P extends Record<string, any> = any> {
  new (props: P): Block<P>;
}
const connect = (block: BlockCounstuctor, mapStateToProps: any) => {
  return class extends block {
    constructor(props = {}) {
      super({ ...props, ...mapStateToProps(store.getState()) });
    }
  };
};

export default connect;
