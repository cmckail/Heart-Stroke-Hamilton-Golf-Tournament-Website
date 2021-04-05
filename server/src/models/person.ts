import { Column, Entity, OneToMany } from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import { RegistrationPlayer } from "./registration";

@Entity()
export default class Person extends DefaultModel {
    constructor(firstName?: string, lastName?: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
    }

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
}
