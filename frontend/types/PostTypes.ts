interface AuthorData {
  user_id: string;
  display_name: string;
  picture: string | null;
  rep: number;
}

interface Comment {
  id: number;
  msg: string;
  author: string;
  author_data: AuthorData;
  post: number;
}

export interface Post {
  id: number;
  title: string | null;
  author: string;
  author_data: AuthorData;
  likes: number;
  image: string;
  comments: ReadonlyArray<Comment>;
  timestamp: string;
}
