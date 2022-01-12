import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { theMovieURL, theMovieImageURL } from "../../utils/moviesURL";
import PageDataLoader from "../../components/PageDataLoader";
import {
  Grid,
  Card,
  Typography,
  Box,
  Badge,
  AppBar,
  Tabs,
  Tab,
  Avatar,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import Page from "../../components/Page";
import { fShortenNumber } from "../../utils/helper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function MovieDetail() {
  const classes = useStyles();
  let { id } = useParams();
  const fetchMovieDetailURl = theMovieURL.fetchMovieDetail;
  const fetchMovieCreditsURL = theMovieURL.fetchMovieCreditsDetail;
  const fetchMovieVideosURL = theMovieURL.fetchMovieVideosDetail;

  const [moviesData, setMoviesData] = useState<any>({});
  const [moviesCastData, setMoviesCatsData] = useState<any>([]);
  const [moviesVideosData, setMoviesVideosData] = useState<any>([]);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  console.log(id, moviesData, moviesVideosData);
  useEffect(() => {
    async function fetchMovieData(id: any) {
      try {
        const responseData = await axiosInstance.get(
          fetchMovieDetailURl.replace("{movie_id}", `${id}`)
        );
        responseData.data && setMoviesData({ ...responseData.data });
      } catch (error) {
        console.log("errorerror", error);
      }
    }
    id && fetchMovieData(id);
  }, [id]);

  useEffect(() => {
    async function fetchMovieCreditsData(id: any) {
      try {
        const responseCastData = await axiosInstance.get(
          fetchMovieCreditsURL.replace("{movie_id}", `${id}`)
        );
        responseCastData.data &&
          responseCastData.data.cast &&
          setMoviesCatsData([...responseCastData.data.cast]);
      } catch (error) {
        console.log("responseCastData errorerror", error);
      }
    }

    async function fetchMovieVideosData(id: any) {
      try {
        const responseMoviesData = await axiosInstance.get(
          fetchMovieVideosURL.replace("{movie_id}", `${id}`)
        );
        responseMoviesData.data &&
          responseMoviesData.data.results &&
          setMoviesVideosData([...responseMoviesData.data.results]);
      } catch (error) {
        console.log("responseCastData errorerror", error);
      }
    }
    if (moviesData.id) {
      fetchMovieCreditsData(id);
      fetchMovieVideosData(id);
    }
  }, [moviesData]);

  return (
    <Page
      title="Movies Detail"
      description="you can view your movies Detail"
      key="movies,Detail"
    >
      <PageDataLoader open={moviesData.id ? false : true} />
      {moviesData && (
        <>
          <Card>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} lg={3}>
                <img
                  src={`${theMovieImageURL}${moviesData.poster_path}`}
                  alt={moviesData.title}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Typography
                  variant="overline"
                  style={{
                    marginTop: 2,
                    marginBottom: 1,
                    display: "block",
                    color:
                      moviesData.status === "Released"
                        ? "error.main"
                        : "info.main",
                  }}
                >
                  {moviesData.status}
                </Typography>

                <Typography variant="h5" paragraph>
                  {moviesData.title}
                </Typography>
                {moviesData.genres &&
                  moviesData.genres.map((data: any) => {
                    return (
                      <Badge
                        key={data.id}
                        color="primary"
                        style={{ margin: 10 }}
                      >
                        {data.name}
                      </Badge>
                    );
                  })}
                <Box
                  style={{
                    marginBottom: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="customized-10"
                    defaultValue={moviesData.vote_average}
                    max={10}
                    precision={0.1}
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    style={{ color: "text.secondary" }}
                  >
                    ({fShortenNumber(moviesData.vote_count)}
                    reviews)
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="About" {...a11yProps(0)} />
                <Tab label="Cast" {...a11yProps(1)} />
                <Tab label="Videos" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Typography variant="body1">{moviesData.overview}</Typography>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                {moviesCastData &&
                  moviesCastData.map((cast: any) => (
                    <Grid key={cast.id} item xs={12} md={4}>
                      <Card
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: 10,
                        }}
                      >
                        <Avatar
                          alt={cast.name}
                          src={`${theMovieImageURL}${cast.profile_path}`}
                          style={{ width: 48, height: 48 }}
                        />
                        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                          <Typography variant="subtitle2" noWrap>
                            {cast.name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography
                              variant="body2"
                              style={{ color: "text.secondary" }}
                              noWrap
                            >
                              {cast.character
                                ? `as ${cast.character}`
                                : cast.known_for_department}
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                {moviesVideosData &&
                  moviesVideosData.slice(0,6).map(
                    (video: any) =>
                      video.site === "YouTube" &&
                      video.key && (
                        <Grid  key={video.key} item xs={12} md={4}>
                          <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${video.key}`}
                            width={"100%"}
                            height={"300px"}
                          />
                        </Grid>
                      )
                  )}
              </Grid>
            </TabPanel>
          </div>
        </>
      )}
    </Page>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
