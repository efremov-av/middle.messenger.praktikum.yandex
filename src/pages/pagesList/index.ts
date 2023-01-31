import tpl from './tpl.hbs';
import './style.scss';

type PagesType = {
  name: string;
  url: string;
};

const pagesList = (pages: PagesType[]) => {
  return tpl({
    pages,
  });
};

export default pagesList;
