CREATE DATABASE IF NOT EXISTS ApplianceInventory;
USE ApplianceInventory;

-- Table for User Details
CREATE TABLE users (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  address TEXT,
  mobile VARCHAR(20),
  email VARCHAR(100) UNIQUE,
  eircode VARCHAR(10)
);

-- Table for Appliance Details
CREATE TABLE appliances (
  ApplianceID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  appliance_type VARCHAR(50),
  brand VARCHAR(50),
  model_number VARCHAR(50),
  serial_number VARCHAR(50) UNIQUE,
  purchase_date DATE,
  warranty_expiration DATE,
  cost DECIMAL(10, 2),
  FOREIGN KEY (UserID) REFERENCES users(UserID) ON DELETE CASCADE
);