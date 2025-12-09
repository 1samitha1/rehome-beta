// import createError from 'http-errors';
// import express, { Request, Response, NextFunction, RequestHandler } from 'express';
// import path, { dirname } from 'path';
// import cookieParser from 'cookie-parser';
// import logger from 'morgan';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';

// // Load environment variables
// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// import indexRouter from './routes/index';
// import usersRouter from './routes/users';

// const app = express();
// const port: string | number = process.env.PORT || 3000;

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // Middleware
// app.use(logger('dev') as RequestHandler);
// app.use(cookieParser() as RequestHandler);
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(createError(404));
// });

// // error handler
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// export default app;

import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();

// Port from env
const port = process.env.PORT || 3000;

// Views path — works both in dev and dist
const viewsPath =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'views')       // dist/views
    : path.join(__dirname, 'views');      // src/views in dev (ts-node-dev)

app.set('views', viewsPath);
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// Start server
app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});

export default app;
