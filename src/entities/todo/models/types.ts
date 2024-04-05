export interface IToDo {
  _id: string;
  name: string;
  description: string;
  progress: number;
}

export interface ISocketResponse {
  _id: string;
  progress: number;
}
