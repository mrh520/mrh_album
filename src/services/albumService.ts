import { Album } from '../entity/Album';
import { ApiResult, Message, StatusCode } from '../common/apiResult';
import { User } from '../entity/User';
import { getManager, Code } from 'typeorm';
export class AlbumService {
    /**
     * 创建相册
     * @param data 相册信息
     */
    static async createAlbum(data: any): Promise<ApiResult> {
        let apiResult = new ApiResult();
        try {
            await getManager().transaction(async transactionManager => {
                let user = await transactionManager.getRepository(User).findOne(data.user.id);
                let album = new Album();
                album.name = data.name;
                album.user = user;
                let result = await transactionManager.save(album);
                apiResult.code = StatusCode.success;
                apiResult.data = result;
                apiResult.message = Message.success;
            })
        } catch (error) {
            apiResult.code = StatusCode.failed;
            apiResult.data = error;
            apiResult.message = Message.failed;
        }
        return apiResult;

    }
    /**
     * 查找相册列表
     */
    static async getAlbumList(): Promise<ApiResult> {
        let apiResult = new ApiResult();
        try {
            let albumReposiroty = await getManager().getRepository(Album);
            let result = albumReposiroty.createQueryBuilder('album')
                .leftJoinAndSelect('album.user', 'user')
                .getManyAndCount();
            apiResult.code = StatusCode.success;
            apiResult.data = result;
            apiResult.message = Message.success;
        } catch (error) {
            apiResult.code = StatusCode.failed;
            apiResult.data = error;
            apiResult.message = Message.failed;
        }
        return apiResult;
    }
    /**
     * 通过id查找相册
     * @param param 相册id
     */
    static async getAlbumById(param: any): Promise<ApiResult> {
        let apiResult = new ApiResult();
        try {
            let albumReposiroty = await getManager().getRepository(Album);
            let result = albumReposiroty.createQueryBuilder('album')
                .leftJoinAndSelect('album.user', 'user')
                .where('id=:id', { id: param.id })
                .getManyAndCount();
            apiResult.code = StatusCode.success;
            apiResult.data = result;
            apiResult.message = Message.success;

        } catch (error) {
            apiResult.code = StatusCode.failed;
            apiResult.data = error;
            apiResult.message = Message.failed;
        }
        return apiResult;
    }
    /**
     * 更新相册信息
     * @param data 相册信息
     */
    static async updateAlbum(data: any): Promise<ApiResult> {
        let apiResult = new ApiResult();
        try {
            await getManager().transaction(async transactionManager => {
                let user = await transactionManager.getRepository(User).findOne(data.user.id);
                let album = new Album();
                album.id = data.id;
                album.name = data.name;
                album.user = user;
                let result = await transactionManager.save(album);
                apiResult.code = StatusCode.success;
                apiResult.data = result;
                apiResult.message = Message.success;
            })
        } catch (error) {
            apiResult.code = StatusCode.failed;
            apiResult.data = error;
            apiResult.message = Message.failed;
        }
        return apiResult;
    }
    /**
     * 通过id删除相册
     * @param param 相册id
     */
    static async deleteAlbumById(param: any): Promise<ApiResult> {
        let apiResult = new ApiResult();
        try {
            await getManager().transaction(async transactionManager => {
                let result = await transactionManager.delete(Album, param.id);
                apiResult.code = StatusCode.success;
                apiResult.data = result;
                apiResult.message = Message.success;
            })

        } catch (error) {
            apiResult.code = StatusCode.failed;
            apiResult.data = error;
            apiResult.message = Message.failed;
        }
        return apiResult;
    }
}