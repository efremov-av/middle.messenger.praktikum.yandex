import AuthActions from '../../actions/AuthActions';
import Block from '../../components/common/Block';
import { Routes } from '../../utils/constants';

interface BlockCounstuctor<P extends Record<string, any> = any> {
  new (props: P): Block<P>;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: BlockCounstuctor,
    private readonly query: string,
    public props: Record<string, any>
  ) {}

  leave() {
    if (this.block) {
      this.block.element.remove();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass(this.props);

      render(this.query, this.block);
      return;
    }
    render(this.query, this.block);
  }
}

export class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: BlockCounstuctor, props: Record<string, any> = {}) {
    const route = new Route(pathname, block, this.rootQuery, props);
    this.routes.push(route);

    return this;
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private async checkAuth() {
    const user = await AuthActions.getUser();
    if (!user) {
      this.go(Routes.SignIn);
    }
  }

  public async start() {
    if (window.location.pathname !== Routes.SignIn && window.location.pathname !== Routes.SignUp) {
      this.checkAuth();
    }

    window.onpopstate = async (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      if (
        target.location.pathname !== Routes.SignIn &&
        target.location.pathname !== Routes.SignUp
      ) {
        this.checkAuth();
      }

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router('#root');
