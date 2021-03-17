import { ISession } from "connect-typeorm";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity()
class Session implements ISession {
    @Index()
    @Column("bigint")
    expiredAt = Date.now();

    @PrimaryColumn("varchar", { length: 255 })
    id = "";

    @Column("text")
    json = "";
}

export default Session;
