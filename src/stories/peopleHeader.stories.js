import React from "react";
import PeopleHeader from "../components/headerPeople";
import SamplePerson from "./samplePeopleData";
import { MemoryRouter } from "react-router";

export default {
  title: "People Details Page/PeopleHeader",
  component: PeopleHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],  
};

export const Basic = () => <PeopleHeader people={SamplePerson} />;
Basic.storyName = "Default";