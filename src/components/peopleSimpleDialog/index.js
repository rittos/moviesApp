import  React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import { getPopularPeoples } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import DialogPeopleList from '../dialogPeopleList';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    overflow:'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    // position:'absolute',
    // top:'10%',
    // left:'10%',
    // overflow:'scroll',
    height:'80%',
    // display:'block'
  };

  export default function PeopleSimpleDialog(prop) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const [page, setPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(["peoples", page], getPopularPeoples);
  
    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <h1>{error.message}</h1>;
    }

    return (
      <div>
        <Button onClick={handleOpen}>{prop.btnname}</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Popular actors
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Add your favourite actors to create your fantasy movie!
              <DialogPeopleList peoples={data.results} 
              addbtnaction ={prop.addbtnaction} 
              action={(people) => {
              return <div people={people} />
              }}>
              </DialogPeopleList>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
  