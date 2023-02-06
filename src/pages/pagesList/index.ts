import tpl from './tpl.hbs';
import './style.scss';
import Block from '../../components/common/Block';
import { pages } from '../../utils/constants';

type PagesType = {
  name: string;
  url: string;
};

type PropsType = {
  pages: PagesType[];
};
class PagesList extends Block {
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const signIn = new PagesList({
  pages,
});

export default signIn;
