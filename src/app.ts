import express, { Application, Request,Response } from "express";
import appRoutes from "./routes";
import connectDb from "./config/database";
import initializeSwaggerDocumentation from "./config/initializeSwaggerDocumentation";
import { testFunction } from "./modules/Common/controller/testController";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

// import errorHandler from './middleware/errorHandler';

connectDb();
const app: Application = express();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended:false}))


app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:4001');
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    // res.header("Access-Control-Allow-Credentials", "true"); // Required for authentication (cookies, JWT)
    if (req.method === "OPTIONS") {
      res.sendStatus(200); // Properly handle preflight requests
      return;
    }
    next();
  });

// Routes
app.use('/api', appRoutes);
app.get('/',testFunction)
// initializeSwaggerDocumentation(app);

// Global Error Handler
// app.use(errorHandler);

export default app;