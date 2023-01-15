import tpl from './tpl.hbs';
import './style.scss';

const pagesList = (pages) => {
  return tpl({
    pages,
  });
};

export default pagesList;
