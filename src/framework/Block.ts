import EventBus from './EventBus';
import Handlebars from 'handlebars';

interface Props { 
    attr?: Record<string, string>;
    events?: Record<string, EventListener>;
    [key: string]: unknown 
};

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    protected _element: HTMLElement | null = null;
    protected _id: number = Math.floor(1000000 + Math.random() * 9000000);

    protected props: Props;
    protected children: Record<string, Block>;

    protected eventBus: () => EventBus;

    constructor(propsWithChildren: Props) {
        const eventBus = new EventBus();
        
        const {children, props} = this._getChildren(propsWithChildren);
        this.props = this._makePropsProxy({...props});
        this.children = children;

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _addEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents(): void {
        const {events = {}} = this.props;

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    protected addAtributes(): void{
        const { attr = {}} = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            this._element?.setAttribute(key, value as string);
        });
    }

    private _getChildren(propsAndChildren: Props): {
        children: Record<string, Block>,
        props: Props
    }   {
        const children: Record<string, Block> = {};
        const props: Props = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block){
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return {children, props};
    }

    protected init(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(): void {
        const response = this.componentDidUpdate();
        if (!response){
            return;
        }
        this._render();
    }

    protected componentDidUpdate(): boolean {
        return true;
    }

    public setProps(nextProps: Props): void {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    private _render(): void {
        const currentProps = {...this.props};

        Object.entries(this.children).forEach(([key, child]) => {
            currentProps[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(currentProps);

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if(stub){
                stub.replaceWith(child.getContent());
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if(this._element && newElement){
            this._removeEvents();
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
        this.addAtributes();
    }

    render(): string {
        return '';
    }

    public getContent(): HTMLElement {
        if(!this._element){
            throw new Error('Element is not created');
        }
        return this._element;
    }

    private _makePropsProxy(props: Props): Props{
        const self = this;

        const proxyProps = new Proxy(props, {
            get(target: Props, prop: string){
                if(prop.indexOf('_') === 0){
                    throw new Error('Нет доступа');
                }

                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            set(target: Props, prop: string, value: unknown): boolean{
                if(prop.indexOf('_') === 0){
                    throw new Error('Нет доступа');
                }

                const oldTarget = {...target};
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },

            deleteProperty(): boolean {
                throw new Error('Нет доступа');
            },
        });

        return proxyProps;
    }

    private _createDocumentElement(tagName: string): HTMLTemplateElement {
        return document.createElement(tagName) as HTMLTemplateElement;
    }

    public show(): void {
        const content = this.getContent();
        if (content) content.style.display = 'block';
    }

    public hide(): void {
        const content = this.getContent();
        if (content) content.style.display = 'none';
    }
}




