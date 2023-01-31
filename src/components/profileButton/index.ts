import tplBtn from './tplBtn.hbs';
import tplLink from './tplLink.hbs';
import './style.scss';

type ParamsType = {
  href?: string;
  onClick?: any;
};

const profileButton = (
  text: string,
  type: string = 'default',
  style: string = 'default',
  params: ParamsType,
) => {
  if (type === 'link') {
    return tplLink({ text, style, href: params.href });
  }

  return tplBtn({ text, style, onClick: params.onClick });
};

export default profileButton;
