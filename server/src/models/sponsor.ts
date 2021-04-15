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
    constructor(
        name?: string,
        description?: string,
        url?: string,
        logo?: Image
    ) {
        super();
        this.name = name;
        this.description = description;
        this.url = url;
        this.logo = logo;
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
