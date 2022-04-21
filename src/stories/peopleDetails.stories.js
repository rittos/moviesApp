import React from "react";
import PeopleDetails from "../components/peopleDetails";
import SamplePeople from "./samplePeopleData";
import { MemoryRouter } from "react-router-dom";
// import MoviesContextProvider from "../contexts/moviesContext"

export default {
  title: "People Details Page/PeopleDetails",
  component: PeopleDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    // (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
};

export const Basic = () => <PeopleDetails people={SamplePeople} />;
Basic.storyName = "Default";