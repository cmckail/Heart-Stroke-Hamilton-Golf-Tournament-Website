import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Registration {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    stripeCustomerId!: string;

    @Column()
    teeRange?: string;

    @Column()
    foodChoice!: string;

    @CreateDateColumn()
    createdAt?: Date;
}

export default Registration;
