import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';

type ParamsType = {
  href?: string;
  onClick?: any;
};

const button = (text: string, type: string = 'default', params: ParamsType) => {
  if (type === 'link') {
    return tplLink({ text, type, href: params.href });
  }

  return tplBtn({ text, type, onClick: params.onClick });
};

export default button;
