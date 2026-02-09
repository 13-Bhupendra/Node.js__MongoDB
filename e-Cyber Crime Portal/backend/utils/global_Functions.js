// const letterToNumber = (name , department , joiningYear , increment)=>{
//     const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     let code = "";

//     const firstThreeChar = name.substring(0 , 3).toUpperCase();

//         for(let i = 0;  i < firstThreeChar.length; i++){
//             const char = firstThreeChar[i];
//             const index = alphabet.indexOf(char) + 1 
//             const paddedIndex = index.toString().padStart(2 , "0");
//             code = code + paddedIndex
//         }

//         const incrementCode = increment.toString().padStart(2,"0");
//         const departmentCode = department.toUpperCase()
//         const yearCode = joiningYear.toString()

//         const finalCode = code +incrementCode +departmentCode +yearCode;
        
//         return finalCode
//     }
  



// get investigator and users from authCollection   -> done in investigator and user controller add routes
// add investigator and user -> done in admin controller and admin routes 
// edit investigator and user controller -> done in admin_controllers and add routes in admin routes
// remove investigator and user controller ->  done in admin_controllers and add routes in admin routes

