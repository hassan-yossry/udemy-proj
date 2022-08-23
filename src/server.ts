import express from 'express';
import routes from './routes/index';
export const app = express();
const port = 3000;
app.use('/api', routes);
app.listen(port, () => console.log(`listening on port  ${port}`));
export default app;