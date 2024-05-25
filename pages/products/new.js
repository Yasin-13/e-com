
import Link from "next/link"
import Product from "@/components/Product"
export default function NewProduct()
{
    return(
        <>
        <div className="sm:flex sm:items-center sm:justify-between py-3">
      <div className="text-center sm:text-left">
        <p>Add a Product</p>
      </div>
      

    </div>

    
<hr class="my-2 h-px border-0 bg-gray-300" />

<div className="my-10">
    <Product />

</div>

        </>
    )

    

}