import { Column, Entity, OneToMany } from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import { RegistrationPlayer } from "./registration";

@Entity()
export default class Person extends DefaultModel {
    constructor(options?: {
        firstName: string;
        lastName: string;
        email?: string;
        phone?: string;
    }) {
        super();
        if (options) {
            const { firstName, lastName, email, phone } = options;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phone = phone;
        }
    }

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @OneToMany(
        () => RegistrationPlayer,
        (registrationPlayer) => registrationPlayer.person
    )
    registrations?: RegistrationPlayer[];
}
