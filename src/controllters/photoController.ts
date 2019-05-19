import { Request, Response } from 'express';
import { PhotoService } from '../services/photoService';

export class PhotoController {
    /**
     *  保存相片
     */
    static async createPhoto(req: Request, res: Response) {
        let result = await PhotoService.createPhoto(req.body);
        res.send(result);
        res.end();
    }
    /**
     * 获取图片列表
     * @param req 请求对象
     * @param res 返回对象
     */
    static async  getPhoto(req: Request, res: Response) {
        let params = req.query;
        let result = await PhotoService.GetPhoto(params);
        res.send(result);
        res.end();
    }
    /**
     * 更新图片信息
     * @param req 请求对象
     * @param res 返回对象
     */
    static async updataPhoto(req: Request, res: Response) {
        let params = req.query;
        let params2 = req.body;
        console.log(params);
    }
    /**
     * 获取id删除图片
     * @param req 请求对象
     * @param res 返回对象
     */
    static async deletePhotoById(req: Request, res: Response) {
        let params = req.query;
        let result = await PhotoService.deletePhotoById(params);
        res.send(result);
        res.end();
    }
}
