import firebaseApp from "../firebaseconfig.js"
import { doc, getDoc, setDoc, collection, getFirestore, updateDoc, arrayUnion } from "firebase/firestore"
const db = getFirestore()
import express from "express"
import bcrypt from 'bcrypt'
import multer from "multer"
import { v2 as cloudinary } from 'cloudinary';

const upload = multer({ dest: "uploads/" });


const router = express.Router()

cloudinary.config({
    cloud_name: 'dqiqiiy5k',
    api_key: '185162261731986',
    api_secret: 'R0XxoSENNAPSC_oAG9CuglWGfRc',
    secure: true
});

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'dropit',
    "resource_type": "auto"
};

router.use((req, res, next) => {
    console.log('upload route')
    next()
})


router.get('/:id', async(req, res)=>{
    res.send('The id you specified is ' + req.params.id);

})



router.post('/single', upload.single("file"), async(req,res)=>{

    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    let URL = '';
    
    const docRef = doc(db, "users", inputUsername);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const { password } = data;
        const result = await bcrypt.compare(inputPassword, password)
        if (result) {
            const imagePath = req.file.path
            console.log(req.file)
            await cloudinary.uploader.upload(imagePath, options).then((data)=>{console.log(data); URL=data.secure_url})
            .then(async()=>{
                await updateDoc(docRef,{
                    uploads: arrayUnion({
                        url: URL,
                        uploader: inputUsername
                    })  
                }).then(()=>res.send(URL))
            })
            .catch((e)=>{
                console.log(e)
                res.sendStatus(500)
            });
        }
        else {
            res.sendStatus(403)
        }
    } else {
        res.sendStatus(404)
    }
})

export default router