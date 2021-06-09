import { API_KEY } from './config';
import { Payload, ResponseDone, ResponseFail } from './types';

export const fetchImages = async ({ query }: Payload) => {
  const response = await fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${query}&per_page=24&format=json&nojsoncallback=1`,
  );
  const json: ResponseDone | ResponseFail = await response.json();
  if (json.stat === 'ok') {
    return json;
  } else {
    throw json;
  }
};
