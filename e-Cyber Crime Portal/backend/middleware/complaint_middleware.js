/*=============== validate complaint form ==============*/
export const validateComplaintForm = (req, res, next) => {
  const {
    fullName,
    fatherOrMotherName,
    gender,
    title,
    description,
    crimeType,
    incidentDate,
    incidentTime,
    websiteOrAppName,
    amountLost,
  } = req.body;

  const errors = {};
  let isValid = true;

  if(!fullName || !fatherOrMotherName || !gender || !title || !description || !crimeType || 
    !incidentDate ||  !incidentTime || !websiteOrAppName || !amountLost)
{
        errors.fields =  "*All fields must be required !"
        isValid = false;
}

  const nameRegex = /^[a-zA-Z ]{3,50}$/;
  const notEmptyRegex = /^(?!\s*$).+/;
  const titleRegex = /^[A-Za-z\s]{5,}$/;
  const descriptionRegex = /^.{12,}$/;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[0-9]{2})$/;

  if (!nameRegex.test(fullName)) {
    errors.fullName = "* Enter valid full name";
    isValid = false;
  }

  if (!nameRegex.test(fatherOrMotherName)) {
    errors.fatherOrMotherName = "* Enter valid parent name";
    isValid = false;
  }

  if (!notEmptyRegex.test(gender)) {
    errors.gender = "* Select valid gender";
    isValid = false;
  }

  if (!titleRegex.test(title)) {
    errors.title = "* Title must be at least 5 characters and contain no numbers";
    isValid = false;
  }

  if (!descriptionRegex.test(description)) {
    errors.description = "* Description must be at least 12 characters";
    isValid = false;
  }

  if (!notEmptyRegex.test(crimeType)) {
    errors.crimeType = "* Select valid crime type";
    isValid = false;
  }

  if (!dateRegex.test(incidentDate)) {
    errors.incidentDate = `* Enter valid date in DD/MM/YYYY format. year ≥ 2000, future dates not allowed)`;
    isValid = false;
  }else{
        const entered = new Date(incidentDate.split("/").reverse().join("-"));
        if (entered > new Date()) {
            isValid=false
        }

  }

  if (!incidentTime) {
    errors.incidentTime = "* Select incident time";
    isValid = false;
  }

  if (!notEmptyRegex.test(websiteOrAppName)) {
    errors.websiteOrAppName = "* Select valid website / app name";
    isValid = false;
  }

if (!req.file) {
  errors.image = "* Evidence image is required";
  isValid = false;
}

  if (!isValid) {
    return res.status(400).json({
      status: false,
      message : "Enter valid inputs !",
      errors
    });
  }

  next();
};
