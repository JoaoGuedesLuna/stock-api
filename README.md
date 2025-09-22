<h1>Inventory-API</h1>

<p>
  <strong>Inventory-API</strong> is a RESTful API for managing product inventory.
  It allows tracking stock levels, managing products, warehouses, and movements of inventory in and out of warehouses.]
  Alerts are provided for products below minimum stock levels.
</p>

<hr>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#technologies">Technologies</a></li>
  <li><a href="#installation--running">Installation & Running</a></li>
  <li><a href="#api-documentation">API Documentation</a></li>
  <li><a href="#endpoints">Endpoints</a>
    <ul>
      <li><a href="#alerts">Alerts</a></li>
      <li><a href="#products">Products</a></li>
      <li><a href="#stock">Stock</a></li>
      <li><a href="#movements">Movements</a></li>
      <li><a href="#warehouses">Warehouses</a></li>
    </ul>
  </li>
</ul>

<hr>

<h2 id="technologies">Technologies</h2>
<ul>
  <li><strong>Language:</strong> TypeScript</li>
  <li><strong>Framework:</strong> NestJS</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>Documentation:</strong> Swagger</li>
</ul>

<hr>

<h2 id="installation--running">Installation & Running</h2>
<ol>
  <li>Clone the repository:
    <pre><code>git clone &lt;repository-url&gt;
cd inventory-api</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Configure environment variables (create <code>.env.development</code> or <code>.env.&lt;NODE_ENV&gt;</code>):
    <pre><code>NODE_ENV=development
APP_NAME=inventory-api
APP_PORT=3000

MONGODB_URI=mongodb://localhost
MONGODB_DATABASE=inventory
MONGODB_USERNAME=
MONGODB_PASSWORD=
MONGODB_PORT=27017</code></pre>
  </li>
  <li>Run the application:
    <pre><code>npm run start:dev</code></pre>
    <p>API will be available at <code>http://localhost:3000/api/v1</code></p>
    <p>Swagger documentation at <code>http://localhost:3000/api/v1/docs</code></p>
  </li>
</ol>

<hr>

<h2 id="api-documentation">API Documentation</h2>
<p>Swagger is configured to include:</p>
<ul>
  <li>All endpoints with request parameters and body schemas</li>
</ul>
<p><strong>Swagger URL:</strong> <code>/api/v1/docs</code></p>

<hr>

<h2 id="endpoints">Endpoints</h2>
<p>All responses follow the structure:</p>
<pre><code>{
  "success": true,
  "status": 200,
  "timestamp": "2025-09-22T12:34:56.789Z",
  "path": "/api/v1/endpoint",
  "message": "Request processed successfully",
  "data": {}
}</code></pre>

<h3 id="alerts">Alerts</h3>
<p><strong>GET</strong> <code>/api/v1/alerts</code></p>
<p><strong>Description:</strong> Returns products below minimum stock level.</p>
<p><strong>Response Example:</strong></p>
<pre><code>[
  {
    "productId": "123",
    "name": "Product A",
    "currentStock": 2,
    "minimumStock": 5
  }
]</code></pre>

<h3 id="products">Products</h3>
<p><strong>Base Path:</strong> <code>/api/v1/products</code></p>
<table border="1" cellpadding="5" cellspacing="0">
<tr><th>Method</th><th>Endpoint</th><th>Body</th><th>Description</th></tr>
<tr><td>POST</td><td>/</td><td>CreateProductDto</td><td>Create a new product.</td></tr>
<tr><td>DELETE</td><td>/:id</td><td>Param: id</td><td>Delete a product by ID.</td></tr>
<tr><td>GET</td><td>/:id</td><td>Param: id</td><td>Get a product by ID.</td></tr>
<tr><td>PUT</td><td>/:id</td><td>UpdateProductDto</td><td>Update a product by ID (cannot change SKU).</td></tr>
</table>

