interface IChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: IUser;
    time: string;
    content: string;
  } | null;
}

interface IMessage {
  content: string | null;
  type: string;
  time: string;
  file: File | null;
  chat_id: number;
  is_read: boolean;
  user_id: number;
  id: number;
}
