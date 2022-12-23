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
        const result = await bcrypt.compare(inputPassword, password)
        const friendList = []
        let friendAccess = false
        if(data.friends){
            data.friends.map((friend)=>{
                friendList.push(friend.username)
            })
            friendAccess = friendList.includes(inputUsername)
        }
        const viewAccess = data.viewAccess
        const uploadAccess = data.uploadAccess
        if (result) {
            await getDoc(docRef).then((data)=>res.json(data.data())).catch((e)=>console.log(e))
        }
        else if(friendAccess){
            console.log("friend")
            await getDoc(docRef).then((data) => res.json(data.data())).catch((e) => console.log(e))
        }
         else if(viewAccess==true) {
            await getDoc(docRef).then((data) => res.json(data.data())).catch((e) => console.log(e))
        }
        else if(uploadAccess==true){
            res.json("Only upload access available")
        }
        else{
            res.sendStatus(403)
        }
    }
})


export default router
