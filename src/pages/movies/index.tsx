import Page from "../../components/Page";
import MoviesCardView from "./moviesCardView";
import { theMovieURL } from "../../utils/moviesURL";
import { Grid } from "@material-ui/core";
export default function Movies() {
  return (
    <Page
      title="Movies list"
      description="you can view your movies list"
      key="movies,list"
    >
      {/* <MoviesCardView title="Latest Movie" fetchURL={theMovieURL.fetchLatestMovie} /> */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MoviesCardView
            title="Popular Movie"
            fetchURL={theMovieURL.fetchPopularMovie}
          />
        </Grid>
      </Grid>
    </Page>
  );
}
