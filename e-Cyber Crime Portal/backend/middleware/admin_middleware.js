/*=============== validate admin profile form ============*/
export const validateAdminProfileForm = (req , res , next )=>{

    const {phone , city , state , designation} = req.body
    let isValid = true;
    const errors = {};

    const phoneRegx = /^[6-9]\d{9}$/;
    const cityRegx = /^[A-Za-z\s]{3,}$/;
    const stateRegx = /^[A-Za-z\s]{3,}$/;

    // phone
    if (!phone || !phoneRegx.test(phone)) {
        errors.phone = "*Enter valid 10-digit Indian mobile number";
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
    if(!designation){
        errors.designation = "*Please select a valid designation";
        isValid = false;
    }

    
    if (!isValid) {
        return res.status(400).json({
        status: false,
        errors,
        });
    }

    next()

}


// verify admin role middleware
export const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ status: false, message: "Unauthorized !" });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ status: false, message: "Forbidden: Admins only" });
    }

    next();
}