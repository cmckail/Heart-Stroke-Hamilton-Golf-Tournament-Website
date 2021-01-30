import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("images")
class Image {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("blob")
    data!: Buffer;

    @Column()
    mimetype!: string;

    @CreateDateColumn()
    createdAt!: Date;
}

export default Image;
