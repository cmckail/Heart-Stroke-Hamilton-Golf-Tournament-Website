import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

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

    @Column({ type: "uuid", generated: "uuid" })
    publicId?: string;

    @CreateDateColumn()
    createdAt?: Date;
}

export default Image;
