import React, { useState, useEffect } from "react";
import { Button, GoogleMap, Img, Input, List, Text } from "components";
import LandingPageHeader from "components/LandingPageHeader";
import CalendarModal from "modals/CalendarModal";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadUnderConsiderationDays, saveUnderConsiderationDays, loadBookedDays, saveBookedDays } from "utils/storage";

const PropertyDetailsPage = ( ...props ) => {
  const propertyLocation = useLocation();
  
  
  
  const [apartment, setApartment] = useState({});
  const [reviews, setReviews] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [underConsiderationDays, setUnderConsiderationDays] = useState([]);
  const [bookedDays, setBookedDays] = useState([]);
  const [isCalendarOpen, setShowCalendar] = useState(false);

  const [property, setProperty] = useState([]);
  const { id } = useParams();

  console.log(`PROPERTY`, property);


  // Add to U_C
  const addUnderConsiderationDays = (selectedDays) => {
    const updatedUnderConsiderationDays = [...underConsiderationDays, ...selectedDays];
    setUnderConsiderationDays(updatedUnderConsiderationDays);
    console.log("ADDED DAYS TO UNDER CONSIDERATION LIST: ", updatedUnderConsiderationDays);
    saveUnderConsiderationDays(updatedUnderConsiderationDays);
  };

  // Add from U_C to Booked
  const confirmBookedDays = (selectedDays) => {
    const actuallyUnderConsideration = daysThatArePartOfList(underConsiderationDays, selectedDays);
    removeUnderConsiderationDays(actuallyUnderConsideration);
    addBookedDays(actuallyUnderConsideration);
  };

  // Remove from both
  const removeReservedDays = (selectedDays) => {
    removeUnderConsiderationDays(daysThatArePartOfList(underConsiderationDays, selectedDays));
    removeBookedDays(daysThatArePartOfList(bookedDays, selectedDays));
  }

  // Private method to remove from U_C
  const removeUnderConsiderationDays = (selectedDays) => {
    const updatedUnderConsiderationDays = removeFromList(underConsiderationDays, selectedDays);
    console.log("REMOVED UNDER CONSIDERATION DAYS, THIS IS WHAT REMAINS: ", updatedUnderConsiderationDays);
    setUnderConsiderationDays(updatedUnderConsiderationDays);
    saveUnderConsiderationDays(updatedUnderConsiderationDays);
  }

  // Private method to remove from Booked
  const removeBookedDays = (selectedDays) => {
    console.log("BEFORE REMOVING BOOKED DAYS: ", bookedDays);
    const newList = removeFromList(bookedDays, selectedDays);
    console.log("REMOVED BOOKED DAYS, THIS IS WHAT REMAINS: ", newList);
    setBookedDays(newList);
    saveBookedDays(newList);
  }

  // Private method to add to Booked
  const addBookedDays = (selectedDays) => {
    const updatedBookedDays = [...bookedDays, ...selectedDays];
    setBookedDays(updatedBookedDays);
    console.log("ADDED DAYS TO BOOKED LIST: ", updatedBookedDays);
    saveBookedDays(updatedBookedDays);
  };

  // Open calendar and load lists
  const openCalendar = () => {
    const loadedBookedDays = loadBookedDays();
    const loadedUnderConsiderationDays = loadUnderConsiderationDays();
    setBookedDays(loadedBookedDays);
    setUnderConsiderationDays(loadedUnderConsiderationDays);
    setShowCalendar(true);
  };

  // Close calendar and save lists
  const closeCalendar = () => {
    saveBookedDays(bookedDays);
    saveUnderConsiderationDays(underConsiderationDays);
    setShowCalendar(false);
  };

   // Check same day
   const isSameDay = (date1, date2) => {
    if (!(date1 instanceof Date) || !(date2 instanceof Date) || (date1 == null) || (date2 == null)) {
      return false;
    }
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const daysThatArePartOfList = (list, selectedDays) => {
    const days = list.filter((listDate) => {
      return selectedDays.some(date => isSameDay(date, listDate.date));
    });
    return days;
  }

  const removeFromList = (list, selectedDays) => {
    console.log("list / selectedDays", list, '/', selectedDays);
    const days = list.filter((listDate) => {
      return !selectedDays.some(date => isSameDay(date.date, listDate.date));
    });
    console.log("days", days);
    return days;
  };
  
  
  


  useEffect(() => {
    // Fetch property details from your backend based on the id
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/properties/property/${id}`);
        if (response.ok) {
          const propertyData = await response.json();
          setProperty(propertyData);
          // You can update reviews and availability similarly
        } else {
          console.error(`Failed to fetch property details: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);


  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
          <div className="flex flex-col gap-10 items-start justify-start w-full">
            <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
            <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
              <div className="flex md:flex-col flex-row gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <Img
                    className="h-[550px] md:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-full"
                    src="/images/img_rectangle5610.png"
                    alt="rectangle5610"
                  />
                </div>
                <div className="flex sm:flex-1 flex-col gap-6 h-[550px] md:h-auto items-start justify-start w-auto sm:w-full">
                  <Img
                    className="h-[263px] sm:h-auto object-cover rounded-bl-[10px] rounded-br-[10px] w-full"
                    src="/images/img_rectangle5611.png"
                    alt="rectangle5611"
                  />
                  <div className="h-[263px] relative w-96 sm:w-full">
                    <Img
                      className="h-[263px] m-auto object-cover rounded-[10px] w-full"
                      src="/images/img_rectangle5612.png"
                      alt="rectangle5612"
                    />
                    <Button
                      className="bg-white-A700 bottom-[0] cursor-pointer flex items-center justify-center min-w-[122px] px-4 py-[9px] right-[0] rounded-[10px]"
                      leftIcon={
                        <Img
                          className="h-6 mb-px mr-1.5 bottom-[0] right-[2%] absolute"
                          src="/images/img_mail.svg"
                          alt="mail"
                        />
                      }
                    >
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
              <div className="flex md:flex-col flex-row gap-6 items-start justify-center max-w-[1200px] mx-auto w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                    <div className="flex flex-col gap-11 items-start justify-start w-full">
                      <div className="flex flex-col gap-6 items-start justify-start w-full">
                        <div className="flex flex-col gap-4 items-start justify-start w-full">
                          <Text
                            className="leading-[135.00%] max-w-[712px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                            size="txtManropeExtraBold28"
                          >
                            {property.name}
                            
                          </Text>
                          <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                            <Img className="h-6 w-6" src="/images/img_eye.svg" alt="eye" />
                          <Text
                            className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                            size="txtManropeSemiBold20Gray900"
                          >
                            {property.location}
                          </Text>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                    <div className="flex flex-col gap-[26px] items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                        size="txtManropeExtraBold28"
                      >
                        Property Owner
                      </Text>
                      <div className="flex flex-col gap-[3px] items-start justify-start w-auto">
                        <Text
                          className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                          size="txtManropeSemiBold20Gray900"
                        >
                          {property.owner}
                        </Text>
                      
                        <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white-A700 border border-bluegray-100 border-solid flex sm:flex-1 flex-col items-start justify-start p-6 sm:px-5 rounded-[10px] w-auto sm:w-full">
                  <div className="flex flex-col gap-10 items-start justify-start w-[336px]">
                    <div className="flex flex-col gap-6 items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                        size="txtManropeExtraBold28"
                      >
                        Rent Apartment
                      </Text>
                      <div className="flex flex-col gap-3 h-[440px] md:h-auto items-start justify-start w-full">
                        <Button
                          onClick={() => {
                            openCalendar();
                          }}
                          className="bg-gray-900 cursor-pointer font-semibold py-[17px] rounded-[10px] text-base text-center text-white-A700 w-full"
                        >
                          Check Availability
                        </Button>

                        <Input
                          name="textfieldlarge_One"
                          placeholder="Email Address"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          type="email"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="/images/img_mail_gray_600_24x24.svg"
                              alt="mail"
                            />
                          }
                        ></Input>
                        <Input
                          name="textfieldlarge_Two"
                          placeholder="Phone Number"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          type="number"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="/images/img_call.svg"
                              alt="call"
                            />
                          }
                        ></Input>
                        <Input
                          name="textfieldlarge_Three"
                          placeholder="Date"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="/images/img_calendar.svg"
                              alt="calendar"
                            />
                          }
                        ></Input>
                        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col h-[152px] md:h-auto items-start justify-start px-[19px] py-3.5 rounded-[10px] w-full">
                          <Text
                            className="text-gray-600 text-lg w-auto"
                            size="txtManropeSemiBold18Gray600"
                          >
                            Message
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
          </div>
        </div>
        <CalendarModal
        isOpen={isCalendarOpen}
        onAddUnderConsiderationDays={addUnderConsiderationDays}
        onRemoveBookedDays={removeReservedDays}
        onRequestClose={closeCalendar}
        underConsiderationDays={underConsiderationDays}
        bookedDays={bookedDays}
        confirmBookedDays={confirmBookedDays}
        id={id}/>
      </div>
    </>
  );
};

export default PropertyDetailsPage;
