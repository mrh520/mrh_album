import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Photo } from './Photo';
import { User } from './User';
@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Photo, photo => photo.albums)
    @JoinTable()
    photos: Photo[];

    @ManyToOne(type => User, user => user.albums)
    user: User

}

