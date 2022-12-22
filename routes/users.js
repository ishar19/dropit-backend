import firebaseApp from "../firebaseconfig.js"
import { doc, getDoc, setDoc, collection, getFirestore, updateDoc, arrayUnion } from "firebase/firestore"
const db = getFirestore()
import express from "express"
import bcrypt from 'bcrypt'
const saltRounds = 10
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config() 

const router = express.Router()


router.use((req, res, next) => {
    console.log('user route')
    next()
})

/**
 * Create an user
 * @params{username, password}
 * @return 200 for successful response
 * @return 403 for username already taken
 * @return 500 for internal server error
 */



router.post('/create', async (req, res) => {
    const { username, password, recoveryEmail, recoveryPhone } = req.body;
   
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.sendStatus(403);
    } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hash(password, salt)
        await setDoc(doc(db, "users", username), {
            username:username,
            password:hash,
            recoveryEmail:recoveryEmail||null,
            recoveryPhone:recoveryPhone||null,
            viewAccess:"private",
            uploadAccess:"private",
            nsfw:"false"

        }).then(()=>{
            res.send(200)
        }).catch((e)=>{
            res.sendStatus(500)
        });

    }
})

/**
 * Login an user
 * @params username and password
 * @return 200 for okay
 * @return 403 for wrong password
 * @return 404 for not found
 */

router.post('/login',async(req,res)=>{
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    const docRef = doc(db, "users", inputUsername);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        const data = docSnap.data();
        const {password} = data;
        const result = await bcrypt.compare(inputPassword, password)
        if(result){
            res.send(200)
        } 
        else{
            res.sendStatus(403)
        }

    }else{
        res.sendStatus(404)
    }

})

/**
 * Update view and upload acess
 * @params username and password
 * @return 200 for okay
 * @return 403 for bad request
 * @return 404 for not found
 */

router.post('/updateSettings',async(req,res)=>{
    const {viewAccess, uploadAccess, nsfwAccess} = req.body
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    const docRef = doc(db, "users", inputUsername);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const { password } = data;
        const result = await bcrypt.compare(inputPassword, password)
        if (result) {
            await updateDoc(docRef,{
                viewAccess:viewAccess,
                uploadAccess:uploadAccess,
                nsfw:nsfwAccess
            },{merge:true})
            res.sendStatus(200)
        }
        else {
            res.sendStatus(403)
        }

    } else {
        res.sendStatus(404)
    }
    
})



router.post('/whitelist', async(req, res)=>{
    const  friend  = req.body.friend
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;
    const docRef = doc(db, "users", inputUsername);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data()
        const { password } = data;
        const result = await bcrypt.compare(inputPassword, password)
        if (result) {
            await updateDoc(docRef, {
                friends:arrayUnion({
                    username:friend
                })
            })
            res.sendStatus(200)
        }
        else {
            res.sendStatus(403)
        }

    } else {
        res.sendStatus(404)
    }
})


router.post('/updatePassword', async(req, res)=>{
    const inputUsername = req.body.username;
    const password = req.body.password;
    const docRef = doc(db, "users", inputUsername);
    const docSnap = await getDoc(docRef);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hash(password, salt)
    if (docSnap.exists()) {
        const data = docSnap.data()
        if (result) {
            await updateDoc(docRef, {
                password:hash
            },{merge:true})
            res.sendStatus(200)
        }
        else {
            res.sendStatus(403)
        }

    } else {
        res.sendStatus(404)
    }
})

export default router