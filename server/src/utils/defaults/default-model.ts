import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

/**
 * Default model class
 * All models will have id and createdAt columns
 */
export default abstract class DefaultModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;
}
