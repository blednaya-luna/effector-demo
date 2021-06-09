import { createEvent, createStore, createEffect } from 'effector';

import { fetchImages } from 'API';
import { Payload, ResponseDone, ResponseFail } from 'API/types';
import { buildImageSrc } from 'utils/buildImageSrc';

import { Image } from './types';

export const setQuery = createEvent<string>();
export const $query = createStore<string>('').on(
  setQuery,
  (state, payload) => payload,
);

export const fetchImagesFx =
  createEffect<Payload, ResponseDone, ResponseFail>(fetchImages);

export const $isLoading = fetchImagesFx.pending;

export const $images = createStore<Image[]>([])
  .on(fetchImagesFx.doneData, (state, payload) =>
    payload.photos.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      src: buildImageSrc(photo),
    })),
  )
  .reset(fetchImagesFx.failData);

export const $error = createStore<string | null>(null)
  .on(fetchImagesFx.failData, (state, payload) => payload.message)
  .on(setQuery, (state, payload) => null);
