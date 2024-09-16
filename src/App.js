import "./App.css";
import "./styleless.less";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { StudentProvider } from "./contexts/studentContext";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import SelectClub from "./components/SelectClub";
import Login from "./components/Login";
import Register from "./components/Register";
import ClubDetail from "./components/ClubDetail";
import FileUpload from "./components/FileUpload";
import AllStudentData from "./components/AllStudentData";


function App() {
  return (
      <div className="App">
        <BrowserRouter>
        <StudentProvider>
        <header>
          <Header />
        </header>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/selectClub" element={<SelectClub />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/clubDetail/:clubID" element={<ClubDetail />} />
              <Route path="/fileUpload" element={<FileUpload />} />
              <Route path="/allStudentData" element={<AllStudentData />} />
            </Routes>
          </main>
        <footer>
          <Footer />
        </footer>
        </StudentProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
