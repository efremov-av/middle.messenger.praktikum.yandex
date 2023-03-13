import { expect } from 'chai';
import { it } from 'mocha';
import Block from '../src/components/common/Block';
import Router from '../src/services/Router/Router';
import Handlebars from 'handlebars';

const template = '<div>{{text}}</div>';

type PropsType = {
  text: string;
};

class TestComponent extends Block<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }

  render(): DocumentFragment {
    const tpl = Handlebars.compile(template);
    return this.compile(tpl, {
      ...this.props,
    });
  }
}

describe('Router', () => {
  it('Должен вернуть роутер с тестовым роутом', () => {
    const result = Router.use('/test', TestComponent);
    expect(result).equal(Router);
  });

  it('Должен перейти по переданному пути', () => {
    Router.use('/', TestComponent);
    Router.use('/test', TestComponent);
    Router.go('/test');
    expect(window.location.pathname).equal('/test');
  });
});
