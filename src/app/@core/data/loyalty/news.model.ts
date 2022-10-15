
export interface NewsModel
{
  id: string;
  title: string;
  imageId: string;
  imageName: string;
  text: string;
  commentable: boolean;
}

export const newsModelInit: NewsModel = {
  id: '',
  title: '',
  imageId: '',
  commentable: false,
  imageName: '',
  text: ''
};

export interface NewsGrid
{
  id: string;
  title: string;
  date: string;
  state: string;
  commentsCount: number;
}

export interface CommentModel
{
  id: string;
  name: string;
  userType: string;
  selected: boolean;
  comment: string;
  date: string;
  answer: string;
  showAnswer: boolean;
  editable: boolean;
}
