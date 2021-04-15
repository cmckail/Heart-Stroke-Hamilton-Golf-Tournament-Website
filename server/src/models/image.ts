import { Column, Entity } from "typeorm";
import DefaultModel from "../utils/defaults/default-model";

enum ImageMimeTypes {
    JPEG = "image/jpeg",
    PNG = "image/png",
}

@Entity("images")
export default class Image extends DefaultModel {
    constructor(options?: {
        data: Buffer;
        mimetype: string;
        filename?: string;
    }) {
        super();
        if (options) {
            const { data, mimetype, filename } = options;
            this.data = data;
            this.mimetype = mimetype;
            this.filename = filename;
        }
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
