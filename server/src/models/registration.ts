/**
 * Registration Model used for registering multiple players for the golf tournament
 * and selection of meal type at registration
 */

import { IPlayerView } from "@local/shared/view-models/registration";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import Person from "./person";

@Entity()
export default class Registration extends DefaultModel {
    constructor(options?: { teeRange: string; players: IPlayerView[] }) {
        super();
        if (options) {
            const { teeRange, players } = options;
            this.teeRange = teeRange;
            this.players = [];
            for (let i of players) {
                let player = new RegistrationPlayer();
                player.person = new Person({
                    firstName: i.player.firstName,
                    lastName: i.player.lastName,
                });
                player.mealChoice = i.mealChoice;
                this.players.push(player);
            }
        }
    }

    @Column()
    teeRange: string;

    @OneToMany(() => RegistrationPlayer, (x) => x.registration, {
        cascade: true,
        eager: true,
    })
    players: RegistrationPlayer[];
}

@Entity()
export class RegistrationPlayer extends DefaultModel {
    @ManyToOne(() => Person, (person) => person.registrations, {
        cascade: true,
        eager: true,
    })
    @JoinColumn({ name: "person_id" })
    person: Person;

    @ManyToOne(() => Registration, (x) => x.players)
    @JoinColumn({ name: "registration_id" })
    registration: Registration;

    @Column()
    mealChoice: string;
}
