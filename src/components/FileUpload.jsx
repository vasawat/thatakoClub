import React,{useState} from 'react'
import axios from "axios";
import env from "../assets/enviroments";


import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Swal from 'sweetalert2';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};



export default function FileUpload(params) {

    let [file, setFile] = useState([]);
    let [fileTeacher, setFileTeacher] = useState([]);
    let [loading, setLoading] = useState(false);

    const [grade, setGrade] = useState('');

    const handleChangeGrade = (event) => {
        setGrade(event.target.value);
    };

    const handleUpload = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        formData.append("additionalData", JSON.stringify({
            grade: grade,
            role: "นักเรียน",
        }));

        axios.post(env.apiUrl +"/user/uploadFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            setLoading(false);
            console.log(response.data);
            Swal.fire("อัปโหลดสําเร็จ", "", "success");
        })
        .catch(error => {
            setLoading(false);
            console.error("There was an error uploading the file!", error);
            Swal.fire("อัปโหลดไม่สําเร็จ", "", "error");
            setFile([]);
        });
    };

    const handleUploadTeacher = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", fileTeacher);

        formData.append("additionalData", JSON.stringify({
            role: "ครู",
        }));

        axios.post(env.apiUrl +"/user/uploadFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            setLoading(false);
            console.log(response.data);
            Swal.fire("อัปโหลดสําเร็จ", "", "success");
        })
        .catch(error => {
            setLoading(false);
            console.error("There was an error uploading the file!", error);
            Swal.fire("อัปโหลดไม่สําเร็จ", "", "error");
            setFile([]);
        });
    };


    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='grid place-items-center gap-10'>

                <div className='flex gap-10'>     

                    <div className='bg-slate-200 p-5 rounded '>
                        <div className='flex gap-10'>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">ระดับชั้น</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={grade}
                                    label="ระดับชั้น"
                                    onChange={handleChangeGrade}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'ม.1/1'}>ม.1/1</MenuItem>
                                        <MenuItem value={'ม.1/2'}>ม.1/2</MenuItem>
                                        <MenuItem value={'ม.1/3'}>ม.1/3</MenuItem>
                                        <MenuItem value={'ม.1/4'}>ม.1/4</MenuItem>
                                        <MenuItem value={'ม.1/5'}>ม.1/5</MenuItem>
                                        <MenuItem value={'ม.1/6'}>ม.1/6</MenuItem>
                                        <MenuItem value={'ม.2/1'}>ม.2/1</MenuItem>
                                        <MenuItem value={'ม.2/2'}>ม.2/2</MenuItem>
                                        <MenuItem value={'ม.2/3'}>ม.2/3</MenuItem>
                                        <MenuItem value={'ม.2/4'}>ม.2/4</MenuItem>
                                        <MenuItem value={'ม.2/5'}>ม.2/5</MenuItem>
                                        <MenuItem value={'ม.2/6'}>ม.2/6</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Button
                                component="label"
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                >
                                Upload files นักเรียน
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => {
                                        setFile(event.target.files[0]);
                                    }}
                                    multiple
                                />
                            </Button>
                            <Button onClick={handleUpload} variant="contained">Upload</Button>
                        </div>

                        {file?.name && 
                            <div className='flex align-middle mt-5'>
                                <p>{file?.name}</p>
                                <IconButton aria-label="delete" size="small" onClick={() => setFile([])}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </div>
                        } 
                    </div>
                </div>
                


                <div className='bg-slate-500 p-5 rounded '>
                    <div className='flex gap-10'>
                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            >
                            Upload files ครู
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => {
                                    setFileTeacher(event.target.files[0]);
                                }}
                                multiple
                            />
                        </Button>
                        <Button onClick={handleUploadTeacher} variant="contained">Upload</Button>
                    </div>

                    {fileTeacher?.name && 
                        <div className='flex align-middle mt-5'>
                            <p>{fileTeacher?.name}</p>
                            <IconButton aria-label="delete" size="small" onClick={() => setFileTeacher([])}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </div>
                    } 
                </div>
                
            </div>
        </>
        
    )
};
