import { useForm } from "react-hook-form";
import * as React from "react";
import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from "sweetalert2";
import env from "../assets/enviroments";


import { StudentContext } from "../contexts/studentContext";
import { useNavigate  } from "react-router-dom";

export default function Login(params) {

  const { checkToken } = useContext(StudentContext);

  const navigate = useNavigate();

  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post(env.apiUrl +"/auth/login", data).then((res) => {
      console.log(res.data.message);
      if (res.data.message === 'Login Successful') {
        localStorage.setItem("token", res.data.token);
        checkToken();
        navigate('/')
        Swal.fire("เข้าสู่ระบบสําเร็จ", "", "success");
      } else {
        Swal.fire(res.data.message, "", "error");
      }
    });
  };

  return (
<div className="w-full flex items-center justify-center">
  <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 p-3 md:p-5 bg-white shadow-2xl rounded text-center">
    <p className="text-2xl md:text-3xl my-3">เข้าสู่ระบบ</p>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
      <div className="px-5 md:px-10">
        <TextField
          error={errors.email ? true : false}
          {...login("email", { required: true })}
          id="outlined-basic"
          label="email"
          type="email"
          variant="outlined"
          sx={{ my: 2, md: { my: 4 }, width: "100%" }}
        />
      </div>

      <div className="px-5 md:px-10">
        <TextField
          error={errors.password ? true : false}
          {...login("password", { required: true })}
          id="outlined-basic"
          label="password"
          type="password"
          variant="outlined"
          sx={{ width: "100%", my: 2 }}
        />
      </div>

      <div>
        <Button type="submit" variant="contained" sx={{ px: 5, mt: 3, md: { mt: 5 } }}>
          บันทึก
        </Button>
      </div>
    </form>
  </div>
</div>

  );
}
