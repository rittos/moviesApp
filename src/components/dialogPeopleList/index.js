import React from "react";
import Grid from "@material-ui/core/Grid";
import DialogPeopleCard from "../dialogPeopleCard";

const DialogPeopleList = ( {peoples, action, addbtnaction}) => {
  let peopleCards = peoples.map((m) => (
    <Grid key={m.id} item xs={12} sm={12} md={12} lg={12} xl={12}>
      <DialogPeopleCard key={m.id} people={m} action={action} addbtnaction={addbtnaction} />
    </Grid>
  ));
  return peopleCards;
};

export default DialogPeopleList;