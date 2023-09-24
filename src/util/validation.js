const reg = /^\d+$/;
export const phoneNumberValidation = (phone) => {
    const phoneNumber = String(phone)
    if (!phoneNumber) {
        return "Please enter the phone number"
    }
    if (phoneNumber.length <= 9 || phoneNumber.length > 10) {
        return "Phone number must be 10 digit"
    }
    if (!reg.test(phoneNumber)) {
        return "Only digit is allowed"
    }
}

export const otpNumberValidation = (otp) => {
    let otpNumber = String(otp);

    if (!otp) {
        return "Otp number required"
    }
    if (otpNumber.length <= 5 || otpNumber.length > 6) {
        return "Otp number must be 6 digit"
    }
    if (!reg.test(otpNumber)) {
        return "Only digit is allowed"
    }
}
export const nameValidation = (name) => {
    const nameRegx = /[^a-z]/gi;
    if (!name) {
        return "Name required"
    }
    if(nameRegx.test(name)){
        return 'No space is allowed in name'
    }
    if (name.length <= 4 || name.length > 10) {
        return "Name must be 4-10 char"
    }
}