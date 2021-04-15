/**
 * Refresh Token Model Used to refresh the data inside of the DB
 */
import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("refresh")
class RefreshToken {
    @PrimaryColumn()
    id!: string;

    @CreateDateColumn()
    createdAt?: Date;
}

export default RefreshToken;
