import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export default abstract class DefaultModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;
}
