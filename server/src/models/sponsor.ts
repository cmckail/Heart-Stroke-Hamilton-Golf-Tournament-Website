/**
 * Sponsor Model used for the Sponsors page
 * contains properties such as LOGO, URL, DESCRIPTION
 */

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import Image from "./image";

@Entity("sponsors")
export default class Sponsor extends DefaultModel {
    constructor(options?: {
        name: string;
        description?: string;
        url?: string;
        logo?: Image;
    }) {
        super();
        if (options) {
            const { name, description, url, logo } = options;
            this.name = name;
            this.description = description;
            this.url = url;
            this.logo = logo;
        }
    }

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    url?: string;

    @OneToOne(() => Image, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    @JoinColumn({ name: "logo_id" })
    logo?: Image;
}
