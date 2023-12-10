import React,{ useState } from "react";
import LogInModal from "../../modals/LogIn";

import { Button, Img, List, Text } from "components";
import { useNavigate } from "react-router-dom";



const LandingPageHeader = (props) => {
  const navigate = useNavigate();

  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);

  const openLogInModal = () => {
    setIsLogInModalOpen(true);
  };

  const closeLogInModal = () => {
    setIsLogInModalOpen(false);
  };

  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row my-px">
            <div className="flex flex-row gap-[11px] items-center justify-start">
              <Img className="h-25 w-40" src="/images/img_novaSST.png" alt="home" />
            </div>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row sm:hidden items-center justify-between w-[492px] sm:w-full">
            <List
              className="sm:flex-col flex-row gap-10 grid grid-cols-3"
              orientation="horizontal"
            >
            <Button
              onClick={() => navigate("/")}
              className="cursor-pointer font-manrope font-semibold text-base text-center"
              size="txtManropeSemiBold16"
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/Listing")}
              className="cursor-pointer font-manrope font-semibold text-base text-center"
              size="txtManropeSemiBold16"
            >
              Listing
            </Button>
            </List>
            
          </div>
          <div className="flex flex-row gap-10 h-[42px] md:h-auto sm:hidden items-center justify-start w-[228px]">
            <Button 
              onClick={() => {openLogInModal();}}
              className="bg-gray-900 cursor-pointer font-manrope font-semibold py-2.5 rounded-[10px] text-base text-center text-white-A700 w-full">
              Log in
            </Button>
          </div>
        </div>
        <LogInModal isOpen={isLogInModalOpen} onRequestClose={closeLogInModal} />
      </header>
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
import React,{ useState } from "react";
import LogInModal from "../../modals/LogIn";

import { Button, Img, List, Text } from "components";
import { useNavigate } from "react-router-dom";



const LandingPageHeader = (props) => {
  const navigate = useNavigate();

  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);

  const openLogInModal = () => {
    setIsLogInModalOpen(true);
  };

  const closeLogInModal = () => {
    setIsLogInModalOpen(false);
  };

  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row my-px">
            <div className="flex flex-row gap-[11px] items-center justify-start">
              <Img className="h-25 w-40" src="images/img_novaSST.png" alt="home" />
            </div>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row sm:hidden items-center justify-between w-[492px] sm:w-full">
            <List
              className="sm:flex-col flex-row gap-10 grid grid-cols-3"
              orientation="horizontal"
            >
            <Button
              onClick={() => navigate("/")}
              className="cursor-pointer font-manrope font-semibold text-base text-center"
              size="txtManropeSemiBold16"
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/Listing")}
              className="cursor-pointer font-manrope font-semibold text-base text-center"
              size="txtManropeSemiBold16"
            >
              Listing
            </Button>
            </List>
            
          </div>
          <div className="flex flex-row gap-10 h-[42px] md:h-auto sm:hidden items-center justify-start w-[228px]">
            <Button 
              onClick={() => {openLogInModal();}}
              className="bg-gray-900 cursor-pointer font-manrope font-semibold py-2.5 rounded-[10px] text-base text-center text-white-A700 w-full">
              Log in
            </Button>
          </div>
        </div>
        <LogInModal isOpen={isLogInModalOpen} onRequestClose={closeLogInModal} />
      </header>
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
