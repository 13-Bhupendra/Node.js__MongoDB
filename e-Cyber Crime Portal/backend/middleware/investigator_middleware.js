/*============= validate investigator profile form ==========*/
export const validateInvestigatorProfileForm = async (req ,res ,next ) => {
        const {personalPhone , officialPhone , officeEmail , pincode , address , city , state , department , designation , joiningDate} = req.body

        let isValid = true;
        const errors = {};

        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const phoneRegx = /^[6-9]\d{9}$/;
        const pincodeRegx = /^\d{6}$/; 
        const addressRegx = /^[A-Za-z0-9\s,./-]{10,}$/;
        const cityRegx = /^[A-Za-z\s]{3,}$/;
        const stateRegx = /^[A-Za-z\s]{3,}$/;

        //personalPhone 
        if(!personalPhone && !phoneRegx.test(personalPhone)){
                errors.personalPhone = "*Enter valid 10-digit Indian mobile number";
        }

        //personalPhone 
        if(!officialPhone && !phoneRegx.test(officialPhone)){
                errors.officialPhone = "*Enter valid 10-digit Indian mobile number";
        }

        //offcial email 
        if(!officeEmail && !emailRegx.test(officeEmail)){
                errors.officeEmail = "*Please enter a valid email address";
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
        
        //designation 
        if(!department){
                errors.department = "*Please select a valid department";
                isValid = false;
        }


        //designation 
        if(!designation){
                errors.designation = "*Please select a valid designation";
                isValid = false;
        }

         //designation 
        if(!joiningDate){
                errors.joiningDate = "*Please select a valid Joining Date";
                isValid = false;
        }

        if (!isValid) {
                return res.status(400).json({
                status: false,
                errors,
                });
        }

        next();

}



// ========================middlewares/validateEditInvestigator.js=======================
export const validateEditInvestigator = (req, res, next) => {
  const { name, email } = req.body;

  let errors = {};
  let isValid = true;

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // name
  if (!name || !nameRegex.test(name)) {
    errors.name = "*Name must be minimum 3 letters";
    isValid = false;
  }

  // email
  if (!email || !emailRegex.test(email)) {
    errors.email = "*Please enter a valid email address";
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
