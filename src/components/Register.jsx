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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import env from "../assets/enviroments";

// import Swal from "sweetalert2";

export default function Register(params) {
  //form
  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios.post(env.apiUrl +"/auth/create", { ...data, role });
    console.log({ ...data, role });
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

  //role
  const [role, setRole] = useState("student");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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
              error={errors.code ? true : false}
              {...registerUser("code", { required: true })}
              id="outlined-basic"
              label="code"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...registerUser("address")}
              id="outlined-basic"
              label="address"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...registerUser("phone")}
              id="outlined-basic"
              label="phone"
              variant="outlined"
              fullWidth
            />
            <TextField
              {...registerUser("club")}
              id="outlined-basic"
              label="club"
              variant="outlined"
              fullWidth
            />
            <FormControl>
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
            </FormControl>
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
