/**
 * Image Model 
 * Contains image properties such as file name, file type
 * Used for images on the Photos page
 */

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import DefaultModel from "../utils/defaults/default-model";

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
    data!: Buffer;

    @Column({
        type: "simple-enum",
        enum: ImageMimeTypes,
    })
    mimetype!: string;

    @Column({ nullable: true })
    filename?: string;

    @Column({ type: "uuid", generated: "uuid" })
    publicId?: string;
}
