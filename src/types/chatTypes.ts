export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  created_by: number;
  unread_count: number;
  last_message?: LastMessage;
}

interface LastMessage {
    user: Record<string, string>;
    time: string,
    content: string,
    id: number,
};

export interface CurrentChatProps {
  currentChat?: Record<string,string>,
  onUpdateChats: () => void;
};

export interface ListChatsProps {
  onChangeChat: (currentChat: Record<string, string>) => void;
  onUpdateChats: () => void;
  allChats?: Record<string,string>;
}





