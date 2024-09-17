import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../assets/enviroments";

export const StudentContext = createContext();






export const StudentProvider = ({ children }) => {

  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState()

  const [allStudentNotHaveClub, setAllStudentNotHaveClub] = useState([]);
  const [allTeacherNotHaveClub, setAllTeacherNotHaveClub] = useState([]);
  const [allStudent, setAllStudent] = useState([]);
  const [allTeacher, setAllTeacher] = useState([]);

  const [userHaveToken, setUserHaveToken] = useState(false);
 
  const handleResize = () => {
    if (window.innerWidth < 900) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  const getAllData = () => {
      axios
      .get(env.apiUrl + "/user/getAllUsers")
      .then((res) => {
          setAllStudent(res.data.student);
          setAllTeacher(res.data.teacher);
      })
      .catch((err) => {
          console.error("Error fetching data:", err);
      });
    };

    const getAllStudentDontHaveClub = () => {
      axios
      .get(env.apiUrl +"/user/getAllStudentDontHaveClub")
      .then((res) => {
          setAllStudentNotHaveClub(res.data.student);
      })
      .catch((err) => {
          console.error("Error fetching data:", err);
      });
    };

    const getAllTeacherDontHaveClub = () => {
      axios
      .get(env.apiUrl +"/user/getAllTeacherDontHaveClub")
      .then((res) => {
          setAllTeacherNotHaveClub(res.data.teacher);
      })
      .catch((err) => {
          console.error("Error fetching data:", err);
      });
    };
    

  const isTokenExpired = (token) => {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split(".")[1]));

    const currentTime = Math.floor(Date.now() / 1000); // เวลาปัจจุบันในรูป UNIX timestamp (หน่วยวินาที)
    return payload.exp < currentTime; 
  };
  
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {    
      if (isTokenExpired(token)) {
        setUserHaveToken(false);
        localStorage.removeItem("token");
        navigate("/");
        console.log("Token has expired");
      } else {
        setUserHaveToken(true);
        console.log("Token is still valid");
      }
      
      console.log("Token exists:", userHaveToken);
    } else {
      setUserHaveToken(false);
      console.log("No token found");
    }



  };
  


  



  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    getAllData();
    getAllStudentDontHaveClub();
    getAllTeacherDontHaveClub();
    checkToken();
    setTimeout(() => {
      checkToken();
    }, 1800000);
  // eslint-disable-next-line  
  }, []);



  
  return (
    <StudentContext.Provider value={{
      isMobile,
      getAllData,
      allStudentNotHaveClub,
      getAllStudentDontHaveClub,
      allTeacherNotHaveClub,
      getAllTeacherDontHaveClub,
      allStudent,
      allTeacher,
      setUserHaveToken,
      userHaveToken,
      checkToken
    }}>{children}</StudentContext.Provider>
  );
};
