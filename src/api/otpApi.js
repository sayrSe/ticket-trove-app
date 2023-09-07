import api from "./api";

export const generateOtpCode = (phoneNumber) => {
    return api.post(`/otp?phoneNumber=${phoneNumber}`);
}

export const verifyCode = (phoneNumber, code) => {
    return api.get(`/otp/verify?phoneNumber=${phoneNumber}&code=${code}`);
}