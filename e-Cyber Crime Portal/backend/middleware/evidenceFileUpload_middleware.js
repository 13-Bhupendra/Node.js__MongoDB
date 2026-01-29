import multer from "multer";
import {fileURLToPath} from "url";
import path from "path";

/*================== evidenve File upload ================*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname , ".." , "uploads");
// console.log(__dirname);

const storage = multer.diskStorage({
    destination : (req , file , cb )=>{
        cb(null , uploadPath)
    },
    filename : (req , file , cd)=>{
        cd(null , Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});
export default upload;