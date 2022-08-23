import express from 'express';
import { initMaps } from '../../util/helpers';
import {
  validateReq,
  checkCache,
  resizeUpdateCache,
  respond
} from './middleware';
const routes = express.Router();

initMaps();

routes.get('/', validateReq, checkCache, resizeUpdateCache, respond);

export default routes;
