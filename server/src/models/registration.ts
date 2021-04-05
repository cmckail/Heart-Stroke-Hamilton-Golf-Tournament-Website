import { IPlayerView } from "@local/shared/view-models/registration";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import DefaultModel from "../utils/defaults/default-model";
import Person from "./person";

@Entity()
export default class Registration extends DefaultModel {
    constructor(teeRanage?: string, players?: IPlayerView[]) {
        super();
        this.teeRange = teeRanage;

        if (players) {
            this.players = [];
            for (let i of players) {
                let player = new RegistrationPlayer();
                player.person = new Person();
                player.person.firstName = i.player.firstName;
                player.person.lastName = i.player.lastName;
                player.mealChoice = i.mealChoice;
                this.players.push(player);
            }
        }
    }

    @Column()
    teeRange: string;

    @OneToMany((type) => RegistrationPlayer, (x) => x.registration, {
        cascade: true,
        eager: true,
    })
    players: RegistrationPlayer[];
}

@Entity()
export class RegistrationPlayer extends DefaultModel {
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
}
