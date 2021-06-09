import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useStore } from 'effector-react';
import {
  Container,
  Typography,
  TextField,
  IconButton,
  Grid,
  CircularProgress,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

import {
  $query,
  $images,
  $isLoading,
  $error,
  setQuery,
  fetchImagesFx,
} from 'stores/images';

export const Home: React.FC = () => {
  const query = useStore($query);
  const images = useStore($images);
  const isLoading = useStore($isLoading);
  const error = useStore($error);

  const handleQueryChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  const loadImages = () => {
    fetchImagesFx({ query });
  };

  const textFieldOnPressEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      loadImages();
    }
  };

  return (
    <main>
      <section>
        <Container maxWidth="sm">
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h1">Flickr images</Typography>
            </Grid>
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <TextField
                    label="Search..."
                    helperText="Write something in this field"
                    value={query}
                    onChange={handleQueryChange}
                    onKeyDown={textFieldOnPressEnter}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={loadImages}>
                    <Search />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                {isLoading ? (
                  <CircularProgress />
                ) : error ? (
                  <>
                    <Typography variant="h4" color="error" align="center">
                      😰 Something went wrong 😰
                    </Typography>
                    <Typography variant="h6" color="error" align="center">
                      {error}
                    </Typography>
                  </>
                ) : (
                  <GridList cols={3}>
                    {images.map(({ id, title, src }) => (
                      <GridListTile key={id}>
                        <img src={src} alt={title} />
                        <GridListTileBar title={title} />
                      </GridListTile>
                    ))}
                  </GridList>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </main>
  );
};
