import React from "react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router-dom";
import MoviesContextProvider from "../contexts/moviesContext"
import AuthContextProvider from "../contexts/authContext";

export default {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    (Story) => <AuthContextProvider>{Story()}</AuthContextProvider>,
  ],
};

export const Basic = () => <MovieDetails movie={SampleMovie} />;
Basic.storyName = "Default";