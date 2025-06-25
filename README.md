# Week 2 Express.js Assignment
A RESTful API built with Express.js for managing products, including CRUD operations, middleware, error handling, and advanced features like filtering, pagination, and search.
Setup Instructions

## Clone the Repository:

```git clone <your-repository-url>```
```cd week-2-express-js-assignment-Nicolex0```


## Install Dependencies:
```npm install```


## Set Environment Variables:

Copy `.env.example` to `.env` and set the ```API_KEY:cp .env.example .env```


Default API_KEY is ```my-secret-key``` for testing.


## Run the Server:
```npm start```


The server runs on ```http://localhost:3000```.



## API Endpoints
Root

```GET /```: Returns a welcome message.
Example: ```curl http://localhost:3000```
Response: ```"Welcome to the Product API! Go to /api/products to see all products."```



## Products

```GET /api/products```: List all products with optional filtering, search, and pagination.

### Query Parameters:
category: Filter by category (e.g., electronics).
search: Search by product name.
page: Page number (default: 1).
limit: Items per page (default: 10).


Example: ```curl -H "x-api-key: my-secret-key" "http://localhost:3000/api/products?category=electronics&page=1&limit=5"```
Response:
{
  "total": 2,
  "page": 1,
  "limit": 5,
  "products": [
    { "id": "1", "name": "Laptop", "description": "High-performance laptop with 16GB RAM", "price": 1200, "category": "electronics", "inStock": true },
    { "id": "2", "name": "Smartphone", "description": "Latest model with 128GB storage", "price": 800, "category": "electronics", "inStock": true }
  ]
}




```GET /api/products/:id```: Get a product by ID.

Example: ```curl -H "x-api-key: my-secret-key" http://localhost:3000/api/products/1```
Response: 
{"id": "1", "name": "Laptop", ...}


```POST /api/products```: Create a new product.

Body: { "name": "string", "description": "string", "price": number, "category": "string", "inStock": boolean }
Example: ```curl -X POST -H "x-api-key: my-secret-key" -H "Content-Type: application/json" -d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}' http://localhost:3000/api/products```
Response: 
{"message": "Product created", "product": {...}}


```PUT /api/products/:id```: Update a product.

Body: Same as POST.
Example: ```curl -X PUT -H "x-api-key: my-secret-key" -H "Content-Type: application/json" -d '{"name":"Updated Laptop","description":"Updated description","price":1300,"category":"electronics","inStock":false}' http://localhost:3000/api/products/1```
Response: 
{"message": "Product updated", "product": {...}}


```DELETE /api/products/:id```: Delete a product.

Example: ```curl -X DELETE -H "x-api-key: my-secret-key" http://localhost:3000/api/products/1```
Response: 
{"message": "Product deleted", "product": {...}}


```GET /api/products/stats```: Get product statistics (count by category).

Example: ```curl -H "x-api-key: my-secret-key" http://localhost:3000/api/products/stats```
Response: 
{"categoryCounts": {"electronics": 2, "kitchen": 1}}



## Environment Variables
See `.env.example` for required variables.

## Testing
Use Postman, Insomnia, or curl to test the API. Ensure the x-api-key header is included in all requests except the root (/).

