# Medications API

A simple RESTful API that provides information about medications and health-related articles. The API serves two main endpoints: one for retrieving articles related to health and another for accessing medication information.

## Features

- Fetch articles related to various health topics.
- Retrieve information about different medications.
- Combined endpoint for accessing both articles and medicines.

## Endpoints

### 1. Get Articles

- **URL**: `/api/articles`
- **Method**: `GET`
- **Response**:
  - Returns a list of health articles.

### 2. Get Medicines

- **URL**: `/api/medicines`
- **Method**: `GET`
- **Response**:
  - Returns a list of medications and their uses.

### 3. Get Combined Resources

- **URL**: `/api/resources`
- **Method**: `GET`
- **Response**:
  - Returns both articles and medicines in a single response.

## Usage

You can run this API locally by cloning the repository and running the following commands:

```bash
# Clone the repository
git clone https://github.com/ZyadWKhedr/medications_api.git

# Navigate to the project directory
cd medications_api

# Install dependencies
npm install

# Start the server
npm start
```
### 4. Deployment
This API is deployed on Railway and can be accessed at the following URL:

API Base URL: https://medicationsapi-production.up.railway.app/
Contributing
Feel free to submit issues or pull requests to enhance the functionality of this API.
