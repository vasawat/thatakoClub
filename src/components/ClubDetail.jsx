import { useParams } from 'react-router-dom';
import './ClubDetail.css'
import env from "../assets/enviroments";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

import Swal from 'sweetalert2';

import { StudentContext } from "../contexts/studentContext";

import ClubPDF from './widgets/clubPDF';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
};

export default function ClubDetail(params) {  

      const navigate = useNavigate();

    const { isMobile, allStudentNotHaveClub, getAllStudentDontHaveClub, userHaveToken, allTeacherNotHaveClub, getAllTeacherDontHaveClub } = useContext(StudentContext);


    const { clubID } = useParams();

    const [loading, setLoading] = useState(false);

    const [clubData, setClubData] = useState({});
    const [stdData, setStdData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);

    const [openStd, setOpenStd] = useState(false);
    const [selectStudent, setSelectStudent] = useState({});
    const handleOpenStd = () => setOpenStd(true);
    const handleCloseStd = () => setOpenStd(false);

    const [openTeacher, setOpenTeacher] = useState(false);
    const [selectTeacher, setSelectTeacher] = useState({});
    const handleOpenTeacher = () => setOpenTeacher(true);
    const handleCloseTeacher = () => setOpenTeacher(false);

    const [openEditClub,setOpenEditClub]= useState(false);
    const handleOpenEditClub = () => setOpenEditClub(true);
    const handleCloseEditClub = () => setOpenEditClub(false);

    const { handleSubmit:studentSubmit } = useForm();
    const { handleSubmit:teacherSubmit } = useForm();
    const { handleSubmit:clubSubmit, register:editClub, formState: { errors: editClubError } } = useForm();

    const onEditSubmit = data => {
        handleCloseEditClub();
        axios.post(env.apiUrl +`/club/updateClub/${clubData.clubID}`, data).then((response) => {
            if (response.status === 200) {
                getDataThisClub();
                Swal.fire({
                    icon: 'success',
                    title: 'แก้ไขชุมนุมสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'แก้ไขชุมนุมไม่สําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

    const onStudentSubmit = data => {
        handleCloseStd();
        axios.post(env.apiUrl +'/club/studentSelectClub', {selectStudent, clubName: clubData.clubName}).then((response) => {
            if (response.status === 200) {
                getDataThisClub();
                getAllStudentDontHaveClub();
                Swal.fire({
                    icon: 'success',
                    title: 'เลือกชุมนุมสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'เลือกชุมนุมไม่สําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    };

    const onTeacherSubmit = data => {
        handleCloseTeacher();
        axios.post(env.apiUrl +'/club/teacherSelectClub', {selectTeacher, clubName: clubData.clubName}).then((response) => {
            if (response.status === 200) {
                getDataThisClub();
                getAllTeacherDontHaveClub();
                Swal.fire({
                    icon: 'success',
                    title: 'เลือกชุมนุมสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'เลือกชุมนุมไม่สําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        console.log(selectTeacher);
    };

    const handleDeleteClub = () => {
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
                axios.post(env.apiUrl +`/club/deleteClub/${clubData.clubID}`).then((res) => {
                if (res.status === 200) {
                    navigate("/selectClub");
                    Swal.fire("ลบเรียบร้อย", "", "success");
                    
                }else {
                    Swal.fire(res.data.message, "", "error");
                }
                })
            }
        })
    }

    const handleDeleteTeacherFromClub = (id) => {
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
                axios.post(env.apiUrl +`/club/deleteTeacherFromClub/${id}`).then((res) => {
                if (res.status === 200) {
                    Swal.fire("ลบเรียบร้อย", "", "success");
                    getDataThisClub();
                }else {
                    Swal.fire(res.data.message, "", "error");
                }
                })
            }
        });
    }

    const handleDeleteStudentFromClub = (id) => {
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
                axios.post(env.apiUrl +`/club/deleteStudentFromClub/${id}`).then((res) => {
                if (res.status === 200) {
                    Swal.fire("ลบเรียบร้อย", "", "success");
                    getDataThisClub();
                }else {
                    Swal.fire(res.data.message, "", "error");
                }
                })
            }
        });
    }

    const getDataThisClub = () => {
        setLoading(true);
        axios.post(env.apiUrl +`/club/getUserByClub/${clubID}`).then((response) => {
            if (response.status === 200) {
                setClubData(response.data.clubData);
                setStdData(response.data.student);
                setTeacherData(response.data.teacher);
                setLoading(false);
            }else {
                setLoading(false);
            }
        });
    };

    
    useEffect(() => {
        getAllStudentDontHaveClub();
        getDataThisClub();
    // eslint-disable-next-line
    }, []);



    return (
        <div className={isMobile ? "w-full h-full grid place-items-center py-5":"w-full h-full grid place-items-center py-5"}>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className='text-center'>
                <>
                    {clubData ? (
                        <>
                            <p className="textForTopicClub btn btn-dark btn-lg text-light px-4">
                                <span className="text-white">ชุมนุม {clubData.clubName}</span>
                            </p>
                            <p>
                                นักเรียนในชุมนุม {clubData.currentStudents} คน เต็ม {clubData.maxStudents} คน
                            </p>
                        </>
                    ) : (
                        <p>กำลังโหลดข้อมูลชุมนุม...</p>
                    )}
                </>

            </div>


            <div className={isMobile ? "flex flex-col justify-center items-center w-full px-3":"flex flex-col justify-center items-center w-2/3"}>

                <Modal
                    open={openEditClub}
                    onClose={handleCloseEditClub}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component="form"
                        sx={style}
                        noValidate
                        autoComplete="off"
                        onSubmit={clubSubmit(onEditSubmit)}
                    >
                        <p className="text-3xl cursor-auto bg-dark text-light py-3 px-5 text-white">แก้ไขชุมนุม</p>
                        <TextField
                            {...editClub("maxStudents", { required: true })}
                            error={editClubError.maxStudents ? true : false}
                            sx={{ my: 4 }}
                            label="เต็มกี่คน"
                            variant="outlined"
                            defaultValue={clubData.maxStudents}
                            fullWidth
                        />
                        <Button type="submit" variant="contained">บันทึก</Button>
                    </Box>
                </Modal>

                <Modal
                    open={openTeacher}
                    onClose={handleCloseTeacher}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component="form"
                        sx={style}
                        noValidate
                        autoComplete="off"
                        onSubmit={teacherSubmit(onTeacherSubmit)}
                    >
                        <p className="text-3xl cursor-auto bg-dark text-light py-3 px-5 text-white">เพิ่มครู</p>
                        <Autocomplete
                            disablePortal
                            options={allTeacherNotHaveClub}
                            getOptionLabel={(option) => `ครู ${option.firstName} ${option?.lastName}`}
                            onChange={(event, newValue) => {
                                setSelectTeacher(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="ครู" />}
                        />
                        <Button type="submit" variant="contained">บันทึก</Button>
                    </Box>
                </Modal>

                <Modal
                    open={openStd}
                    onClose={handleCloseStd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        component="form"
                        sx={style}
                        noValidate
                        autoComplete="off"
                        onSubmit={studentSubmit(onStudentSubmit)}
                    >
                        <p className="text-3xl cursor-auto bg-dark text-light py-3 px-5 text-white">เพิ่มนักเรียน</p>
                        <Autocomplete
                            disablePortal
                            options={allStudentNotHaveClub}
                            getOptionLabel={(option) => `${option.firstName} ${option?.lastName}`}
                            onChange={(event, newValue) => {
                                setSelectStudent(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="นักเรียน" />}
                        />
                        <p className='text-sm text-[red]'>* หากเลือกนักเรียนผิดติดต่อครูแอน</p>
                        <Button type="submit" variant="contained">บันทึก</Button>
                    </Box>
                </Modal>

                {isMobile ? (
                    <>
                        <div className='flex p-2 gap-2'>
                            <Button onClick={handleOpenStd} variant="contained" disabled={clubData.currentStudents >= clubData.maxStudents}>สมัครเข้าชุมนุม</Button>
                            {userHaveToken && (
                                <>
                                    <Button onClick={handleOpenTeacher} variant="contained">เพิ่มครู</Button>
                                    <div>
                                        {stdData.length > 0 ? (
                                        <ClubPDF data={stdData} teacherData={teacherData} clubName={clubData.clubName}/>
                                        ) : (
                                        <p>ไม่มีข้อมูล...</p>
                                        )}
                                    </div>
                                </>
                                
                            )}
                        </div>
                        <div className='flex p-2 gap-2'>
                            {userHaveToken && (
                                <>
                                    <Button onClick={handleOpenEditClub} variant="contained">แก้ไขชุมนุม</Button>
                                    <Button onClick={handleDeleteClub} variant="contained" color="error">ลบชุมนุม</Button>
                                </>
                                
                            )}
                        </div>
                    </>
                ):(
                    <>
                        <div className='flex p-4 gap-4'>
                            <Button onClick={handleOpenStd} variant="contained" disabled={clubData.currentStudents >= clubData.maxStudents}>สมัครเข้าชุมนุม</Button>
                            <div>
                                {stdData.length > 0 ? (
                                <ClubPDF data={stdData} teacherData={teacherData} clubName={clubData.clubName}/>
                                ) : (
                                <p>ไม่มีข้อมูล...</p>
                                )}
                            </div>
                            {userHaveToken && (
                                <>
                                    <Button onClick={handleOpenTeacher} variant="contained">เพิ่มครู</Button>
                                    <Button onClick={handleOpenEditClub} variant="contained">แก้ไขชุมนุม</Button>
                                    <Button onClick={handleDeleteClub} variant="contained" color="error">ลบชุมนุม</Button>
                                </>
                                
                            )}
                        </div>
                    </>
                )}

                
                <TableContainer component={Paper} sx={{ maxWidth: 500, overflow: 'auto' , mb: 4 }}>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">ครูประจำชุมนุม</TableCell>
                            {userHaveToken && <TableCell align="center"></TableCell>}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {teacherData.map((row) => (
                            <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="left">{row.firstName} {row.lastName}</TableCell>
                            {userHaveToken && <TableCell align="center"><Button variant="contained" color="error" onClick={() => {handleDeleteTeacherFromClub(row._id)}}>ลบ</Button></TableCell>}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                {isMobile ? (
                    <TableContainer component={Paper} sx={{ maxWidth: 500, overflow: 'auto' }}>
                        <Table  aria-label="simple table">
                            <TableBody>
                            {stdData.map((row) => (
                                <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left">
                                    ชื่อ: {row.preface} {row.firstName} {row.lastName} <br />
                                    เลขที่: {row.number} <br />
                                    ระดับชั้น: {row.grade} 
                                </TableCell>
                                {userHaveToken && <TableCell sx={{ width: 20 }} align="center"><Button variant="contained" color="error" onClick={() => {handleDeleteStudentFromClub(row._id)}}>ลบ</Button></TableCell>}
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ):(
                    <TableContainer component={Paper} sx={{ maxWidth: 500, overflow: 'auto' }}>
                        <Table  aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">ชื่อ</TableCell>
                                <TableCell align="center">เลขที่</TableCell>
                                <TableCell align="center">ระดับชั้น</TableCell>
                                {userHaveToken && <TableCell align="center"></TableCell>}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {stdData.map((row) => (
                                <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="left">{row.preface} {row.firstName} {row.lastName}</TableCell>
                                <TableCell align="center">{row.number}</TableCell>
                                <TableCell align="center">{row.grade}</TableCell>
                                {userHaveToken && <TableCell align="center"><Button variant="contained" color="error" onClick={() => {handleDeleteStudentFromClub(row._id)}}>ลบ</Button></TableCell>}
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

            </div>


        </div>
    );
};