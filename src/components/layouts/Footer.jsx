import "./Footer.css";
import { useContext } from "react";

import { StudentContext } from "../../contexts/studentContext";

export default function Footer(params) {

  const { isMobile } = useContext(StudentContext);

  return (
    <>
    {isMobile ? (
      <footer id="footer" className="bg-dark text-center py-2 text-white mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-1">
            <div className="lg:w-1/3 grid place-items-center">
              <p className="text-light flex items-center gap-2">
                <i className="ri-phone-line"></i> 077-777-7777
              </p>
            </div>
            <div className="lg:w-1/3 grid place-items-center">
              <p className="text-light flex items-center gap-2">
                <i className="ri-mail-line"></i> ท่าตะโกพิทยาคม@gmail.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    ):(
      <footer id="footer" className="bg-dark text-center py-4 text-white mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="lg:w-1/3 grid place-items-center">
              <p className="text-light flex items-center gap-2">
                <i className="ri-phone-line"></i> 077-777-7777
              </p>
            </div>
            <div className="lg:w-1/3 grid place-items-center">
              <p className="text-light flex items-center gap-2">
                <i className="ri-mail-line"></i> ท่าตะโกพิทยาคม@gmail.com
              </p>
            </div>
            <div className="lg:w-1/3 grid place-items-center">
              <p className="text-light flex items-center gap-2">
                <i className="ri-home-4-line"></i> address ท่าตะโกพิทยาคม
              </p>
            </div>
          </div>
        </div>
      </footer>
    )}
    </>

  );
}
