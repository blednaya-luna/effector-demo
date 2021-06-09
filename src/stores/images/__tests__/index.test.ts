import { $query, setQuery, fetchImagesFx, $images, $error } from '..';
import { createEvent } from 'effector';

describe('images store', () => {
  test('should change query', () => {
    expect($query.getState()).toBe('');

    setQuery('anime');

    expect($query.getState()).toBe('anime');
  });

  describe('fetch images', () => {
    const reset = createEvent();

    beforeEach(() => {
      $images.reset(reset);
      $error.reset(reset);
    });

    test('fetch images done', async () => {
      expect($images.getState()).toEqual([]);
      expect($error.getState()).toBe(null);

      fetchImagesFx.use(() => ({
        stat: 'ok',
        photos: {
          photo: [
            {
              farm: 'farm',
              server: 'server',
              id: 'id',
              secret: 'secret',
              title: 'title',
            },
          ],
        },
      }));

      await fetchImagesFx({ query: 'query' });

      expect($images.getState()).toEqual([
        {
          id: 'id',
          title: 'title',
          src: 'https://farmfarm.staticflickr.com/server/id_secret_m.jpg',
        },
      ]);
      expect($error.getState()).toBe(null);

      reset();
    });

    test('fetch images fail', async () => {
      expect($images.getState()).toEqual([]);
      expect($error.getState()).toBe(null);

      fetchImagesFx.use(() =>
        Promise.reject({
          stat: 'fail',
          message: 'error message',
        }),
      );

      try {
        await fetchImagesFx({ query: 'query' });
      } catch (e) {
        expect($images.getState()).toEqual([]);
        expect($error.getState()).toEqual('error message');
      }
    });

    reset();
  });
});
