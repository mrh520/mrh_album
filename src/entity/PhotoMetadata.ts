import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Photo } from './Photo';

@Entity()
export class PhotoMetadata {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("int")
    height: number;
    @Column("int")
    width: number;
    @Column()
    compressed: boolean;
    @Column()
    orientation: string;
    @Column()
    comment: string;
    @OneToOne(type => Photo, photo => photo.metadata, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    photo: Photo;
}
