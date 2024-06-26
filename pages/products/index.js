import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Product()
{

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(true);
  useEffect(() => {
    axios.get('/api/products').then(res =>{
      setProducts(res.data);
      setLoading(false);
    })
  }, [])
      return<>
    <header>
  <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">All Products</h1>
        <p>view products and add</p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
      <Link
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-orange-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                  href={'products/new'}
                >
                  <span className="text-sm font-medium"> Add products</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

                </Link>

        

      </div>
    </div>
  </div>
</header>

<hr class="my-2 h-px border-0 bg-gray-300" />
<div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 sm:py-10 lg:px-8">
{products.length === 0 ?(
  <p>No products</p>
):(

  
<div class="">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
      <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>

        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Price</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    {products.map((product, index) =>(
      

<tbody class="divide-y divide-gray-100 border-t border-gray-100" key={Product._id}>
      <tr>
        <th class="px-6 py-4 font-medium text-gray-900">{index + 1}</th>
        <td class="px-6 py-4">{product.title}</td>
        <td class="px-6 py-4">{product.description}</td>
        <td class="px-6 py-4">
          {formatPrice(product.price)}
        </td>
        <td class="flex justify-end gap-4 px-6 py-4 font-mediu">
          <a href="" className="text-red-500">Delete</a>
          <a href="" class="text-black">Edit</a></td>
      </tr>
      
    </tbody>

))}

    
  </table>
</div>

)}
</div>

    </>
}