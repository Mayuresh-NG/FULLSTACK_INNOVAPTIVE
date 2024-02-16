const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Read products data from the external JSON file
const productsData = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const orderData = JSON.parse(fs.readFileSync('order.json', 'utf8'));

// For searching items in the database
app.get('/api/search', (req, res) => {
  const searchParam = req.query.searchParam;

  if (!searchParam) {
    return res.status(400).json({ error: 'Missing searchParam in the request body' });
  }

  const product = productsData.find((p) => p.productName.toLowerCase() === searchParam.toLowerCase());

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// For updating stock
app.put('/api/search', (req, res) => {
  const checkoutid = req.query.id;
  const checkoutquantity = req.query.quantity;

  if (!checkoutid || !checkoutquantity) {
    return res.status(400).json({ error: 'Missing id or quantity in the request query parameters' });
  }

  const productIndex = productsData.findIndex((p) => p.productId === parseInt(checkoutid, 10));

  if (productIndex !== -1) {
    // Update the stock of the product with the given id
    productsData[productIndex].stock -= parseInt(checkoutquantity, 10);

    // Write the updated data back to the external JSON file
    fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2), 'utf8');

    // Assuming orderData is defined elsewhere in your code
    let newOrder = {
      "O_ID": "", // Use a function to generate a unique ID
      "O_Address": "Sample Address", // Add the actual address details
      "O_P_ID": checkoutid,
      "O_status": "Pending", // Set the initial status
      "O_totalcost": checkoutquantity * productsData[productIndex].price,
      "order_quantity": checkoutquantity,
    };

    // Add the new order object to the array
    orderData.push(newOrder);

    // Write the updated array back to order.json
    fs.writeFileSync('order.json', JSON.stringify(orderData, null, 2), 'utf8');

    res.json({ success: 'Stock and order updated successfully', updatedProduct: productsData[productIndex], newOrder });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// For adding a new product
app.post('/api', (req, res) => {
  const newProduct = req.body;

  if (!newProduct || !newProduct.productId || !newProduct.productName || !newProduct.price || !newProduct.stock || !newProduct.imageUrl) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Check if a product with the same productId already exists
  const existingProduct = productsData.find((p) => p.productId === newProduct.productId);
  if (existingProduct) {
    return res.status(400).json({ error: 'Product with the same productId already exists' });
  }

  // Add the new product to the array
  productsData.push(newProduct);
  // Write the updated data back to the external JSON file
  fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2), 'utf8');
  

  res.json({ success: 'Product added successfully', newProduct });
});

// for updating stock of product
app.put('/api/id',(req,res)=>
{
  const checkoutid = req.query.id;
  const checkoutquantity = req.query.quantity;

  if (!checkoutid || !checkoutquantity) {
    return res.status(400).json({ error: 'Missing id or quantity in the request query parameters' });
  }

  const productIndex = productsData.findIndex((p) => p.productId === parseInt(checkoutid, 10));

  if (productIndex !== -1) {
    // Update the stock of the product with the given id
    productsData[productIndex].stock = parseInt(checkoutquantity, 10);

    // Write the updated data back to the external JSON file
    fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2), 'utf8');

    res.json({ success: 'Stock updated successfully', updatedProduct: productsData[productIndex] });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// for deleting the product
app.delete('/api/id',(req,res)=>{
  const toDelete = parseInt(req.query.id, 10);

  if (isNaN(toDelete)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  // Find the index of the product with the given ID
  const productIndex = productsData.findIndex((p) => p.productId === toDelete);

  if (productIndex !== -1) {
    // Remove the product from the array
    productsData.splice(productIndex, 1);

    // Write the updated data back to the external JSON file
    fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2), 'utf8');
    res.json({ success: 'Product deleted successfully' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }

});

// for order
app.post('/api/order', (req, res) => {
  let checkoutid = req.query.id;
  let address=req.query.address;

  const orderIndex = orderData.findIndex((p) => p.O_P_ID == parseInt(checkoutid, 10));
  
  if (orderIndex !== -1) {
    orderData[orderIndex].O_Address = address
    orderData[orderIndex].O_status = "pending"
    orderData[orderIndex].O_ID = "1"+checkoutid

    // Write the updated data back to the external JSON file
    fs.writeFileSync('order.json', JSON.stringify(orderData, null, 2), 'utf8');

    res.json({ success: 'Order updated successfully', updatedProduct: orderData[orderIndex] }); 
  } else {
    res.status(404).json({ error: 'Product not found' });
  }

});

// get product details through product id
app.get('/api/details',(req,res)=>{
  let id = req.query.id;
  const product = productsData.find((p) => p.productId == id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// get status of order whether its pending
app.get('/api/status',(req,res)=>{
  let orderid = req.query.orderid;
  const orderIndex = orderData.findIndex((p) => p.O_ID == parseInt(orderid, 10));
  
  const order = orderData.find((p) => p.O_ID == orderid);

  if (order) {
    res.json(orderData[orderIndex].O_status);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }

});

// cancel order
app.delete('/api/cancel', (req, res) => {
  const toDelete = req.query.cancelid;

  if (isNaN(toDelete)) {
    return res.status(400).json({ error: 'Invalid id parameter' });
  }

  // Find the index of the order with the given ID
  const orderIndex = orderData.findIndex((order) => order.O_ID == toDelete);

  if (orderIndex !== -1) {
    // Retrieve the order quantity and the corresponding product ID
    const updatedQuant = orderData[orderIndex].order_quantity;
    const productId = orderData[orderIndex].O_P_ID;

    // Find the index of the product with the given ID
    const productIndex = productsData.findIndex((product) => product.productId == productId);

    if (productIndex !== -1) {
      // Update the stock of the product with the given ID
      productsData[productIndex].stock += parseInt(updatedQuant, 10);

      // Write the updated product data back to the external JSON file
      fs.writeFileSync('products.json', JSON.stringify(productsData, null, 2), 'utf8');

      // Remove the order from the orderData array
      orderData.splice(orderIndex, 1);

      // Write the updated order data back to the external JSON file
      fs.writeFileSync('order.json', JSON.stringify(orderData, null, 2), 'utf8');

      res.json({ success: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
