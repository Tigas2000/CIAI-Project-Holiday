import React, { useState} from "react";
import { default as ModalProvider } from "react-modal";

import { Button, Img, input, Line, Text } from "components";

const CreateAccountModal = (props) => {
  
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const handleCreateAccount = async () => {
    try {
      
      console.log("Username:", username);
      console.log("Password:", password);
      
      const id = 2;
      const role = "CLIENT";

      const response = await fetch("http://localhost:8080/users/addUser", {
        method: "POST",
        mode:"cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role, username , password }),
      });

      if (response.ok) {
        console.log("Registration successful");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[48%]"
      overlayClassName="bg-gray-900_cc fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="sm:h-auto md:h-auto max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start md:px-5 px-[30px] py-10 rounded-[10px] w-full">
          <div className="flex flex-col gap-8 items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                  <Text
                    className="flex-1 text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
                    size="txtManropeExtraBold36"
                  >
                    Create Account
                  </Text>
                  <Img
                    className="common-pointer h-[30px] w-[30px]"
                    src="/images/img_close_gray_900.svg"
                    alt="close"
                    onClick={props.onRequestClose}
                  />
                </div>
                <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                  <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                    <input
                      id="username"
                      name="username"
                      placeholder="Username"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px]"
                      type="text"
                      onChange={e => setUsername(e?.target?.value)}
                      value={username}
                    ></input>
                    <input
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px]"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e?.target?.value)}
                    ></input>
                  </div>
                  <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                    
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] items-start justify-start w-full">
              <Button 
              onClick={handleCreateAccount}
              className="bg-gray-900 cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg text-white-A700 w-full">
                Create Account
              </Button>
            </div>
            <Line className="bg-bluegray-100 h-px w-full" />
            <div className="flex flex-row gap-2 items-start justify-center w-full">
              <Text
                className="text-center text-gray-600 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray600"
              >
                Have an account?
              </Text>
              <Text
                className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray900"
              >
                Log in
              </Text>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default CreateAccountModal;