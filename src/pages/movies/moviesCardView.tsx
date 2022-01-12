import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";

import {
  Box,
  CardHeader,
  Paper,
} from "@material-ui/core";
import Slider from "react-slick";

import axiosInstance from "../../utils/axiosInstance";
import { theMovieImageURL } from "../../utils/moviesURL";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    cardHeader: {
      padding: 0,
      marginBottom: theme.spacing(3),
      "& .MuiCardHeader-action": { alignSelf: "center" },
    },
    sliderDiv: {
      "& .slick-track":{
        display: "flex",
        "& > *": {
          margin: theme.spacing(2),
        },
      }
    },
    divImage: {
      width: "100%",
      height: "100%",
      borderRadius: 4,
    },
  })
);

interface Props {
  title: string;
  fetchURL: string;
}

export default function MoviesCardView({ title, fetchURL }: Props) {
  const carouselRef = useRef(Slider || null);
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [moviesData, setMoviesData] = useState<any[]>([]);
  // console.log(moviesData);

  
  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const responseData = await axiosInstance.get(fetchURL);
        responseData.data?.results &&
          setMoviesData([...responseData.data?.results]);
      } catch (error) {
        // console.log("errorerror", title, error);
      }
    }
    fetchData();
  }, []);

  const viewDetail=(id:number)=>{
    navigate(`/movies/${id}`);
  }

  return (
    <Box className={classes.root}>
      <CardHeader title={title} subheader={""} className={classes.cardHeader} />
      <Box className={classes.sliderDiv}>
        <Slider ref={carouselRef} {...settings}>
          {moviesData.slice(0, 8).map((movie) => {
            return <MovieCard key={movie.id} movie={movie} viewDetail={viewDetail}/>;
          })}
        </Slider>
      </Box>
    </Box>
  );
}

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string | null;
};

function MovieCard({ movie,viewDetail }: { movie: MovieCardProps,viewDetail: (id:number)=>void }) {
  const { id, title, poster_path } = movie;
  const classes = useStyles();
  return (
    <Paper onClick={()=>viewDetail(id)}>
      <Box style={{ position: "relative" }}>
        <img
          src={`${theMovieImageURL}${poster_path}`}
          alt={title}
          className={classes.divImage}
        />
      </Box>
    </Paper>
  );
}
