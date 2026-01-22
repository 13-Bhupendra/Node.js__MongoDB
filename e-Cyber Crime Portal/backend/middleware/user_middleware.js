// import { UserProfile_Collection } from "../model/userProfile_model";

/*=================validate User Profile Form middleware ==============*/
export const validateUserProfileForm = (req , res ,next)=>{
    const {email , name  , phone , pincode , address , city , state} = req.body;
    let isvalid = true 
    const errors = {}

    if(!phone || !pincode || !address || !city || !state) {
        errors.fields =  "*All fields must be required !"
        isvalid = false;
    }

    const nameRegx = /^[A-Za-z ]{5,30}$/;
    const phoneRegx = /^[6-9]\d{9}$/;
    const pincodeRegx = /^\d{6}$/;
    const addressRegx = /^[A-Za-z0-9\s,./-]{10,}$/;
    const cityRegx = /^[A-Za-z\s]{3,}$/;
    const stateRegx = /^[A-Za-z\s]{3,}$/;

    // name
    if (!nameRegx.test(name)) {
    errors.name = "*Name must be 5–30 letters only";
    isvalid = false;
    }

    // phone
    if (!phoneRegx.test(phone)) {
    errors.phone = "*Enter valid 10-digit Indian mobile number";
    isvalid = false;
    }

    // pincode
    if (!pincodeRegx.test(pincode)) {
    errors.pincode = "*Enter valid 6-digit pincode";
    isvalid = false;
    }

    // address
    if (!addressRegx.test(address)) {
    errors.address = "*Address must be at least 10 characters";
    isvalid = false;
    }

    // city
    if (!cityRegx.test(city)) {
    errors.city = "*City must contain minimum 3 letters";
    isvalid = false;
    }

    // state
    if (!stateRegx.test(state)) {
    errors.state = "*State must contain minimum 3 letters";
    isvalid = false;
    }

    if(!isvalid){
        return res.status(400).json({
            status: false,
            errors,
         });
    }

    next()
}