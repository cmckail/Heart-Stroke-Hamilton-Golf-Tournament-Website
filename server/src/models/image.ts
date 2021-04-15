import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import Photo from "./photo";

enum ImageMimeTypes {
    JPEG = "image/jpeg",
    PNG = "image/png",
}

@Entity("images")
export default class Image extends DefaultModel {
    constructor(data?: Buffer, mimetype?: string, filename?: string) {
        super();
        this.data = data;
        this.mimetype = mimetype;
        this.filename = filename;
    }
    @Column()
    data: Buffer;

    @Column({
        type: "simple-enum",
        enum: ImageMimeTypes,
    })
    mimetype: string;

    @Column({ nullable: true })
    filename?: string;
}
