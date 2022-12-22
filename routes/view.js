import firebaseApp from "../firebaseconfig.js"
import { doc, getDoc, setDoc, collection, getFirestore, updateDoc, arrayUnion } from "firebase/firestore"
const db = getFirestore()
import bcrypt from 'bcrypt'
import express from "express"

const router = express.Router()


router.use((req, res, next) => {
    console.log('view route')
    next()
})

router.post('/:id', async(req, res)=>{
    const inputUsername = req.body.username;
    const inputPassword = req.body.password;

    const docRef = doc(db, "users", req.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data()
        const { password } = data;
        // const result = await bcrypt.compare(inputPassword, password)
        const friendList = []
        data.friends.map((friend)=>{
            friendList.push(friend.username)
        })
        const friendAccess = friendList.includes(inputUsername)
        const viewAccess = data.viewAccess == "public"
        const uploadAccess = data.uploadAccess=="public"
        if (false) {
            await getDoc(docRef).then((data)=>res.json(data.data())).catch((e)=>console.log(e))
        }
        else if(friendAccess){
            await getDoc(docRef).then((data) => res.json(data.data())).catch((e) => console.log(e))
        }
        } else if(true) {
            console.log(1)
            await getDoc(docRef).then((data) => res.json(data)).catch((e) => console.log(e))
        }
        else if(uploadAccess){
            console.log(2)
            res.json("Only upload access available")
        }
        else{
            res.sendStatus(403)
        }
})


export default router
