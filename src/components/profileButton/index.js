import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';

const profileButton = (text, type = 'default', style = 'default', params) => {
  if (type === 'link') {
    return tplLink({ text, style, href: params.href });
  }

  return tplBtn({ text, style, onClick: params.onClick });
};

export default profileButton;
