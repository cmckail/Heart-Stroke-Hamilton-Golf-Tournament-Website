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
    teeTime!: Date;

    @Column()
    foodChoice!: string;

    @CreateDateColumn()
    createdAt?: Date;
}

export default Registration;
