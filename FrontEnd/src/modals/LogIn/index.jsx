import React, { useState, useEffect } from "react";
import { default as ModalProvider } from "react-modal";
import { Button, Img, Input, Line, Text } from "components";
import CreateAccountModal from "../../modals/CreateAccount";

const LogInModal = (props) => {
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);

  const openCreateAccountModal = () => {
    setIsCreateAccountModalOpen(true);
  };

  const closeCreateAccountModal = () => {
    setIsCreateAccountModalOpen(false);
  };

  useEffect(() => {
    closeCreateAccountModal();
  }, []);

  

  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      
      console.log("Username:", username);
      console.log("Password:", password);

      const loginEndpoint = `http://localhost:8080/users/login?username=${username}&password=${password}`;
      const response = await fetch(loginEndpoint, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
      }),
      });

      if (response.ok) {
        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[34%]"
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
                    Log in
                  </Text>
                  <Img
                    className="common-pointer h-[30px] w-[30px]"
                    src="/images/img_close_gray_900.svg"
                    alt="close"
                    onClick={props.onRequestClose}
                  />
                </div>
                <div className="flex flex-col gap-3 items-start justify-start w-full">
                  <input
                    name="textfieldlarge"
                    placeholder="username"
                    className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px]"
                    type="text"
                    onChange={e => setUsername(e?.target?.value)}
                    value={username}
                  ></input>
                  <input
                    name="textfieldlarge_One"
                    placeholder="Password"
                    className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px]"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e?.target?.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] items-start justify-start w-full">
              <Button
              onClick={handleLogin}
              className="bg-gray-900 cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg text-white-A700 w-full">
                Log in
              </Button>
            </div>
            <Line className="bg-bluegray-100 h-px w-full" />
            <div className="flex flex-row gap-2 items-start justify-center w-full">
              <Text
                className="text-center text-gray-600 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray600"
              >
                Don’t have an account?
              </Text>
              <Text
                onClick={() => {
                  openCreateAccountModal();
                }}
                className="cursor-pointer text-gray-900 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray900"
              >
                Create Account
              </Text>
            </div>
          </div>
        </div>
      </div>
      <CreateAccountModal isOpen={isCreateAccountModalOpen} onRequestClose={closeCreateAccountModal} />
    </ModalProvider>
  );
};

export default LogInModal;
