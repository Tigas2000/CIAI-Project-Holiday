import React,   { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, CheckBox, Img, Input, List, Slider, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageHeader from "components/LandingPageHeader";

const LandingPagePage = () => {
  const navigate = useNavigate();


  const landingPageCardPropList = [
    { image: "images/img_image_1.png" },
    { image: "images/img_image_2.png" },
    { image: "images/img_image_3.png" },
    { image: "images/img_image_4.png" },
    { image: "images/img_image_5.png" },
    { image: "images/img_image_6.png" },
  ];

  const [propertyList, setPropertyList] = useState([]);

  useEffect(() => {
    const fetchPropertyList = async () => {
      try {
        const response = await fetch("http://localhost:8080/properties/list");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPropertyList(data);
        } else {
          console.error("Failed to fetch property list");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchPropertyList();
  }, []);
  
  return (
    <>
      <div className="bg-white-A700 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-center justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="bg-yellow-50 flex flex-col font-manrope items-start justify-start md:pl-10 sm:pl-5 pl-[120px] py-[50px] w-full">
            <div className="flex md:flex-col flex-row md:gap-10 gap-[100px] items-center justify-start w-full">
              <div className="flex flex-1 flex-col gap-10 items-start justify-start w-full">
                <div className="flex flex-col gap-4 items-start justify-start w-full">
                  <Text
                    className="leading-[140.00%] sm:text-4xl md:text-[42px] text-[46px] text-gray-900 tracking-[-0.92px]"
                    size="txtManropeExtraBold46"
                  >
                    <>
                      Find a perfect property
                      <br />
                      Where you&#39;ll love to live
                    </>
                  </Text>
                  <Text
                    className="leading-[180.00%] max-w-[610px] md:max-w-full text-gray-700 text-xl"
                    size="txtManropeRegular20"
                  >
                    Rent a house and spend a relaxing weekend away from trouble
                  </Text>
                </div>
              </div>
              <div className="flex md:flex-1 flex-col items-center justify-start w-[47%] md:w-full">
                <Img
                  className="h-[503px] md:h-auto object-cover w-full"
                  src="/images/img_image.png"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
          <div className="flex flex-col md:gap-10 gap-[60px] md:h-auto items-start justify-start max-w-[1200px] mx-auto w-full">
            <div className="flex flex-col gap-6 items-start justify-start w-full">
              <div className="flex sm:flex-col flex-row md:gap-10 items-center justify-between w-full">
                <Text
                  className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
                  size="txtManropeExtraBold36"
                >
                  Properties
                </Text>
                <Button
                  className="common-pointer bg-transparent cursor-pointer flex items-center justify-center min-w-[124px]"
                  onClick={() => navigate("/listing")}
                  rightIcon={
                    <Img
                      className="h-6 mb-[3px] ml-2"
                      src="/images/img_arrowright.svg"
                      alt="arrow_right"
                    />
                  }
                >
                  <div className="font-bold text-left text-lg text-orange-A700">
                    Explore All
                  </div>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
              {propertyList.map((property, id) => (
              <React.Fragment key={`LandingPageCard${id}`}>
                <LandingPageCard property={property} />
              </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-401 flex flex-col items-center justify-center md:px-10 sm:px-5 px-[100px] py-10 rounded-[10px] w-full">
          <div className="flex flex-col gap-[30px] items-center justify-start md:px-10 sm:px-5 px-[200px] w-full">
            <div className="flex flex-col gap-2.5 items-center justify-start w-full">
              <Text
                className="sm:text-2xl md:text-[26px] text-[28px] text-center text-gray-900 tracking-[-0.56px] w-full"
                size="txtManropeExtraBold28"
              >
                As part of the IADI course.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPagePage;
