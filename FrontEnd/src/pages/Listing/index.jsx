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

const properties = [
  {id: 1, name: 'Property 1', location: 'Location 1', owner: 'Owner 1'},
  {id: 2, name: 'Property 2', location: 'Location 2', owner: 'Owner 2'},
  {id: 3, name: 'Property 3', location: 'Location 3', owner: 'Owner 3'},
  {id: 4, name: 'Property 4', location: 'Location 4', owner: 'Owner 4'},
  {id: 5, name: 'Property 5', location: 'Location 5', owner: 'Owner 5'},
  {id: 6, name: 'Property 6', location: 'Location 6', owner: 'Owner 6'},
  {id: 7, name: 'Property 7', location: 'Location 7', owner: 'Owner 7'},
  {id: 8, name: 'Property 8', location: 'Location 8', owner: 'Owner 8'},
  {id: 9, name: 'Property 9', location: 'Location 9', owner: 'Owner 9'},
  {id: 10, name: 'Property 10', location: 'Location 10', owner: 'Owner 10'},
  {id: 11, name: 'Property 11', location: 'Location 11', owner: 'Owner 11'},
  {id: 12, name: 'Property 12', location: 'Location 12', owner: 'Owner 12'},
  {id: 13, name: 'Property 13', location: 'Location 13', owner: 'Owner 13'},
  {id: 14, name: 'Property 14', location: 'Location 14', owner: 'Owner 14'},
  {id: 15, name: 'Property 15', location: 'Location 15', owner: 'Owner 15'},
  {id: 16, name: 'Property 16', location: 'Location 16', owner: 'Owner 16'},
  {id: 17, name: 'Property 17', location: 'Location 17', owner: 'Owner 17'},
  {id: 18, name: 'Property 18', location: 'Location 18', owner: 'Owner 18'},
  {id: 19, name: 'Property 19', location: 'Location 19', owner: 'Owner 19'},
  {id: 20, name: 'Property 20', location: 'Location 20', owner: 'Owner 20'},
  {id: 21, name: 'Property 21', location: 'Location 21', owner: 'Owner 21'},
  {id: 22, name: 'Property 22', location: 'Location 22', owner: 'Owner 22'},
  {id: 23, name: 'Property 23', location: 'Location 23', owner: 'Owner 23'},
  {id: 24, name: 'Property 24', location: 'Location 24', owner: 'Owner 24'},
]

const ListingPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  
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
  
  
  const generateRandomProperty = () => ({
    id: Math.floor(Math.random() * 1000),
    name: `Property ${Math.floor(Math.random() * 100)}`,
    location: `Location ${Math.floor(Math.random() * 100)}`,
    owner: `Owner ${Math.floor(Math.random() * 100)}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a delay with setTimeout
        setTimeout(() => {
          // Generating 5 random properties for now
          const randomProperties = Array.from({ length: 20 }, generateRandomProperty);
          console.log(`NEW RANDOM PROPERTIES`, randomProperties);
          setProperties(randomProperties);
          setLoading(false); // Set loading to false after properties are fetched
        }, 1000);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false); // Handle loading state in case of an error
      }
    };

    fetchData();
  }, []);


  const propertiesPerPage = 9;
  const totalItems = properties.length;
  const totalPages = Math.ceil(totalItems / propertiesPerPage);
  let [currentPage, setCurrentPage] = useState(1);
  let startIndex = (currentPage - 1) * propertiesPerPage;
  let endIndex = startIndex + propertiesPerPage;
  const [displayedProperties, setDisplayedProperties] = useState(properties.slice(0, propertiesPerPage));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on component mount
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    startIndex = (page - 1) * propertiesPerPage;
    endIndex = startIndex + propertiesPerPage;
  };

  useEffect(() => {
    setDisplayedProperties(properties.slice(startIndex, endIndex));
  }, [properties, startIndex, endIndex]);

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

  if (!propertyList || propertyList.length === 0) {
    return <div>Loading...</div>;
  }

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
              
            </div>
          </div>
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-start max-w-[1200px] mx-auto w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="md:gap-5 gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center min-h-[auto] w-full">
                  {propertyList.map((property, id) => (
                  <React.Fragment key={`LandingPageCard${id}`}>
                    <LandingPageCard property={property} />
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
