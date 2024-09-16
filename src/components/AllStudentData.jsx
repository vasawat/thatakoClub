import { useEffect, useState } from 'react'
import axios from 'axios';
import env from "../assets/enviroments";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete from '@mui/material/Autocomplete';

import StudentPDF from "../components/widgets/studentPDF";

export default function AllStudentData(params) {

    let [loading, setLoading] = useState(true);
    let [studentName, setStudentName] = useState([]);
    let [grade, setGrade] = useState();
    let [searchStudent, setSearchStudent] = useState("");
    let [searchGrade, setSearchGrade] = useState("");
    let [showData, setShowData] = useState([]);
    let [selectData, setSelectData] = useState({});
    let [openEdit, setOpenEdit] = useState(false);

    const { register: editData, handleSubmit: handleSubmitEdit , reset: resetEdit, formState: { errors: editErrors }} = useForm();


    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const handleOpenEdit = (data) => {
        setSelectData(data);
        setOpenEdit(true);
    }
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectData({});
        resetEdit();
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "คุณต้องการลบข้อมูลนี้หรือไม่",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#8C8C8C",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/user/deleteAllUsers/${id}`).then((res) => {
                if (res.status === 200) {
                    Swal.fire("ลบเรียบร้อย", "", "success");
                    getAllData();
                }else {
                    Swal.fire(res.data.message, "", "error");
                }
                })
            }
        });

        
    }
    const onSubmitEdit = (data) => {
        setOpenEdit(false);
        axios.put(`http://localhost:5000/user/updateAllUsers/${selectData._id}`, data).then((res) => {
            if (res.status === 200) {
                Swal.fire("แก้ไขเรียบร้อย", "", "success");
                getAllData();
            }else {
                Swal.fire(res.data.message, "", "error");
            }
            
        })
        setSelectData({});
        resetEdit();
    }
    const getAllData = () => {
        setSearchGrade("");
        setSearchStudent("");
        axios
        .get(env.apiUrl +"/user/getAllUsers")
        .then((res) => {
            setShowData(res.data.student);
            console.log(res.data);

            const stdName = res.data.student.map((item) => item.firstName);
            setStudentName(stdName);
            loadingService();
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
        });
    };
    const searchData = () => {
        let firstNameSearch = searchStudent;
        let gradeSearch = searchGrade;

        if (!firstNameSearch && !gradeSearch) {
            Swal.fire("กรุณากรอกข้อมูลสำหรับการค้นหา", "", "warning");
            return;
        } 

        axios
        .post(env.apiUrl +"/user/searchAllUsers", { firstNameSearch, gradeSearch })
        .then((res) => {
            if (res.status === 204) {
            Swal.fire("ไม่พบข้อมูล", "", "error");
            } else {
            loadingService();
            setShowData(res.data);
            }
        })
        .catch((err) => {
            Swal.fire("เกิดข้อผิดพลาด", err.message, "error");
        });
    };
    const loadingService = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    
    useEffect(() => {
        getAllData();
        setGrade(['ม.1/1', 'ม.1/6']);
    // eslint-disable-next-line    
    }, []);

    return (
        <>

        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>


        

        <div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='w-2/3 flex bg-white p-4 align-middle justify-between'>
                <div className='flex items-center gap-2'>
                    <Autocomplete
                        disablePortal
                        options={studentName}
                        sx={{ width: 200 }}
                        onChange={(event, newValue) => {
                            setSearchStudent(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="ชื่อต้น" />}
                        />
                    <Autocomplete
                        disablePortal
                        options={grade}
                        sx={{ width: 200 }}
                        onChange={(event, newValue) => {
                            setSearchGrade(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="ระดับชั้น" />}
                        />
                        <p className='flex '>จำนวนข้อมูล: {showData.length}</p>
                </div>

                <div className='flex items-center gap-2'>
                    <Button variant="contained" onClick={searchData}>ค้นหา</Button>
                    <Button variant="contained" onClick={() => getAllData()}>รีเซต</Button>
                    <div>
                        {showData.length > 0 ? (
                        <StudentPDF data={showData} />
                        ) : (
                        <p>กำลังโหลดข้อมูล...</p>
                        )}
                    </div>
                </div>
                    
            </div>
            <div className='w-2/3 overflow-auto'>
                {
                    showData.length === 0 ? 
                    <TableContainer component={Paper} sx={{ height: 600, borderRadius: 0 }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ลำดับ</TableCell>
                                    <TableCell align="center">คำนำหน้า</TableCell>
                                    <TableCell align="center">ชื่อ</TableCell>
                                    <TableCell align="center">นามสกุล</TableCell>
                                    <TableCell align="center">รหัส</TableCell>
                                    <TableCell align="center">เลขที่</TableCell>
                                    <TableCell align="center">ระดับชั้น</TableCell>
                                    <TableCell align="center">ชมรม</TableCell>
                                    <TableCell align="center">แก้ไข</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ height: 600 }}>
                                <div className='flex justify-center items-center w-full h-full'>
                                    <h1>ไม่พบข้อมูล</h1>
                                </div>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <TableContainer component={Paper} sx={{ height: 600, borderRadius: 0 }}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ลำดับ</TableCell>
                                    <TableCell align="center">คำนำหน้า</TableCell>
                                    <TableCell align="center">ชื่อ</TableCell>
                                    <TableCell align="center">นามสกุล</TableCell>
                                    <TableCell align="center">รหัส</TableCell>
                                    <TableCell align="center">เลขที่</TableCell>
                                    <TableCell align="center">ระดับชั้น</TableCell>
                                    <TableCell align="center">ชมรม</TableCell>
                                    <TableCell align="center">แก้ไข</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {showData.map((row, index) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell >
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{row.preface}</TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">{row.code}</TableCell>
                                <TableCell align="center">{row.number}</TableCell>
                                <TableCell align="center">{row.grade}</TableCell>
                                <TableCell align="center">{row.club}</TableCell>
                                <TableCell align="center" sx={{ cursor: "pointer" }}>
                                    <Button sx={{ mr: 1 }} variant="contained" color="success" onClick={() => handleOpenEdit(row)}>แก้ไข</Button>
                                    <Button variant="contained" color="error" onClick={() => {handleDelete(row._id)}}>ลบ</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                
            </div>

            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                component="form"
                sx={style}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmitEdit(onSubmitEdit)}
                >
                <p className="text-3xl cursor-auto bg-dark text-light py-3 px-5 text-white">
                    แก้ไข้ข้อมูลนักเรียน
                </p>
                <div className='grid grid-cols-2 gap-4'>
                    <TextField
                        {...editData("preface", { required: true })}
                        error={editErrors.preface ? true : false}
                        sx={{ my: 4 }}
                        label="คำนำหน้า"
                        variant="outlined"
                        defaultValue={selectData.preface}
                        fullWidth
                    />
                    <TextField
                        {...editData("firstName", { required: true })}
                        error={editErrors.firstName ? true : false}
                        sx={{ my: 4 }}
                        label="ชื่อ"
                        variant="outlined"
                        defaultValue={selectData.firstName}
                        fullWidth
                    />
                    <TextField
                        {...editData("lastName", { required: true })}
                        error={editErrors.lastName ? true : false}
                        sx={{ mb: 4 }}
                        label="นามสกุล"
                        variant="outlined"
                        defaultValue={selectData.lastName}
                        fullWidth
                    />
                    <TextField
                        {...editData("code", { required: true })}
                        error={editErrors.code ? true : false}
                        sx={{ mb: 4 }}
                        label="รหัสนักเรียน"
                        variant="outlined"
                        defaultValue={selectData.code}
                        fullWidth
                    />
                    <TextField
                        {...editData("number", { required: true })}
                        error={editErrors.number ? true : false}
                        sx={{ mb: 4 }}
                        label="เลขที่"
                        variant="outlined"
                        defaultValue={selectData.number}
                        fullWidth
                    />
                    <TextField
                        {...editData("grade", { required: true })}
                        error={editErrors.grade ? true : false}
                        sx={{ mb: 4 }}
                        label="ระดับชั้น"
                        variant="outlined"
                        defaultValue={selectData.grade}
                        fullWidth
                    />
                </div>

                <Button type="submit" variant="contained">
                    บันทึก
                </Button>
                </Box>
            </Modal>
        </div>


        </>

        
    )
};
