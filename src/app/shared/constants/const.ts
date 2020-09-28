export const API = {
    // AUTH 
    LOGIN: 'https://localhost:44301/login',
    REGISTER: 'https://localhost:44301/register',
    VERIFY_EMAIL: 'https://localhost:44301/verification',
    
    // USER PERSONAL
    POST_USER_PERSONAL_DATA: 'https://localhost:44301/users/personal',
    GET_USER_PERSONAL_DATA: 'https://localhost:44301/users/personal',

    // USER BANK
    POST_USER_BANK_DATA: 'https://localhost:44301/users/bank',
    GET_USER_BANK_DATA: 'https://localhost:44301/users/bank',
    GET_ACCOUNT_TYPES: 'https://localhost:44301/users/getaccounttypes',

    // USER EMPLOYMENT
    POST_USER_EMPLOYEMENT_DATA: 'https://localhost:44301/users/employment',
    GET_USER_EMPLOYMENT_DATA: 'https://localhost:44301/users/employment',
    GET_EMPLOYMENT_TYPES: 'https://localhost:44301/users/getemploymenttypes',
    GET_CONTRACTS: 'https://localhost:44301/users/getcontracts',

    // QUOTE 
    GET_MILEAGE_LIMIT_API: 'https://localhost:44301/quote/getmileagelimit',
    GET_PAYBACK_TIME_API: 'https://localhost:44301/Quote/getpaybacktime',
    SAVE_QUOTE: "https://localhost:44301/quote/saveQuote",

    // CAR 
    CAR_API: 'https://localhost:44301/cars/getAllCars'
}

export const QUOTE = {
    KILOMETER: 100000,
    MONTHS: 12
}