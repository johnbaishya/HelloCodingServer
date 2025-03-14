# Prise

# Overview

Prise is a project designed to provide REST APIs for various enterprise applications used in daily business activities of an organization. These applications include solutions for human resource management, time tracking, project management, food ordering at restaurants, and more.

---

## **Technologies Used**

- **TypeScript**: Strongly typed programming language built on JavaScript.
- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express.js**: Web application framework for building APIs and web applications.
- **MongoDB**: NoSQL database for storing and managing application data.
- **AWS S3**: Cloud storage solution for handling file uploads and storage.

---

## **Getting Started**

Follow these steps to get the project up and running on your local machine:

### **Clone the Repository**
```bash
git clone https://github.com/johnbaishya/prise.git
```
### **Install Dependencies**
Navigate to the project directory and install required packages:

```bash
npm install
```
### **Setup Environment Variables (for local environment)**
Create a .env file in the root directory and configure the required environment variables. Example:

```bash
PORT=3000
MONGO_URI=<your_mongodb_connection_string>
AWS_ACCESS_KEY_ID=<your_aws_access_key>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_key>
AWS_REGION=<your_aws_region>
S3_BUCKET_NAME=<your_s3_bucket_name>
JWT_SECRET=<your_jwt_secret>
```
### **src/index.ts**
in src/index.ts file add the following code to start the express server.
``` 
import "dotenv/config";
import app from './app';
....
.......
// const PORT = config.port || 3000;
const PORT = process.env.API_PORT||3000;

// Start the Express server
// add this lines of code while running in local----------------------------------

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});

// ----------------------------------------------------------------------------

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server...');
  process.exit(0);
});
```
### **Running in Dev Mode**
execute the following command in the root of the project

```npm run dev ```
### **Build the project**
```npm run build```
### **Run the project** 
```npm run start```
## **Deployment**
Prise is configured to be hosted on Vercel for seamless deployment and scalability. Ensure all environment variables are set in the Vercel dashboard.

## **Available Modules**
### **ClockMe**
A module for managing employee attendance by enabling clock-in and clock-out functionality.

## API Documentation
### Login API
* URI: ```/api/user/login```
* Method: ```POST```
* Request Body:
```
{
  "email": "user@example.com",
  "password": "password123"
}
```
### Register API
* URI: ```/api/user/register```
* Method: ```POST```
* Request Body:
```
{
  "first_name": "John ",
  "last_name": "Doe",
  "email": "user@example.com",
  "password": "password123"
}
```
find full [REST API Documentation ](https://prise.vercel.app/api-docs/) here

## Contributing
We welcome contributions from the community! Whether you want to fix a bug, add a feature, or enhance documentation, feel free to:

- Fork this repository.
- Create a feature branch: ```git checkout -b feature-name.```
- Commit your changes: ```git commit -m "Add new feature"```.
- Push the branch: ```git push origin feature-name.```
- Open a pull request.
## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

Feel free to clone, contribute, or use this project!