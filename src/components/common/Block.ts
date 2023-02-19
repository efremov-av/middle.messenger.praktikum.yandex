import { v4 as makeUUID } from 'uuid';
import EventBus from '../../utils/EventBus';

// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private id: string = makeUUID();
  protected props: P;
  public children: Record<string, Block | Block[]>;
  private eventBus: () => EventBus;
  private _element: HTMLElement;

  constructor(propsAndChilds: P) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChilds);

    this.children = children;
    this.props = this._makePropsProxy(props as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChilds: P) {
    const children: Record<string, Block | Block[]> = {};
    const props: Record<string, any> = {};

    Object.keys(propsAndChilds).forEach((key) => {
      const value = propsAndChilds[key];
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  public setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    const { children, props } = this._getChildren(nextProps);

    if (Object.values(children).length) Object.assign(this.children, children);

    if (Object.values(props).length) Object.assign(this.props, props);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();
    this._removeEvents();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: P) {
    const self = this;
    const proxyProps = new Proxy(props, {
      get(target: any, prop: string) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        }
      },
      set(target: any, prop: any, val: any) {
        if (prop.startsWith('_')) {
          throw new Error('Нет прав');
        } else {
          target[prop] = val;
          self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
          return true;
        }
      },
      deleteProperty(_target: any, _prop: any) {
        throw new Error('Нет прав');
      },
    });

    return proxyProps;
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  public show() {
    if (this._element) this._element.style.display = 'block';
  }

  public hide() {
    if (this._element) this._element.style.display = 'none';
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }
}

export default Block;
