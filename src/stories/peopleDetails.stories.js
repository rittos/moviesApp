import React from "react";
import PeopleDetails from "../components/peopleDetails";
import SamplePeople from "./samplePeopleData";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
// import MoviesContextProvider from "../contexts/moviesContext"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});
export default {
  title: "People Details Page/PeopleDetails",
  component: PeopleDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    // (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export const Basic = () => <PeopleDetails people={SamplePeople} />;
Basic.storyName = "Default";