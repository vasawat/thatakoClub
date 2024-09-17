import "./LoginRegister.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import env from "../assets/enviroments";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function Register(params) {

  const navigate = useNavigate();
  
  const {
    register: registerUser,
    handleSubmit,
    reset: resetUser,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios.post(env.apiUrl +"/auth/create", data ).then((res) => {
      if (res.status === 200) {
        Swal.fire("ลงทะเบียนสําเร็จ", "", "success");
        resetUser();
        navigate("/");
      } else {
        Swal.fire(res.data.message, "", "error");
      }
    })
  };

  //password
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="sm:w-2/3 md:w-3/4 p-3 md:p-5 bg-white shadow-2xl rounded text-center">
        <p className="text-2xl md:text-3xl my-3">ลงทะเบียน</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 md:mx-20">
            <TextField
              error={errors.name ? true : false}
              {...registerUser("name", { required: true })}
              id="outlined-basic"
              label="name"
              variant="outlined"
              fullWidth
            />
            <TextField
              error={errors.email ? true : false}
              {...registerUser("email", { required: true })}
              id="outlined-basic"
              label="email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                error={errors.password ? true : false}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...registerUser("password", { required: true })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <TextField
              {...registerUser("phone")}
              id="outlined-basic"
              label="phone"
              variant="outlined"
              fullWidth
            />
            {/* <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={role}
                onChange={handleRoleChange}
              >
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{ display: "flex", alignItems: "center", mx: 2 }}
                >
                  Role
                </FormLabel>
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label="นักเรียน"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio />}
                  label="ครู"
                />
              </RadioGroup>
            </FormControl> */}
          </div>

          <div>
            <Button type="submit" variant="contained" sx={{ px: 5, mt: 5 }}>
              ลงทะเบียน
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
}
