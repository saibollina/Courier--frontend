import express  from 'express';
import cors from 'cors';
import { healthRouter } from './src/routes/health.routes.js';
import db from './src/models/index.js';
import { placeRouter } from './src/routes/place.routes.js';
import { planRouter } from './src/routes/plan.routes.js';
import { authRouter } from './src/routes/auth.routes.js';
import { userRouter } from './src/routes/user.routes.js';

db.sequelize.sync();
const app = express();

const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

let corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.options("*", cors());

app.use(healthRouter);
app.use(placeRouter);
app.use(planRouter);
app.use(authRouter);
app.use(userRouter);



