import { ButtonProps } from "../types";
import Block from "./Block";

describe('Block', () => {
    let buttonBlock: new(props: ButtonProps) => Block;

    beforeEach(() => {
        class Button extends Block {
            constructor(props: ButtonProps) {
                super({...props});
            }

            render(){
                return `<div id={{id}}>{{content}}</div>`;
            }
        }
        buttonBlock = Button;
    });

    it('props передается в шаблон', () => {
        const textData = 'I am button';
        const button = new buttonBlock({ id: 'button', content: textData });

        button['eventBus']().emit('flow:render');

        const result = button.getContent() as HTMLElement;
        expect(result.innerHTML).toContain(textData);
    });

    it('обработка событий click', () => {
        const handler = jest.fn();
        const button = new buttonBlock({
            id: 'button',
            content: 'I am button',
            events: {click: handler}
        });

        button['eventBus']().emit('flow:render');

        const element = button.getContent() as HTMLElement;
        element.dispatchEvent(new MouseEvent('click'));
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('setprops вызывает render', () => {
        const button = new buttonBlock({
            id: 'button',
            content: 'I am button',
        });

        const renderSpy = jest.spyOn(button as any, '_render');
        button.setProps({ text: 'updated' });
        expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    it('show и hide меняют видимость', () => {
        const button = new buttonBlock({
            id: 'button',
            content: 'I am button',
        });

        const element = document.createElement('div');
        button['_element'] = element;
        
        button.show(); 
        expect(element.style.display).toBe('block');
        
        button.hide(); 
        expect(element.style.display).toBe('none');
    });
})  