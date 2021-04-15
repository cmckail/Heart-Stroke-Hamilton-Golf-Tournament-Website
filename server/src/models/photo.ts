import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import Image from "./image";

@Entity("photos")
export default class Photo extends DefaultModel {
    constructor(options?: { image: Image; caption?: string }) {
        super();
        if (options) {
            const { image, caption } = options;
            this.image = image;
            this.caption = caption;
        }
    }

    @Column({ nullable: true })
    caption?: string;

    @ManyToOne(() => Image, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "image_id" })
    image: Image;
}
