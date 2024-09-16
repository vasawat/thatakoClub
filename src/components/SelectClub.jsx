import React, { useEffect, useState, useContext } from "react";
import "./SelectClub.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import env from "../assets/enviroments";

// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";


// import Table from '@mui/material/Table';
// import { styled } from '@mui/material/styles';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { StudentContext } from "../contexts/studentContext";

export default function SelectClub(params) {

  const { isMobile, userHaveToken } = useContext(StudentContext);

  const [allClubs, setAllClubs] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };



  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    handleClose();
    console.log(data);
    axios.post(env.apiUrl +"/club/create", { ...data });
  };

  useEffect(() => {
    axios.get(env.apiUrl +"/club/getAllClubs").then((response) => {
      setAllClubs(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center text-white ">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-3xl cursor-auto bg-dark text-light py-3 px-5 text-white">
            เพิ่มชมรม
          </p>
          <TextField
            {...register("clubName", { required: true })}
            error={errors.clubName ? true : false}
            sx={{ my: 4 }}
            label="ชื่อชมรม"
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register("maxStudents", { required: true })}
            error={errors.maxStudent ? true : false}
            sx={{ mb: 4 }}
            label="จํานวนนักเรียน"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained">
            บันทึก
          </Button>
        </Box>
      </Modal>


    <div className="my-10 flex justify-center">
      <p className="text-3xl cursor-auto bg-dark text-light py-3 px-5 ">
        ชมรมทั้งหมดประจำปี 2567
      </p>
      {userHaveToken && (
        <Button onClick={handleOpen} variant="contained" sx={{ background: "green", '&:hover': { background: 'darkgreen' } }} >
          เพิ่มชมรม
        </Button>
      )}
    </div>

    <div className={isMobile ? "grid place-items-center gap-2" : "grid place-items-center grid-cols-2 gap-4 mb-10"}>
      {allClubs.map((club) => (
        <Card sx={ isMobile ? { width: 300 } : { width: 400 } } key={club._id}>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className={club.currentStudents >= club.maxStudents ? "w-3 h-3 rounded-full bg-red-500" : "w-3 h-3 rounded-full bg-green-500"}></div>

                <div className={isMobile ? "text-sm" : "text-xl"}>
                  {club.name}
                </div>
              </div>
              
              <CardActions>
                <Button size={isMobile ? "small" : "medium"}><Link to={`/clubDetail/${club._id}`}>ดูเพิ่มเติม</Link></Button>
              </CardActions>
            </div>
            
            <div className={isMobile ? "text-sm" : "text-sm"}>
              ปัจจุบัน {club.currentStudents} คน / {club.maxStudents} คน
            </div>
          </CardContent>

        </Card>
      ))}
    </div>



      

      

    </div>
  );
}
