import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../config/firebase";

// Si utlizamos esta función, estaremos usando SSR (Server Side Rendering)
// export async function getServerSideProps(){
//   const productosRequest = await fetch('http://localhost:3000/api/products')

//   const productos = await productosRequest.json()

//   return{
//     props:{
//       productos
//     }
//   }
// }

// Si utlizamos esta función, estaremos usando SSG (Static Site Generation)
export async function getStaticProps(){
  const col = collection(database,"productos")
  const docs = await getDocs(col)

  const productos = []

  docs.forEach(doc=>{
      productos.push({...doc.data(),id:doc.id})
  })

  return{
    props:{
      productos
    },
    revalidate:10
  }
}

export default function Productos({productos}) {

  // const [productos, setProductos] = useState([])

  //Client-side rendering CSS
  // useEffect(() => {
    
  //   fetch('http://localhost:3000/api/products')
  //   .then(response=>response.json())
  //   .then(data=>{
  //     setProductos(data)
  //   })
  // }, [])
  

  return (
    <div>
      {productos.map(producto=>{
        return <article key={producto.id}>
          <Link href={'/productos/'+ producto.id}>
            <h2>{producto.name}</h2>
          </Link>
          <p>$ {producto.price}</p>
        </article>
      })}
    </div>
  )
}