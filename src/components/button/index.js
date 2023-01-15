import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';

const button = (text, type = 'default', params) => {
  if (type === 'link') {
    return tplLink({ text, type, href: params.href });
  }

  return tplBtn({ text, type, onClick: params.onClick });
};

export default button;
