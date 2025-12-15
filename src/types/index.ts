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
  content: string,
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

export interface PropsWithChangePage {
  onChangePage: (page: string) => void;
}


//Chat props
export interface ChatMessage {
  content: string;
  isToUser: boolean;
  time: string;
}

export interface Chat {
  id: number;
  withUser: string;
  islastMessageToUser: boolean;
  lastMessage: string;
  dateTime: string;
  countUnreadMessage?: number; 
  chat: ChatMessage[];
}

export interface ChatPageProps {
  chatMessages?: ChatMessage[]; 
  onChangePage: (page: string) => void;
  onChangeChat: (chatId: string) => void;
}

export interface CurrentChatProps {
  chatMessages?: Array<{ 
    content: string;
    isToUser: boolean;
    time: string;
  }>;
};

export interface ListChatsProps {
  onChangePage: (page: string) => void;
  onChangeChat: (chatId: string) => void;
}


export interface ErrorPageProps {
  error: string;
  content: string;
  onChangePage: (page: string) => void;
}



export interface ChangeAvatarProps {
  closePopup: () => void;
}



