# MongoDB Aggregation Pipeline Mastery

This repository is a complete guide and implementation of **24 MongoDB Aggregation Pipeline tasks**. Designed as a class test project, it covers everything from simple data filtering to advanced multi-stage processing, deep array filtering, and lookups.

## 🌟 Project Overview

This project demonstrates how to use the power of MongoDB's aggregation framework to perform complex data analysis and transformations within a Node.js/Express environment.

### Collections Used:
1.  **Users**: Stores user profiles (name, age, city, status).
2.  **Products**: Inventory items (category, price, stock).
3.  **Orders**: Purchase records (userId, totalAmount, orderDate, and a rich embedded `items` array).

---

## � Getting Started

### 1. Installation
```bash
git clone <repository-url>
cd mongoDB-aggregation-pipeline
npm install
```

### 2. Environment Variables (`.env`)
Create a `.env` file in the root directory:
```env
MONGODB_URL=mongodb+srv://your_connection_string
PORT=3006
```

### 3. Data Seeding (Crucial!)
To populate your database with exactly the data needed for the tasks, run:
```bash
npm start
```
Then visit: `http://localhost:3006/api/seed`

---

## 📊 The 24 Aggregation Tasks (Copy-Paste Ready)

Here is a detailed breakdown of every task implemented in this project with its corresponding pipeline code.

### 1. Product Price Range
**Goal**: Find products priced between 20,000 and 50,000.
```javascript
db.products.aggregate([
  { $match: { price: { $gt: 20000, $lt: 50000 } } }
])
```

### 2. User Age Filter
**Goal**: Find users aged between 25 and 30.
```javascript
db.users.aggregate([
  { $match: { age: { $gte: 25, $lte: 30 } } }
])
```

### 3. Sort Orders by Date
**Goal**: Sort all orders starting from the most recent.
```javascript
db.orders.aggregate([
  { $sort: { orderDate: -1 } }
])
```

### 4. Total User Count
**Goal**: Get a count of the total number of users.
```javascript
db.users.aggregate([
  { $count: "totalUsers" }
])
```

### 5. Delivered Sales Revenue
**Goal**: Calculate total revenue generated from all "delivered" orders.
```javascript
db.orders.aggregate([
  { $match: { status: "delivered" } },
  { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
])
```

### 6. Average Price by Category
**Goal**: Calculate the average price of products in each category.
```javascript
db.products.aggregate([
  { $group: { _id: "$category", averagePrice: { $avg: "$price" } } }
])
```

### 7. Discounted Prices (10% Off)
**Goal**: Dynamically add a `discountedPrice` field.
```javascript
db.products.aggregate([
  { $addFields: { discountedPrice: { $multiply: ["$price", 0.9] } } }
])
```

### 8. Mark Expensive Items
**Goal**: Set an `isExpensive` flag for products priced over 25,000.
```javascript
db.products.aggregate([
  { $addFields: { isExpensive: { $gt: ["$price", 25000] } } }
])
```

### 9. Extract Order Year
**Goal**: Add an `orderYear` field extracted from the `orderDate`.
```javascript
db.orders.aggregate([
  { $addFields: { orderYear: { $year: "$orderDate" } } }
])
```

### 10. Add GST (18%)
**Goal**: Calculate and add a `totalWithGST` field for products.
```javascript
db.products.aggregate([
  { $addFields: { totalWithGST: { $multiply: ["$price", 1.18] } } }
])
```

### 11. Low Stock Alert
**Goal**: Add `stockStatus` as "Low" if stock < 20, otherwise "Normal".
```javascript
db.products.aggregate([
  { $addFields: { stockStatus: { $cond: { if: { $lt: ["$stock", 20] }, then: "Low", else: "Normal" } } } }
])
```

### 12. Filter High Price Products
**Goal**: Return products costing more than 10,000.
```javascript
db.products.aggregate([
  { $match: { price: { $gt: 10000 } } }
])
```

### 13. Active User List
**Goal**: Filter users whose status is set to "active".
```javascript
db.users.aggregate([
  { $match: { status: "active" } }
])
```

### 14. Delivered Orders Only
**Goal**: Pull records for all orders that reached "delivered" status.
```javascript
db.orders.aggregate([
  { $match: { status: "delivered" } }
])
```

### 15. Bulk Order Filter
**Goal**: Find orders where the quantity is 2 or higher.
```javascript
db.orders.aggregate([
  { $match: { quantity: { $gte: 2 } } }
])
```

### 16. Top 2 Spenders
**Goal**: Identify the top 2 users based on total spending, including their details.
```javascript
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$totalAmount" } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 2 },
  { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } },
  { $unwind: "$userDetails" }
])
```

### 17. Revenue by Category
**Goal**: Calculate total revenue broken down by individual product categories.
```javascript
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.category", totalRevenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } }
])
```

### 18. Ghost Users (No Orders)
**Goal**: Find users who have never placed a single order.
```javascript
db.users.aggregate([
  { $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userOrders" } },
  { $match: { userOrders: { $size: 0 } } }
])
```

### 19. Bestselling Product
**Goal**: Find the most sold product across all orders.
```javascript
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.productId", totalSold: { $sum: "$items.qty" } } },
  { $sort: { totalSold: -1 } },
  { $limit: 1 },
  { $lookup: { from: "products", localField: "_id", foreignField: "_id", as: "productDetails" } },
  { $unwind: "$productDetails" }
])
```

### 20. 2025 Revenue Report
**Goal**: Calculate monthly revenue breakdown for the year 2025.
```javascript
db.orders.aggregate([
  { $match: { orderDate: { $gte: ISODate("2025-01-01"), $lte: ISODate("2025-12-31") } } },
  { $group: { _id: { month: { $month: "$orderDate" } }, monthlyRevenue: { $sum: "$totalAmount" } } },
  { $sort: { "_id.month": 1 } }
])
```

### 21. Top Active City
**Goal**: Find the city with the highest density of active users.
```javascript
db.users.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$city", activeUserCount: { $sum: 1 } } },
  { $sort: { activeUserCount: -1 } },
  { $limit: 1 }
])
```

### 22. Deep Quantity Filter
**Goal**: Within each order, filter the nested `items` array to only show items with qty >= 2.
```javascript
db.orders.aggregate([
  {
    $project: {
      items: {
        $filter: {
          input: "$items",
          as: "item",
          cond: { $gte: ["$$item.qty", 2] }
        }
      }
    }
  }
])
```

### 23. Electronics Items Only
**Goal**: Within each order, filter the nested `items` array to only show Electronics.
```javascript
db.orders.aggregate([
  {
    $project: {
      items: {
        $filter: {
          input: "$items",
          as: "item",
          cond: { $eq: ["$$item.category", "Electronics"] }
        }
      }
    }
  }
])
```

### 24. High Value Items Flag
**Goal**: Add a `highValueItems` field containing only nested items priced over 20,000.
```javascript
db.orders.aggregate([
  {
    $addFields: {
      highValueItems: {
        $filter: {
          input: "$items",
          as: "item",
          cond: { $gt: ["$$item.price", 20000] }
        }
      }
    }
  }
])
```

---

## � Project Structure

```text
├── app.js               # Main entry point
├── package.json         # Dependencies & project scripts
├── app/
│   ├── config/          # DB connection configurations
│   ├── controller/      # Logic for all 24 aggregation tasks
│   ├── helper/          # Database seeding helper
│   ├── model/           # Mongoose schemas (User, Product, Order)
│   └── router/          # Route declarations
└── .gitignore           # Files to ignore (node_modules, .env)
```

---

## 👤 Author
Developed as part of a MongoDB Aggregation Pipeline R&D
