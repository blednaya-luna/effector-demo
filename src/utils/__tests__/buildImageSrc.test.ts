import { buildImageSrc } from '../buildImageSrc';

test('buildImageSrc', () => {
  const photo = {
    farm: 'farm',
    server: 'server',
    id: 'id',
    secret: 'secret',
    title: 'title',
  };

  const actual = buildImageSrc(photo);
  const expected = 'https://farmfarm.staticflickr.com/server/id_secret_m.jpg';

  expect(actual).toBe(expected);
});
