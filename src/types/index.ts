import { FormValidator } from '../utils/validators';

export interface InputProps {
  id: string,
  type: string,
  name: string,
  placeholder?: string,
  label?: string,
  validator?: FormValidator,
  class?: string,
  value?: string,
  error?: string,
  onError?: (error: string) => void,
}

export interface ButtonProps {
  id: string,
  type?: string,
  isRounded?: boolean,
  isRed?: boolean,
  content: string,
  events?: {
    click?: (e: Event) => void,
  }
}

export interface LinkProps {
  id?: string,
  href?: string,
  class?: string,
  datapage?: string,
  content: string,
  events?: {
    click?: (e: Event) => void,
  }
}

export interface ErrorPageProps {
  error: string;
  content: string;
}

export interface PopupProps {
  closePopup: () => void;
  chatId?: string,
  updateInfo?: () => void;
}



