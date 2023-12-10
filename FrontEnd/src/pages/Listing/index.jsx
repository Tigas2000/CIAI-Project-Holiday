import React, { useState, useEffect  } from "react";


import {
  Button,
  GoogleMap,
  Img,
  Input,
  List,
  SelectBox,
  Text,
} from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageHeader from "components/LandingPageHeader";
import Property from "Objects/Property";


const dropdownlargeOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const priceOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const dropdownlargeOneOptionsList = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

const ListingPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  }, []);

  /* useEffect(() => {                        // Fetch properties
    const fetchData = async () => {
      try {
        const response = await fetch("/path/to/properties.json");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []); */   
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Generating 5 random properties for now
        const randomProperties = Array.from({ length: 5 }, generateRandomProperty);
        setProperties(randomProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);

  const landingPageCardPropList = [
    { image: "images/img_image_1.png", property: properties[0] },
    { image: "images/img_image_2.png", property: properties[1] },
    { image: "images/img_image_3.png", property: properties[2] },
    { image: "images/img_image_4.png", property: properties[3] },
    { image: "images/img_image_5.png", property: properties[4] },
  ];

  const generateRandomProperty = () => ({
    id: Math.floor(Math.random() * 1000),
    name: `Property ${Math.floor(Math.random() * 100)}`,
    location: `Location ${Math.floor(Math.random() * 100)}`,
    owner: `Owner ${Math.floor(Math.random() * 100)}`,
  });

  const propertiesPerPage = 9;
  const totalItems = landingPageCardPropList.length;
  const totalPages = Math.ceil(totalItems / propertiesPerPage);

  let [currentPage, setCurrentPage] = useState(1);

  let startIndex = (currentPage - 1) * propertiesPerPage;
  let endIndex = startIndex + propertiesPerPage;
  const [displayedProperties, setDisplayedProperties] = useState(landingPageCardPropList.slice(0, propertiesPerPage));

  const handlePageChange = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * propertiesPerPage;
    endIndex = startIndex + propertiesPerPage;
    setDisplayedProperties(landingPageCardPropList.slice(startIndex, endIndex));
  };

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-center w-full">
          <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="flex flex-col font-manrope items-center justify-start md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
              <Text
                className="text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
                size="txtManropeExtraBold36"
              >
                Find Property
              </Text>
              <div className="flex flex-col gap-3 items-start justify-start w-full">
                <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col h-[60px] md:h-auto items-start justify-start px-4 py-3.5 rounded-[10px] w-full">
                    <Input
                      name="frame1000001565"
                      placeholder="Enter your address"
                      className="font-semibold p-0 placeholder:text-gray-700 text-gray-700 text-left text-lg w-full"
                      wrapClassName="flex pt-1 w-auto sm:w-full"
                      suffix={
                        <Img
                          className="mt-auto mb-[3px] h-6 ml-3"
                          src="images/img_search_gray_700.svg"
                          alt="search"
                        />
                      }
                    ></Input>
                  </div>
                  <div className="flex sm:flex-1 flex-col items-start justify-start w-auto sm:w-full">
                    <SelectBox
                      className="bg-white-A700 border border-bluegray-100 border-solid font-bold pb-3.5 pt-[18px] px-4 rounded-[10px] text-gray-700 text-left text-lg w-full"
                      placeholderClassName="text-gray-700"
                      indicator={
                        <Img
                          className="h-6 w-6"
                          src="images/img_arrowdown_gray_700.svg"
                          alt="arrow_down"
                        />
                      }
                      isMulti={false}
                      name="dropdownlarge"
                      options={dropdownlargeOptionsList}
                      isSearchable={false}
                      placeholder="Buy"
                    />
                  </div>
                  <SelectBox
                    className="bg-white-A700 border border-bluegray-100 border-solid md:flex-1 font-bold px-4 py-[17px] rounded-[10px] text-gray-700 text-left text-lg w-[18%] md:w-full"
                    placeholderClassName="text-gray-700"
                    indicator={
                      <Img
                        className="h-6 w-6"
                        src="images/img_arrowdown_gray_700.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="price"
                    options={priceOptionsList}
                    isSearchable={false}
                    placeholder="$15000 - $18000"
                  />
                  <SelectBox
                    className="bg-white-A700 border border-bluegray-100 border-solid md:flex-1 font-bold px-4 py-[17px] rounded-[10px] text-gray-700 text-left text-lg w-[11%] md:w-full"
                    placeholderClassName="text-gray-700"
                    indicator={
                      <Img
                        className="h-6 w-6"
                        src="images/img_arrowdown_gray_700.svg"
                        alt="arrow_down"
                      />
                    }
                    isMulti={false}
                    name="dropdownlarge_One"
                    options={dropdownlargeOneOptionsList}
                    isSearchable={false}
                    placeholder="Bed - 3"
                  />
                  <Button
                    className="bg-white-A700 border border-bluegray-100 border-solid cursor-pointer flex items-center justify-center min-w-[113px] px-[15px] py-[17px] rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-6 mb-px ml-3"
                        src="images/img_plus_gray_700.svg"
                        alt="plus"
                      />
                    }
                  >
                    <div className="font-bold text-gray-700 text-left text-lg">
                      More
                    </div>
                  </Button>
                  <Button
                    className="bg-gray-900 cursor-pointer flex items-center justify-center min-w-[124px] px-4 py-[17px] rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-5 mt-px mb-[3px] ml-2.5"
                        src="images/img_search_white_a700.svg"
                        alt="search"
                      />
                    }
                  >
                    <div className="font-bold text-left text-lg text-white-A700">
                      Search
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start max-w-[1200px] mx-auto w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                  {displayedProperties.map((props, index) => (
                    <React.Fragment key={`LandingPageCard${index}`}>
                      <LandingPageCard
                        className="flex flex-1 flex-col h-[512px] md:h-auto items-start justify-start w-full"
                        {...props}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
              <div className="flex sm:flex-col flex-row gap-[5px] items-start justify-start w-auto">
                {Array.from({ length: totalPages }, (_, ind) => (
                  <Button
                    key={`pageButton${ind + 1}`}
                    className={`border ${
                      currentPage === ind + 1
                      
                        ? "border-gray-700"
                        : "border-bluegray-102"
                    } border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12`}
                    onClick={() => handlePageChange(ind + 1)}
                  >
                    {ind + 1}
                  </Button>
                ))}
              </div>
                <Button
                  className="border border-bluegray-102 border-solid cursor-pointer flex items-center justify-center min-w-[134px] px-[17px] py-[13px] rounded-[10px]"
                  rightIcon={
                    <Img
                      className="h-4 mt-px mb-[5px] ml-1"
                      src="images/img_arrowright_gray_900.svg"
                      alt="arrow_right"
                    />
                  }
                >
                  <div className="font-semibold text-base text-gray-900 text-left">
                    Next Page
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingPage;
