import React from "react";
import Grid from "@material-ui/core/Grid";
import DialogPeopleCard from "../dialogPeopleCard";

const DialogPeopleList = ( {peoples, action, addbtnaction}) => {
  let peopleCards = peoples.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <DialogPeopleCard key={m.id} people={m} action={action} addbtnaction={addbtnaction} />
    </Grid>
  ));
  return peopleCards;
};

export default DialogPeopleList;