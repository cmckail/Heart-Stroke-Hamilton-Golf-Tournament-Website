import {
    Column,
    CreateDateColumn,
    Entity,
    getConnection,
    PrimaryGeneratedColumn,
    Repository,
    QueryFailedError,
    FindManyOptions,
    FindOneOptions,
} from "typeorm";
import HttpException from "../utils/errors/http-exception";
import logger from "../utils/logger/logger";
import DefaultRepository from "../utils/defaults/default-repo";

enum ImageMimeTypes {
    JPEG = "image/jpeg",
    PNG = "image/png",
}

@Entity("images")
class Image {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    data!: Buffer;

    @Column({
        type: "simple-enum",
        enum: ImageMimeTypes,
    })
    mimetype!: string;

    @Column({ nullable: true })
    filename?: string;

    @CreateDateColumn()
    createdAt?: Date;
}

export default Image;
