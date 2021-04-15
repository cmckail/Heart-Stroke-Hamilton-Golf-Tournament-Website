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
import Image from "./image";

// enum SponsorTypes {
//     GOLD = "gold",
// }

@Entity("sponsors")
export default class Sponsor {
    @PrimaryGeneratedColumn("uuid")
    id: string = "";

    @Column()
    name!: string;

    @OneToOne((type) => Image, { nullable: true })
    @JoinColumn()
    logo?: Image;

    // @Column({
    //     type: "simple-enum",
    //     enum: SponsorTypes,
    // })
    // type?: SponsorTypes;

    @CreateDateColumn()
    createdAt?: Date;
}
