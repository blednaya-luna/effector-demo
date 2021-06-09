export type Payload = {
  query: string;
};

export type Photo = {
  farm: string;
  server: string;
  id: string;
  secret: string;
  title: string;
};

export type ResponseDone = {
  stat: 'ok';
  photos: {
    photo: Photo[];
  };
};

export type ResponseFail = {
  stat: 'fail';
  message: string;
};
