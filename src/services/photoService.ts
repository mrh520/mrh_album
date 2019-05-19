import { getManager, Code } from 'typeorm';
import { Photo } from '../entity/Photo';
import { Album } from '../entity/Album';
import { PhotoMetadata } from '../entity/PhotoMetadata';
import { Author } from '../entity/Author';
import { ApiResult, Message, StatusCode } from '../common/apiResult';
import { isPropertyAccessOrQualifiedName } from 'typescript';

export class PhotoService {
    /**
     * 创建图片信息
     * @param data 图片详细信息
     */
    static async createPhoto(data: any): Promise<ApiResult> {
        let apiResult = new ApiResult();
        try {
            await getManager().transaction(async transactionManager => {
                let albums: Album[] = [];
                //相册
                for (let i = 0; i < data.albums.length; i++) {
                    let album: Album = new Album();
                    album.id = data.albums[i].id;
                    album.name = data.albums[i].name;
                    albums.push(album);
                }

                //await transactionManager.save(albums);
                //相片作者
                let author: Author = new Author();
                author.name = data.author.name;
                await transactionManager.save(author);

                //相片
                let photo = new Photo();
                photo.name = data.name;
                photo.description = data.description;
                photo.filename = data.filename;
                photo.views = data.views;
                photo.isPublished = data.isPublished;
                photo.albums = albums;
                photo.author = author;
                //相片详情
                let photoMetadata = new PhotoMetadata();
                photoMetadata.comment = data.photoMetadata.comment;
                photoMetadata.compressed = data.photoMetadata.compressed;
                photoMetadata.height = data.photoMetadata.height;
                photoMetadata.width = data.photoMetadata.width;
                photoMetadata.orientation = data.photoMetadata.orientation;
                await transactionManager.save(photoMetadata);

                photo.metadata = photoMetadata;
                let result = await transactionManager.save(photo);
                apiResult.code = StatusCode.success;
                apiResult.data = result;
                apiResult.message = Message.success;
            })
        } catch (error) {
            apiResult.code = StatusCode.failed;
            apiResult.message = Message.failed;
        }
        return apiResult;
    }
    /**
     * 获取图片列表及其关联数据
     * @param params 
     */
    static async  GetPhoto(params): Promise<ApiResult> {
        let apiResult = new ApiResult();
        if (params) console.log(6666);
        let photoReposiroty = await getManager().getRepository(Photo);
        let result = await photoReposiroty.createQueryBuilder('photo')
            .leftJoinAndSelect('photo.metadata', 'metadata')
            .leftJoinAndSelect('photo.albums', 'album')
            .getMany();
        apiResult.code = StatusCode.success;
        apiResult.data = result;
        apiResult.message = Message.success;
        return apiResult;
    }
    /**
     * 更新图片信息
     * @data 图片详细信息
     */
    static async updatePhoto(data: any): Promise<ApiResult> {
        let apiResult = new ApiResult();
        await getManager().transaction(async transactionManager => {
            //解析数据
            let albums: Album[] = [];
            //相册
            for (let i = 0; i < data.albums.length; i++) {
                let album: Album = new Album();
                album.id = data.albums[i].id;
                album.name = data.albums[i].name;
                albums.push(album);
            }
            //相片作者
            let author: Author = new Author();
            author.id = data.author.id;
            author.name = data.author.name;
            //相片
            let photo = new Photo();
            photo.id = data.id;
            photo.name = data.name;
            photo.description = data.description;
            photo.filename = data.filename;
            photo.views = data.views;
            photo.isPublished = data.isPublished;
            photo.albums = albums;
            photo.author = author;
            //相片详情
            let photoMetadata = new PhotoMetadata();
            photoMetadata.id = data.photoMetadata.id;
            photoMetadata.comment = data.photoMetadata.comment;
            photoMetadata.compressed = data.photoMetadata.compressed;
            photoMetadata.height = data.photoMetadata.height;
            photoMetadata.width = data.photoMetadata.width;
            photoMetadata.orientation = data.photoMetadata.orientation;
            let result = await transactionManager.save(photo);
            apiResult.code = StatusCode.success;
            apiResult.data = result;
            apiResult.message = Message.success;
        })
        return apiResult;
    }
    /**
     * 通过id删除图片
     * @param params 请求参数
     */
    static async deletePhotoById(params): Promise<ApiResult> {
        let apiResult = new ApiResult();
        await getManager().transaction(async transactionManager => {
            // let result = await transactionManager.createQueryBuilder()
            //     .delete()
            //     .from(Photo)
            //     .where("id=:id", { id: params.id[0] })
            //     .execute();
            try {
                let result = await transactionManager.delete(Photo, params.id);
                apiResult.code = StatusCode.success;
                apiResult.data = result;
                apiResult.message = Message.success;
            } catch (error) {
                apiResult.code = StatusCode.failed;
                apiResult.message = Message.failed;
            }
        })
        return apiResult;
    }

}