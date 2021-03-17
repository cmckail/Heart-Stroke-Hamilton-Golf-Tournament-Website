import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("appointments")
class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    stripeId!: string;

    @Column()
    timeStart!: Date;

    @Column()
    timeEnd!: Date;

    @CreateDateColumn()
    createdAt?: Date;
}

export default Appointment;
