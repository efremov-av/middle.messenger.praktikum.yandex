import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';

export class MainPage extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(tpl, {});
  }
}
