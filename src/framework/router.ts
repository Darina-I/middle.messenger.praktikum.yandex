import Block from './Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block): HTMLElement {
  const root = document.querySelector(query) as HTMLElement;
  root.innerHTML = '';
  root.appendChild(block.getContent());
  return root;
}

class Route {
    private _pathname: string;
    private _blockClass: new (props?: unknown) => Block;
    private _block: Block | null = null;
    private _props: { rootQuery: string };

    constructor(pathname: string, blockClass: new (props?: unknown) => Block, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = blockClass;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render(): void {
        if (!this._block) {
            this._block = new this._blockClass({});
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }

    destroy(): void {
        if(this._block){
            const root = document.querySelector(this._props.rootQuery) as HTMLElement;
            if(root){
                root.innerHTML = '';
            }
            this._block.hide();
            this._block = null;
        }
    }
}

class Router {
    private static __instance: Router;
    public routes: Route[] = [];
    private history = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery: string;

    constructor(rootQuery: string = '#app' ) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname: string, blockClass: new (props?: unknown) => Block): this {
        const route = new Route(pathname, blockClass, {rootQuery: this._rootQuery});
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (() => {
            this._onRoute(window.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);

        if(!route){
          return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
            this._currentRoute.destroy();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname);
    }

    back(): void {
      this.history.back();
    }

    forward(): void {
      this.history.forward();
    }

    getRoute(pathname: string): Route | null {
        return this.routes.find(route => route.match(pathname)) || null;
    }
}

export default Router;
export { Route };



