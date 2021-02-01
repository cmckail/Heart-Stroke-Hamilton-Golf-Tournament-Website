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
import HttpException from "../utils/errors/httpException";
import logger from "../utils/logger/logger";
import DefaultRepository from "../utils/repository/defaultRepo";

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

export class ImageRepository {
    private repo: DefaultRepository<Image>;
    constructor() {
        this.repo = new DefaultRepository(Image);
    }

    async addToDB(image: Image) {
        return await this.repo.addToDB(image);
    }

    async findByID(id: string) {
        return await this.repo.findOne({ where: { id } });
    }

    async findByFileName(filename: string) {
        return await this.repo.findOne({ where: { filename } });
    }
}

export default Image;
