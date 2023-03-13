import { expect } from 'chai';
import Handlebars from 'handlebars';
import Block from '../src/components/common/Block';

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

describe('Block', function () {
  const component = new TestComponent({ text: 'Hello world!' });

  it('В дом должен подставится HTML из компонента', () => {
    const root = global.document.querySelector('#root') as HTMLElement;
    root.appendChild(component.getContent()!);

    expect(global.document.body.innerHTML).to.contain('<div>Hello world!</div>');
  });

  it('Компонент должен обновиться при изменении пропсов', () => {
    component.setProps({ text: 'Hello Yandex!' });

    expect(component.getContent().textContent).equal('Hello Yandex!');
  });
});
