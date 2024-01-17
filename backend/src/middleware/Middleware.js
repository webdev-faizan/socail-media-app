import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import session from 'express-session'
import jwt from 'express-jwt'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmetCSP from 'helmet-csp'
import { corsOptions } from '../config/config.js'
import xss from 'xss-clean'
const Middleware = () => {
  const App = express()
}

export default Middleware