<p><strong>CreateProductDto Example:</strong></p>
<pre><code>{
  "sku": "SKU001",
  "name": "Product A",
  "description": "Description",
  "unit": "pcs",
  "minStock": 5
}</code></pre>

<h3 id="stock">Stock</h3>
<p><strong>Base Path:</strong> <code>/api/v1/stocks</code></p>
<table border="1" cellpadding="5" cellspacing="0">
<tr><th>Method</th><th>Endpoint</th><th>Body / Query / Param</th><th>Description</th></tr>
<tr><td>POST</td><td>/</td><td>CreateStockDto</td><td>Create stock for a product in a warehouse.</td></tr>
<tr><td>DELETE</td><td>/:id</td><td>Param: id</td><td>Delete stock by ID.</td></tr>
<tr><td>GET</td><td>/:id</td><td>Param: id</td><td>Get stock by ID.</td></tr>
<tr><td>GET</td><td>/</td><td>Query: productId, warehouseId</td><td>Get stock for a product in a specific warehouse.</td></tr>
<tr><td>PUT</td><td>/:id</td><td>UpdateStockDto</td><td>Update stock quantity.</td></tr>
</table>

<p><strong>CreateStockDto Example:</strong></p>
<pre><code>{
  "productId": "product_id",
  "warehouseId": "warehouse_id",
  "quantity": 10
}</code></pre>

<p><strong>UpdateStockDto Example:</strong></p>
<pre><code>{
  "quantity": 15
}</code></pre>

<h3 id="movements">Movements</h3>
<p><strong>Base Path:</strong> <code>/api/v1/movements</code></p>
<table border="1" cellpadding="5" cellspacing="0">
<tr><th>Method</th><th>Endpoint</th><th>Body / Query / Param</th><th>Description</th></tr>
<tr><td>POST</td><td>/</td><td>CreateMovementDto</td><td>Create a stock movement (IN / OUT). Updates stock automatically.</td></tr>
<tr><td>DELETE</td><td>/:id</td><td>Param: id</td><td>Delete a movement by ID.</td></tr>
<tr><td>GET</td><td>/:id</td><td>Param: id</td><td>Get movement by ID.</td></tr>
<tr><td>GET</td><td>/</td><td>Query: productId, warehouseId</td><td>Get movements for a product in a warehouse.</td></tr>
<tr><td>PUT</td><td>/:id</td><td>UpdateMovementDto</td><td>Update movement note.</td></tr>
</table>

<p><strong>CreateMovementDto Example:</strong></p>
<pre><code>{
  "productId": "product_id",
  "warehouseId": "warehouse_id",
  "type": "IN",
  "quantity": 10,
  "note": "Initial stock"
}</code></pre>

<p><strong>UpdateMovementDto Example:</strong></p>
<pre><code>{
  "note": "Updated note"
}</code></pre>

<h3 id="warehouses">Warehouses</h3>
<p><strong>Base Path:</strong> <code>/api/v1/warehouses</code></p>
<table border="1" cellpadding="5" cellspacing="0">
<tr><th>Method</th><th>Endpoint</th><th>Body / Param</th><th>Description</th></tr>
<tr><td>POST</td><td>/</td><td>CreateWarehouseDto</td><td>Create a new warehouse.</td></tr>
<tr><td>DELETE</td><td>/:id</td><td>Param: id</td><td>Delete a warehouse by ID.</td></tr>
<tr><td>GET</td><td>/:id</td><td>Param: id</td><td>Get a warehouse by ID.</td></tr>
<tr><td>PUT</td><td>/:id</td><td>UpdateWarehouseDto</td><td>Update a warehouse by ID.</td></tr>
</table>

<p><strong>CreateWarehouseDto Example:</strong></p>
<pre><code>{
  "name": "Main Warehouse",
  "location": "City Center"
}</code></pre>

<p><strong>UpdateWarehouseDto:</strong> Optional fields (name, location)</p>
