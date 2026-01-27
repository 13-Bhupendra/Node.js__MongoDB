/*================= Validate User Profile Form Middleware ==============*/
export const validateUserProfileForm = (req, res, next) => {

  const { phone, pincode, address, city, state } = req.body;

  let isValid = true;
  const errors = {};

  const phoneRegx = /^[6-9]\d{9}$/;
  const pincodeRegx = /^\d{6}$/;
  const addressRegx = /^[A-Za-z0-9\s,./-]{10,}$/;
  const cityRegx = /^[A-Za-z\s]{3,}$/;
  const stateRegx = /^[A-Za-z\s]{3,}$/;

  // phone
  if (!phone || !phoneRegx.test(phone)) {
    errors.phone = "*Enter valid 10-digit Indian mobile number";
    isValid = false;
  }

  // pincode
  if (!pincode || !pincodeRegx.test(pincode)) {
    errors.pincode = "*Enter valid 6-digit pincode";
    isValid = false;
  }

  // address
  if (!address || !addressRegx.test(address)) {
    errors.address = "*Address must be at least 10 characters";
    isValid = false;
  }

  // city
  if (!city || !cityRegx.test(city)) {
    errors.city = "*City must contain minimum 3 letters";
    isValid = false;
  }

  // state
  if (!state || !stateRegx.test(state)) {
    errors.state = "*State must contain minimum 3 letters";
    isValid = false;
  }

  if (!isValid) {
    return res.status(400).json({
      status: false,
      errors,
    });
  }

  next();
};
