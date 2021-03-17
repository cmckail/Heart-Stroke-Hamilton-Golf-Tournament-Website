import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("refresh")
class RefreshToken {
    @PrimaryColumn()
    id!: string;

    @CreateDateColumn()
    createdAt?: Date;
}

export default RefreshToken;
