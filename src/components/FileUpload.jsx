import React,{useState, useContext} from 'react'
import axios from "axios";
import env from "../assets/enviroments";
import * as XLSX from "xlsx";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { StudentContext } from "../contexts/studentContext";

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


export default function FileUpload(params) {

    const { isMobile } = useContext(StudentContext);

    let [file, setFile] = useState([]);
    let [fileTeacher, setFileTeacher] = useState([]);
    let [loading, setLoading] = useState(false);


    const handleUpload = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        formData.append("additionalData", JSON.stringify({
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
            setFile([]);
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
            setFileTeacher([]);
            Swal.fire("อัปโหลดสําเร็จ", "", "success");
        })
        .catch(error => {
            setLoading(false);
            console.error("There was an error uploading the file!", error);
            Swal.fire("อัปโหลดไม่สําเร็จ", "", "error");
            setFileTeacher([]);
        });
    };

    const handleDownloadTemplate = () => {
        const data = [
            ["number", "code", "Preface", "firstName", "lastName", "grade"]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

        XLSX.writeFile(workbook, "templateClub.xlsx");
    };


    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={isMobile ? ('grid place-items-center gap-10 text-sm'):('grid place-items-center gap-10')} >


                <div className='flex gap-10 px-2'>     

                    <div className={isMobile ? ('bg-slate-200 p-2 rounded'):('bg-slate-200 p-5 rounded')}>
                        <div className={isMobile ? ('flex gap-3'):('flex gap-10')} >
                            <Button onClick={handleDownloadTemplate} variant="contained" sx={isMobile ? ({fontSize: '10px'}):({})}>Dowload Template</Button>
                            <Button
                            sx={isMobile ? ({fontSize: '10px'}):({})}
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
                            <Button sx={isMobile ? ({fontSize: '10px'}):({})} onClick={handleUpload} variant="contained">Upload</Button>
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
                
                <div className={isMobile ? ('bg-slate-500 p-2 rounded '):('bg-slate-500 p-5 rounded ')} >
                    <div className={isMobile ? ('flex gap-3'):('flex gap-10')}>
                        <Button
                        sx={isMobile ? ({fontSize: '10px'}):({})}
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
                        <Button sx={isMobile ? ({fontSize: '10px'}):({})} onClick={handleUploadTeacher} variant="contained">Upload</Button>
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
