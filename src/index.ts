import "dotenv/config";
import app from './app';
import { VercelRequest, VercelResponse } from '@vercel/node';
import redoc from "redoc-express";
import swaggerDoc from "./swagger.json";

// const PORT = config.port || 3000;
const PORT = process.env.API_PORT||3000;

// const CSS_URL ="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";

// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec,{
//   customCssUrl: CSS_URL
// }))

app.get('/api-docs', redoc({
  title: 'API Documentation',
  specUrl: '/swagger.json',
}));

app.get('/swagger.json', (req, res) => {
  res.json(swaggerDoc);
});



// Start the Express server
// uncomment below code while running in local-------------------


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



// ----------------------------------------------------------



// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server...');
  process.exit(0);
});

export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};