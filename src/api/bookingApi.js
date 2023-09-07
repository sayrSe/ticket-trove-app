import api from "./api";

export const getBookingDetails = (referenceNumber) => {
    return api.get(`/booking/${referenceNumber}`);
}

export const createBooking = (bookingInfo) =>{
    return api.post('/booking', bookingInfo);
}