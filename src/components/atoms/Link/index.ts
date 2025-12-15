import Block from '../../../framework/Block';
import { LinkProps } from '../../../types';
import template from './link.hbs?raw';

export class Link extends Block {
    constructor(props: LinkProps){
      super({
        ...props,
      });  
    }

    override render() {
        return template;
    }
};
