// import { useRouter } from 'next/router'
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { database } from "../../config/firebase";

// export function getServerSideProps(context) {
//   const { id } = context.params
//   return {
//       props: {
//         id
//       }
//   }
// }

export async function getStaticPaths() {
  // const productosRequest = await fetch('http://localhost:3000/api/products')

  // const productos = await productosRequest.json()

  // const paths = productos.map(producto => ({
  //   params:{id: producto.id}
  // }))
  
  const col = collection(database,"productos")
  const docs = await getDocs(col)

  const productos = []

  docs.forEach(doc=>{
      productos.push({...doc.data(),id:doc.id})
  })

  const paths = productos.map(producto=>({
      params:{
          id:producto.id
      }
  }))

  // console.log(paths)

  return {
      paths,
      fallback:false // Si visitamos una ruta que no existe, devolvemos un 404
  }
}

export async function getStaticProps({params}) {
  // console.log("--- PARAMS ---")
  // console.log(params)
  // return {
  //     props: {
  //       producto: {
  //           id: params.id,
  //           name: "Producto de ejemplo"
  //       }
  //     }
  // }

  const document = doc(database,"productos",params.id)
  const productDocument = await getDoc(document)

  const producto = productDocument.data()

  return {
      props:{
          producto
      }
  }
}

export default function Producto({producto}) {
  //   const router = useRouter()
  //   const { id } = router.query

  // console.log(producto)
  return <div>{producto.name}</div>
}
