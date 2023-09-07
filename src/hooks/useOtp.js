import * as otpApi from "../../src/api/otpApi";

export const useOtp = () => {

    async function generateOtp(phoneNumber){
        await otpApi.generateOtpCode(phoneNumber);
    }

    return{
        generateOtp
    }
}