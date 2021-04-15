/**
 * Session model used to grab session ID of users to save data carried over through pages
 */

import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
export default class Session implements ISession {
    @Index()
    @Column("bigint")
    expiredAt = Date.now();

    @PrimaryColumn("varchar", { length: 255 })
    id: string;

    @Column("text")
    json: string;
}
