import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === 'POST') {
    const { title, description, price, images } = req.body; // Extract images from req.body

    try {
      const productDoc = await Product.create({
        title,
        description,
        price,
        images, // Add images to the document
      });
      res.json(productDoc);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  }

  if (method === 'GET') {
    try {
      if (req.query?.id) {
        const product = await Product.findById(req.query.id); // Use findById instead of findOne
        res.json(product);
      } else {
        const products = await Product.find();
        res.json(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    }
  }

  if (method === 'DELETE') {
    try {
      if (req.query.id) {
        await Product.deleteOne({ _id: req.query.id }); // Correct model name to Product
        res.json(true);
      } else {
        res.status(400).json({ error: "Product ID is required for deletion" });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Error deleting product" });
    }
  }
}
