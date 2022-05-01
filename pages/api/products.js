import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

export default async function getProducts(req,res) {
    const col = collection(database, 'productos')
    const docs = await getDocs(col)
    // docs.forEach(doc => {
    //     console.log(doc.data());
    // })

    const data = []

    docs.forEach(doc => {
        data.push({...doc.data(), id:doc.id})
    })

    // console.log(data)

    return res.json(data)
}