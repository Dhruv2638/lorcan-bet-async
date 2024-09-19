
# Project Documentation

## 1. Overview

This project implements an asynchronous order processing system with several key features:
- **Asynchronous Order Processing**: Handles orders asynchronously, checking stock availability and processing payments with retry mechanisms for failed orders.
- **Concurrency Handling**: Ensures safe concurrent processing of multiple orders without race conditions.
- **Inventory Syncing**: Periodic synchronization of inventory levels with an external warehouse system.
- **Distributed Consistency**: Integration with an external payment service, handling failures, and ensuring eventual consistency.

## 2. Code Structure

- **Order Module**: Handles order creation, processing, and logging.
- **Inventory Module**: Manages inventory levels, including reserving and releasing stock.
- **Payment Module**: Simulates an external payment service with random success or failure.
- **Database Migrations**: Introduces new tables for categories and product-category relationships without breaking existing functionality.

### 2.1. Order Module

The order module is responsible for creating orders and processing them asynchronously. The `OrderProcessingService` handles the following:
- **Stock Check**: Verifies if enough stock is available.
- **Inventory Deduction**: Deducts stock if available.
- **Retry Mechanism**: Retries order processing if stock is insufficient.

### 2.2. Inventory Module

The inventory module manages the inventory levels:
- **Reserve Inventory**: Reserves stock when an order is created.
- **Release Inventory**: Releases stock if the order payment fails.

### 2.3. Payment Module

The payment module interacts with an external payment service:
- **Process Payment**: Calls the payment API and returns success or failure.
- **Simulated Failures**: The payment service randomly fails or succeeds to simulate real-world conditions.

## 3. Database Migration Strategy

To introduce the categorization feature without downtime:
- **Categories Table**: Created to store category names.
- **Product_Categories Table**: Created to store relationships between products and categories.

### 3.1. Migration Steps

1. **Create Categories Table**:
    ```sql
    CREATE TABLE Categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );
    ```

2. **Create Product_Categories Table**:
    ```sql
    CREATE TABLE Product_Categories (
        product_id INT REFERENCES Products(id) ON DELETE CASCADE,
        category_id INT REFERENCES Categories(id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, category_id)
    );
    ```

3. **Update Models**: Update the product and category models to reflect these changes.

## 4. Setup Instructions

### 4.1. Prerequisites

- **Node.js** and **npm** installed.
- **PostgreSQL** installed and running.

### 4.2. Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/your-project.git
    ```
2. **Install Dependencies**:
    ```bash
    cd your-project
    npm install
    ```

3. **Configure Environment Variables**: Create a `.env` file and add the necessary environment variables:
    ```bash
    DB_DIALECT=postgres
    DB_HOST=host
    DB_PORT=5432
    DB_PASS=password
    DB_USER=user
    DB_DATABASE=name
    ```

### 4.3. Database Migration

Run the migrations to set up the database schema:
```bash
npx sequelize-cli db:migrate
```

### 4.4. Running the Project

Start the application:
```bash
npm start
```

### 4.5. Testing the Project

- **Create Order**: Use Postman or CURL to make a POST request to `/orders/create`.
- **Check Logs**: Monitor the `Order_Logs` table to see the processing status.

### 4.6. API collection
API collection I have uploaded json file in github by exporting the collection.

## 5. Explanation

### 5.1. Design Choices

- **Concurrency and Idempotency**: Implemented using database transactions and retry mechanisms to handle failures gracefully.
- **Distributed Consistency**: Ensured by reserving inventory first and processing payments in a two-phase commit style.

### 5.2. Migration Strategy

The migration was designed to be backward-compatible, allowing the existing product functionality to continue operating without interruption. The new tables were added in parallel to the existing schema, and no existing data was altered.
