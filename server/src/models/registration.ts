import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import Person from "./person";

@Entity()
export default class Registration {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    teeRange: string;

    @OneToMany((type) => RegistrationPlayer, (x) => x.registration, {
        cascade: true,
        eager: true,
    })
    players: RegistrationPlayer[];

    @CreateDateColumn()
    createdAt: Date;
}

@Entity()
export class RegistrationPlayer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne((type) => Person, (person) => person.registrations, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "person_id" })
    person: Person;

    @ManyToOne((type) => Registration, (x) => x.players)
    @JoinColumn({ name: "registration_id" })
    registration: Registration;

    @Column()
    mealChoice: string;

    @CreateDateColumn()
    createdAt: Date;
}
