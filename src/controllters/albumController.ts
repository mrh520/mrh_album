import { Request, Response } from 'express';
import { AlbumService } from '../services/albumService';

export class AlbumController {
    /**
     * 创建相册
     * @param req 请求对象
     * @param res 返回对象
     */
    static async createAlbum(req: Request, res: Response) {
        let result = await AlbumService.createAlbum(req.body);
        res.send(result);
        res.end();

    }
    /**
     * 获取相册列表
     * @param req 请求对象
     * @param res 返回对象
     */
    static async getAlbumList(req: Request, res: Response) {
        let result = await AlbumService.getAlbumList();
        res.send(result);
        res.end();
    }
    /**
     * 通过id获取相册
     * @param req 请求参数
     * @param res 返回参数
     */
    static async getAlbumById(req: Request, res: Response) {
        let result = await AlbumService.getAlbumById(req.query);
        res.send(result);

    }
    /**
     * 更新相册信息
     * @param req 请求对象
     * @param res 返回对象
     */
    static async updateAlbum(req: Request, res: Response) {
        let result = await AlbumService.updateAlbum(req.body);
        res.send(result);
        res.end();
    }
    /**
     * 通过id删除相册
     * @param req 
     * @param res 
     */
    static async deleteAlbumById(req: Request, res: Response) {
        let result = await AlbumService.deleteAlbumById(req.query);
        res.send(result);
        res.end();
    }

}