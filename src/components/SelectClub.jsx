import React, { useEffect, useState, useContext } from "react";
import "./SelectClub.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import axios from "axios";
import env from "../assets/enviroments";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


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
    axios.post(env.apiUrl +"/club/create", { ...data }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "สร้างชุมนุมสําเร็จ",
          text: "ชุมนุมของคุณได้ถูกสร้างเรียบร้อยแล้ว",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
        getAllClub();
      }
    })
  };

  function getAllClub() {
    axios.get(env.apiUrl +"/club/getAllClubs").then((response) => {
      setAllClubs(response.data);
    });
  }

  useEffect(() => {
    getAllClub();
  }, []);

  return (
    <div className={isMobile ? "flex flex-col items-center text-white py-5" : "flex flex-col items-center text-white"} >
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
            เพิ่มชุมนุม
          </p>
          <TextField
            {...register("clubName", { required: true })}
            error={errors.clubName ? true : false}
            sx={{ my: 4 }}
            label="ชื่อชุมนุม"
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


    <div className="m-5 flex justify-center">
      <p className={isMobile ? "text-xl cursor-auto bg-dark text-light py-3 px-5 " : "text-3xl cursor-auto bg-dark text-light py-3 px-5"} >
        ชุมนุมทั้งหมดประจำปี 2567
      </p>
      {userHaveToken && (
        <Button onClick={handleOpen} variant="contained" sx={{ background: "green", '&:hover': { background: 'darkgreen' } }} >
          เพิ่มชุมนุม
        </Button>
      )}
    </div>

    <div className={isMobile ? "grid place-items-center gap-2 " : "grid place-items-center grid-cols-2 gap-4 mb-10 "} style={{ color: "black" }}> 
      {allClubs.map((club) => (
        <div key={club._id} className={isMobile ? "w-80" : "w-96 p-3 rounded "} style={{ backgroundColor: "#DEDAD5" }}>
          <div className="p-5 rounded" style={{ backgroundColor: "#DEDAD5", border: "3px solid black" }}>
                      <div className="flex justify-between items-center ">
                        <div className="flex gap-2 items-center">
                          <div className={club.currentStudents >= club.maxStudents ? "w-3 h-3 rounded-full bg-red-500" : "w-3 h-3 rounded-full bg-green-500"}></div>
                            <div className={isMobile ? "text-sm" : "text-xl"}>
                              {club.name}
                            </div>
                        </div>
                        

                          <Button size={isMobile ? "small" : "medium"} color="dark" variant="outlined"><Link to={`/clubDetail/${club._id}`}>ดูเพิ่มเติม</Link></Button>

                      </div>
                      
                      <div className={isMobile ? "text-sm" : "text-sm"}>
                        ปัจจุบัน {club.currentStudents} / {club.maxStudents} คน
                      </div>
          </div>
            

        </div>
      ))}

    </div>




      

      

    </div>
  );
}
