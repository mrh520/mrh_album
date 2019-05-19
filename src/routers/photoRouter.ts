import * as express from 'express';
import { PhotoController } from '../controllters/photoController';
const photoRouter = express();
photoRouter.get('/', PhotoController.getPhoto);

photoRouter.post('/', PhotoController.createPhoto);

photoRouter.put('/', PhotoController.updataPhoto);

photoRouter.delete('/', PhotoController.deletePhotoById);

module.exports = photoRouter;