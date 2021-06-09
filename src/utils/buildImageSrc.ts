import { Photo } from 'API/types';

export const buildImageSrc = ({ farm, server, id, secret }: Photo) => {
  const domain = `https://farm${farm}.staticflickr.com`;
  const path = `${server}/${id}_${secret}_m.jpg`;
  return `${domain}/${path}`;
};
