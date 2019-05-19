import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Photo } from './Photo'


@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => Photo, photo => photo.author)
    photos: Photo[];
}