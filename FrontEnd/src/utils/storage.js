// utils/storage.js
const UNDER_CONSIDERATION_FILE_PATH = "underConsiderationDays.json";
const BOOKED_DAYS_FILE_PATH = "bookedDates.json";

export const saveUnderConsiderationDays = (underConsiderationDays) => {
  try {
    // Convert dates to strings using toString before saving
    const formattedUnderConsiderationDays = underConsiderationDays.map((dateObj) => {
      return {
        ...dateObj,
        date: new Date(dateObj.date).toString(),
      };
    });

    const json = JSON.stringify(formattedUnderConsiderationDays);
    sessionStorage.setItem(UNDER_CONSIDERATION_FILE_PATH, json);
  } catch (error) {
    console.error("Error saving under consideration days:", error);
  }
};

export const loadUnderConsiderationDays = () => {
  try {
    const json = sessionStorage.getItem(UNDER_CONSIDERATION_FILE_PATH);

    if (json) {
      const parsedUnderConsiderationDays = JSON.parse(json);
      const formattedUnderConsiderationDays = parsedUnderConsiderationDays.map((dateObj) => {
        // {date: new Date(currentYear, currentMonth, day), numberOfPeople, id}
        const { date, numberOfPeople, id } = dateObj;

        return {
          date: new Date(date),
          numberOfPeople,
          id,
        };
      });

      return formattedUnderConsiderationDays;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading under consideration days:", error);
    return [];
  }
};

export const saveBookedDays = (bookedDays) => {
  try {
    // Convert dates to strings using toString before saving
    const formattedBookedDays = bookedDays.map((dateObj) => {
      return {
        ...dateObj,
        date: new Date(dateObj.date).toString(),
      };
    });

    const json = JSON.stringify(formattedBookedDays);
    sessionStorage.setItem(BOOKED_DAYS_FILE_PATH, json);
  } catch (error) {
    console.error("Error saving booked days:", error);
  }
};

export const loadBookedDays = () => {
  try {
    const json = sessionStorage.getItem(BOOKED_DAYS_FILE_PATH);

    if (json) {
      const parsedBookedDays = JSON.parse(json);
      const formattedBookedDays = parsedBookedDays.map((dateObj) => {
        // {date: new Date(currentYear, currentMonth, day), numberOfPeople, id}
        const { date, numberOfPeople, id } = dateObj;

        return {
          date: new Date(date),
          numberOfPeople,
          id,
        };
      });

      return formattedBookedDays;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading booked days:", error);
    return [];
  }
};

