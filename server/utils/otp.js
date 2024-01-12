import fast2sms from 'fast-two-sms'
export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};
export const validateEmail=(email) =>{
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export const validateNumber=(email)=> {
    if (email.length == 10 && !isNaN(email)) {
        return true;
    }
    return false;
}
export const sendSMS=(number, otp)=> {
    const res =  fast2sms.sendMessage({
        authorization: process.env.API_KEY,
        message: `${otp} from Ayush Sachan`,
        numbers: [number],
    });
    return res;
}