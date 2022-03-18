import {FIELD_TYPES} from "../utils/globals";

export const validate = (fieldName, fieldValue, type, required, minLen=0) => {
    let result = {
        status: true,
        message: ''
    };

    // return result;

    if ((required && fieldValue === '') || (required && fieldValue === null)){
        result.status = false;
        result.message = `${fieldName} is required`;

        return result;
    }

    if (fieldValue.length < minLen){
        result.status = false;
        result.message = `${fieldName} at least ${minLen} characters`;

        return result;
    }

    if (fieldValue !== ''){
        if (type === FIELD_TYPES.EMAIL) {
            if (!validateEmail(fieldValue)) {
                result.status = false;
                result.message = 'Invalid email';
                return result;
            }
        }

        if (type === FIELD_TYPES.URL) {
            if (!validateUrl(fieldValue)) {
                result.status = false;
                result.message = 'Invalid url';
                return result;
            }
        }

        if (type === FIELD_TYPES.PASSWORD) {
            let validPassword = validatePassword(fieldValue);
            if (!validPassword){
                result.status = false;
                result.message = validPassword;
                return result;
            }
        }
    }

    return result;
};

const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    // Validate lowercase letters
    let lowerCaseLetters = /[a-z]/g;
    if(!password.match(lowerCaseLetters)) {
        return 'Password must include at least one letter!';
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if(!password.match(upperCaseLetters)) {
        return 'Password must include at least one CAPS!';
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if(!password.match(numbers)) {
        return 'Password must include at least one number!';
    }

    // Validate length
    if(password.length < 8) {
        return 'Password too short!';
    }
    // Validate length
    if(password.length >20) {
        return 'Password too long!';
    }

    return true;
};

const validateUrl = (url) => {
    let re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/;
    return re.test(url);
};
