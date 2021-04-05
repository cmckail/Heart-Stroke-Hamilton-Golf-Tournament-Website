import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { RegistrationPlayer } from "./registration";

@Entity()
export default class Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email?: string;

    @OneToMany(
        (type) => RegistrationPlayer,
        (registrationPlayer) => registrationPlayer.person
    )
    registrations?: RegistrationPlayer[];

    @CreateDateColumn()
    createdAt: Date;
}
