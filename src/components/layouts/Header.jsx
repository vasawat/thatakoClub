import "./Header.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

import { Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StudentContext } from "../../contexts/studentContext";

import Swal from "sweetalert2";


export default function Header(params) {

  const { isMobile, userHaveToken, checkToken } = useContext(StudentContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

    const drawerContent = (
    <List>

      {userHaveToken ? (
        <>
        <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="หน้าเเรก" />
        </ListItem>
        <ListItem button component={Link} to="/allStudentData" onClick={toggleDrawer(false)}>
          <ListItemText primary="ดูข้อมูล" />
        </ListItem>
        <ListItem button component={Link} to="/fileUpload" onClick={toggleDrawer(false)}>
          <ListItemText primary="อัปโหลดเอกสาร" />
        </ListItem>
        <ListItem button component={Link} to="/user/logout" onClick={toggleDrawer(false)}>
          <ListItemText primary="ออกจากระบบ" />
        </ListItem>
        <ListItem button component={Link} to="/register" onClick={toggleDrawer(false)}>
          <ListItemText primary="สมัครสมาชิก" />
        </ListItem>
        </>
      ):(
        <>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="หน้าเเรก" />
          </ListItem>
          <ListItem button component={Link} to="/login" onClick={toggleDrawer(false)}>
            <ListItemText primary="เข้าสู่ระบบ" />
          </ListItem>
        </>
      )}

    </List>
  );


  const logout = () => {
    localStorage.removeItem("token");
    checkToken();
    navigate("/");
    Swal.fire("ออกจากระบบสําเร็จ", "", "success");
  };

  return (
    <div
      className="w-full h-full grid place-items-center mb-auto text-white py-5"
      style={{ backgroundColor: "#212529" }}
    >
      

      {isMobile ? (
        <div className="w-full flex items-center justify-between pl-6">
          <Link className="text-light text-lg font-semibold" to="/">
            โรงเรียนท่าตะโกพิทยาคม
          </Link>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerContent}
            </Drawer>
          </div>

        </div>
      ) : (
        <div className="w-full flex items-center justify-between px-10" id="navbarScroll">
          <Link className="text-light text-lg font-semibold" to="/">
            โรงเรียนท่าตะโกพิทยาคม
          </Link>
          <ul className="flex ml-auto gap-4">
            <li className="nav-item">
              <Link className="text-light hover:text-gray-300" to="/">
                หน้าเเรก
              </Link>
            </li>
            {!userHaveToken && (
              <li className="nav-item">
                <Link className="text-light hover:text-gray-300" to="/login">
                  เข้าสู่ระบบ
                </Link>
              </li>
            )}
            {userHaveToken && (
              <>
                <li className="nav-item">
                  <Link className="text-light hover:text-gray-300" to={"/allStudentData"}>ดูข้อมูล</Link>
                </li>
                <li className="nav-item">
                  <Link className="text-light hover:text-gray-300" to="/fileUpload">
                    อัปโหลดเอกสาร
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="text-light hover:text-gray-300" to="/" onClick={logout}>
                    ออกจากระบบ
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="text-light hover:text-gray-300" to="/register">
                    สมัครสมาชิก
                  </Link>
                </li>
              </>
                          
            )}

          </ul>
        </div>
      )}
    </div>
  );
}
