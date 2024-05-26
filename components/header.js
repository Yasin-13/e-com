import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toast"; // Combine ToastContainer and toast import
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";
import Spinner from "./Spinner"; // Ensure you have this Spinner component
import Image from "next/image"; // Import Image from next/image

export default function Product() {
  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createProduct(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = { title, description, price, images };

    try {
      await axios.post('/api/products', data);
      setRedirect(true);
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append('file', file);

        uploadImagesQueue.push(
          axios.post('/api/upload', data).then(res => {
            setImages(oldImages => [...oldImages, ...res.data.links]);
          }).catch(err => {
            console.error("Image upload failed:", err);
            toast.error("Image upload failed. Please try again.");
          })
        );
      }
      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
      toast.success('Image uploaded');
    } else {
      toast.error('An error occurred');
    }
  }

  if (redirect) {
    router.push('/products');
    return null;
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    toast.success('Image deleted successfully!');
  }

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
      <form onSubmit={createProduct} className="mx-auto max-w-screen-sm">
        <div className="mx-auto my-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-lg font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 border disabled:text-gray-500 p-3"
              placeholder="Product Name"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              required
            />
          </div>
        </div>

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="category" className="mb-1 block text-lg font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed border disabled:bg-gray-50 p-3"
            >
              <option value="">No category at this state</option>
              <option value="Option02">Option02</option>
              <option value="Option03">Option03</option>
            </select>
          </div>
        </div>

        <div className="mx-auto my-4">
          <div className="mx-auto">
            <label htmlFor="images" className="mb-1 block text-lg font-medium text-gray-700">Upload Image</label>
            <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
              <div className="space-y-1 text-center">
                <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
                <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={uploadImages}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center rounded">
          {isUploading && (
            <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          )}
        </div>

        {!isUploading && (
          <div className="grid grid-cols-2 gap-4">
            <ReactSortable list={images} setList={updateImagesOrder} animation={200} className="grid grid-cols-2 gap-4">
              {images.map((link, index) => (
                <div key={link} className="relative group">
                  <Image 
                    src={link} 
                    alt="image" 
                    className="object-cover h-32 w-44 rounded p-2"
                    width={176} // Ensure these are the actual dimensions
                    height={128} // Ensure these are the actual dimensions
                  />
                  <div className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100">
                    <button onClick={() => handleDeleteImage(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="description" className="mb-1 block text-lg font-medium text-gray-700">Description</label>
            <textarea
              rows={5}
              id="description"
              name="description"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 border disabled:text-gray-500 p-3"
              placeholder="Product Description"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              required
            />
          </div>
        </div>

        <div className="mx-auto my-4">
          <div>
            <label htmlFor="price" className="mb-1 block text-lg font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 border disabled:text-gray-500 p-3"
              placeholder="Product Price"
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              required
            />
          </div>
        </div>

        <div className="mx-auto my-4">
          <button
            className="w-full inline-block rounded border border-green-600 px-12 py-3 text-sm font-medium text-green-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-500 text-center"
            type="submit"
          >
            Save product
          </button>
        </div>
      </form>
    </>
  );
}
