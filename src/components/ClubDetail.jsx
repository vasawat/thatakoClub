import { useParams } from 'react-router-dom';
import './ClubDetail.css'
import env from "../assets/enviroments";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';

import Swal from 'sweetalert2';

import { StudentContext } from "../contexts/studentContext";

import ClubPDF from './widgets/clubPDF';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';

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

    const { allStudentNotHaveClub, getAllStudentDontHaveClub, userHaveToken, allTeacherNotHaveClub, getAllTeacherDontHaveClub } = useContext(StudentContext);


    const { clubID } = useParams();

    // let [loading, setLoading] = useState(true);
    const [clubData, setClubData] = useState({});
    const [stdData, setStdData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);


    // modal
    const [openStd, setOpenStd] = useState(false);
    const [selectStudent, setSelectStudent] = useState({});
    const handleOpenStd = () => setOpenStd(true);
    const handleCloseStd = () => setOpenStd(false);

    const [openTeacher, setOpenTeacher] = useState(false);
    const [selectTeacher, setSelectTeacher] = useState({});
    const handleOpenTeacher = () => setOpenTeacher(true);
    const handleCloseTeacher = () => setOpenTeacher(false);

    const { handleSubmit:studentSubmit } = useForm();
    const { handleSubmit:teacherSubmit } = useForm();

    const onStudentSubmit = data => {
        handleCloseStd();
        axios.post(env.apiUrl +'/club/studentSelectClub', {selectStudent, clubName: clubData.clubName}).then((response) => {
            if (response.status === 200) {
                getDataThisClub();
                getAllStudentDontHaveClub();
                Swal.fire({
                    icon: 'success',
                    title: 'เลือกชมรมสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'เลือกชมรมไม่สําเร็จ',
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
                    title: 'เลือกชมรมสําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'เลือกชมรมไม่สําเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        console.log(selectTeacher);
    };


    /////////////////////


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
        axios.post(env.apiUrl +`/club/getUserByClub/${clubID}`).then((response) => {
            setClubData(response.data.clubData);
            setStdData(response.data.student);
            setTeacherData(response.data.teacher);
            console.log(response.data);
        });
    };

    
    useEffect(() => {
        getAllStudentDontHaveClub();
        getDataThisClub();
    // eslint-disable-next-line
    }, []);



    return (
        <div className="w-full h-full grid place-items-center">
            <div className='text-center'>
                <>
                    {clubData ? (
                        <>
                            <p className="textForTopicClub btn btn-dark btn-lg text-light px-4">
                                <span className="text-white">ชมรม {clubData.clubName}</span>
                            </p>
                            <p>
                                นักเรียนในชมรม {clubData.currentStudents} คน เต็ม {clubData.maxStudents} คน
                            </p>
                        </>
                    ) : (
                        <p>กำลังโหลดข้อมูลชมรม...</p>
                    )}
                </>

            </div>


            <div className='flex flex-col justify-center items-center w-2/3'>

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
                        <p className='text-sm text-[red]'>* หากนักเรียนเลือกแล้ว จะไม่สามารถเปลี่ยนชมรมได้</p>
                        <p className='text-sm text-[red]'>* มีปัญหาติดต่อครู xxx</p>
                        <Button type="submit" variant="contained">บันทึก</Button>
                    </Box>
                </Modal>

                <div className='flex p-4 gap-4'>
                    <Button onClick={handleOpenStd} variant="contained" disabled={clubData.currentStudents >= clubData.maxStudents}>สมัครเข้าชมรม</Button>
                    {userHaveToken && (
                        <>
                            <Button onClick={handleOpenTeacher} variant="contained">เพิ่มครู</Button>
                            <div>
                                {stdData.length > 0 ? (
                                <ClubPDF data={stdData} teacherData={teacherData} clubName={clubData.clubName}/>
                                ) : (
                                <p>กำลังโหลดข้อมูล...</p>
                                )}
                            </div>
                        </>
                        
                    )}
                </div>
                
                <TableContainer component={Paper} sx={{ maxWidth: 500, overflow: 'auto' , mb: 4 }}>
                    <Table  aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">ครูประจำชมรม</TableCell>
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
            </div>


        </div>
    );
};