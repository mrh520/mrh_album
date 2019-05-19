import * as express from 'express';
import { AlbumController } from '../controllters/albumController'
const albumRouter = express();
albumRouter.post('/', AlbumController.createAlbum);

albumRouter.get('/', AlbumController.getAlbumList);
albumRouter.get('/:id', AlbumController.getAlbumById);
albumRouter.put('/', AlbumController.updateAlbum);
albumRouter.delete('/', AlbumController.deleteAlbumById);

module.exports = albumRouter;
