import React from "react";
import { useParams } from "react-router-dom";
import PeopleDetails from "../components/peopleDetails";
import PageTemplate from "../components/templatePeoplePage";
import { getPeopleDetails } from '../api/people-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const PeopleDetailsPage = (props) => {
  const { id } = useParams();

  const { data: people, error, isLoading, isError } = useQuery(
    ["people", { id: id }],
    getPeopleDetails
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {people ? (
        <>
          <PageTemplate people={people}>
            <PeopleDetails people={people} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for people details</p>
      )}
    </>
  );
};

export default PeopleDetailsPage;