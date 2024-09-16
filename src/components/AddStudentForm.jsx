import { useForm } from "react-hook-form";

import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddStudentForm(params) {

    const { register, handleSubmit } = useForm();

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                <div class="modal fade" id="addInfoModal" tabindex="-1" aria-labelledby="addInfoModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title text-dark" id="addInfoModalLabel">กรอกข้อมูลเลือกชมรม</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                        <TextField {...register("studentName")} sx={{ my:4}} label="ชื่อ-นามสกุล:" variant="outlined" fullWidth />
                        <TextField {...register("studentId")} sx={{ my:4}} label="รหัสนักเรียน:" variant="outlined" fullWidth />
                        <TextField {...register("studentNumber")} sx={{ my:4}} label="เลขที่นักเรียน:" variant="outlined" fullWidth />
                        <TextField {...register("clubType")} sx={{ my:4}} label="เลือกชมรม:" variant="outlined" 
                        slotProps={{
                            input: {
                            readOnly: true,
                            },
                        }} fullWidth />
                        

                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="ระดับชั้นที่ต้องการสมัคร:"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            <MenuItem value="มัธยมศึกษาปีที่1">มัธยมศึกษาปีที่1</MenuItem>
                            <MenuItem value="มัธยมศึกษาปีที่2">มัธยมศึกษาปีที่2</MenuItem>
                            <MenuItem value="มัธยมศึกษาปีที่3">มัธยมศึกษาปีที่3</MenuItem>
                            <MenuItem value="มัธยมศึกษาปีที่4">มัธยมศึกษาปีที่4</MenuItem>
                            <MenuItem value="มัธยมศึกษาปีที่5">มัธยมศึกษาปีที่5</MenuItem>
                            <MenuItem value="มัธยมศึกษาปีที่6">มัธยมศึกษาปีที่6</MenuItem>
                        </Select>

                        </div>
                        <div class="modal-footer">
                        <button type="button" >Close</button>
                        <Button type="submit" variant="contained">บันทึก</Button>
                        </div>
                    </div>
                    </div>
                </div>

            </form>
        </div>
    )
};
