import React, { useState }from "react";
import PageTemplate from '../components/templatePeopleListPage'
import { getPopularPeoples } from "../api/people-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const PopularPeoples = (props) => {

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery(["popularpeoples", {page: page}], getPopularPeoples);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const nextClickHandler = (event) => {
    let currentpage = page;
    currentpage = currentpage +1 ;
    setPage(currentpage);
   }
   const previousClickHandler = (event) => {
    let currentpage = page;
    if(currentpage ==1)
    {

    }
    else{
      currentpage = currentpage -1 ;
    }
    setPage(currentpage);
   }

  const peoples = data ? data.results : [];

  return (
    <>
    <div>
    <PageTemplate
    title="Popular People"
    peoples={peoples}
    action={(people) => {
      return <div people={people} />
    }}
  />

      <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} disabled={page == 1? true:false} onClick={previousClickHandler}>Previous</button>
      <span style={{ backgroundColor: "#ff4557", margin:3,padding:5,borderRadius:3, color: "white"}}> {page} </span>
      <button style={{backgroundColor: "#646496", color: "white", padding:5, borderRadius: 5, marginTop: 5}} onClick= {nextClickHandler}>Next</button>
    </div>
  </>
  );
};
export default PopularPeoples;