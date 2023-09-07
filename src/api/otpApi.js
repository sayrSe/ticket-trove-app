import api from "./api";

export const generateOtpCode = (phoneNumber) => {
    return api.post(`otp?phoneNumber=${phoneNumber}`);
}