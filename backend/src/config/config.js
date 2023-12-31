import rateLimit from "express-rate-limit";
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
export const corsOptions = {
  origin: "http://your-allowed-origin.com", // Specify the allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed HTTP methods
  credentials: true, // Enable credentials (cookies, HTTP authentication) cross-origin
  optionsSuccessStatus: 204, // Specify the HTTP status code for successful preflight requests
  allowedHeaders: "Content-Type,Authorization", // Specify the allowed headers
  exposedHeaders: "Content-Range,X-Content-Range", // Specify the exposed headers
  maxAge: 600, // Specify the maximum age (in seconds) of the preflight request
};
