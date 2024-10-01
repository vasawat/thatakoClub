import "./Home.css";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { StudentContext } from "../contexts/studentContext";
export default function Home(params) {

  const { isMobile } = useContext(StudentContext);

  return (
    <>
      {isMobile ? (
        <section className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-8 text-center">
          <div className="text-white">
            <p className="text-2xl">เลือกชุมนุมปี 2567</p>
            <p className="mb-2">
              สำหรับนักเรียนที่สนใจสมัครเข้าชุมนุม
              <br />
              คลิกที่ปุ่มเลือกชุมนุม
            </p>
            <Link to="/selectClub">
              <Button
                style={{ padding: "0.5rem 1.5rem", fontSize: "15px" }}
                className="clubbtn px-5"
                variant="contained"
              >
                เลือกชุมนุม
              </Button>
            </Link>
          </div>

          <div>
            <img
              src="https://iili.io/deDanUl.png"
              id="imgHomePage"
              width="200px"
              alt=""
            />
          </div>
        </section>
        ):(
          <section className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="text-white">
                <p className="text-5xl">เลือกชุมนุมปี 2567</p>
                <p className="mb-5">
                  สำหรับนักเรียนที่สนใจสมัครเข้าชุมนุม
                  <br />
                  คลิกที่ปุ่มเลือกชุมนุม
                </p>
                <Link to="/selectClub">
                  <Button
                    style={{ padding: "1rem 3rem", fontSize: "20px" }}
                    className="clubbtn px-5"
                    variant="contained"
                  >
                    เลือกชุมนุม
                  </Button>
                </Link>
              </div>

              <div>
                <img
                  src="https://iili.io/deDanUl.png"
                  id="imgHomePage"
                  width="550px"
                  alt=""
                />
              </div>
          </section>
        )}
    </>
      

  );
}
