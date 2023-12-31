import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import rateLimit from "express-rate-limit";
import session from "express-session";
import jwt from "express-jwt";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmetCSP from "helmet-csp";
import { corsOptions } from "./config/config.js";
import xss from 'xss-clean';


const App = express();

//* Middleware to parse JSON requests with a limit of 10MB
App.use(express.json({ limit: "10MB" }));

//* Middleware to parse URL-encoded requests with extended mode set to true and a limit of 10MB
App.use(bodyParser.urlencoded({ extended: true, limit: "10MB" }));

//* Middleware to parse URL-encoded requests with extended mode set to false and a limit of 10MB
App.use(bodyParser.urlencoded({ extended: false, limit: "10MB" }));

//* Middleware to sanitize user input for preventing Cross-Site Scripting (XSS) attacks
App.use(xss());


//* Middleware to add various HTTP headers to enhance security (using helmet)
App.use(helmet());

//* Middleware to sanitize user input against MongoDB query injection
App.use(mongoSanitize());

//* Middleware for compressing response bodies for faster transmission
App.use(compression());

//* Middleware for enabling Cross-Origin Resource Sharing (CORS)
App.use(cors(corsOptions));

//* Middleware for logging HTTP requests
App.use(morgan("combined"));

//* Middleware for parsing cookies attached to the client's request
App.use(cookieParser());

//* Middleware for enhancing security by adding Content Security Policy (CSP) headers
App.use(helmetCSP());
export default App;
