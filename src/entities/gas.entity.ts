import 'reflect-metadata'
import {
    BaseEntity,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import {
    Field,
    ID,
    ObjectType,
    Float,
    Int,
    ArgsType,
    FieldResolver,
    Root,
} from 'type-graphql'
import { Column } from 'typeorm'
import Car from './car.entity'

@ObjectType()
@Entity({ name: 'gas' })
export default class Gas extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number

    @Field(() => Int)
    @Column({ type: 'bigint', name: 'car_id' })
    public carId: number

    @Field(() => Date)
    @Column({ type: 'timestamp' })
    public date: Date

    @Field(() => Float)
    @Column({ type: 'real' })
    public octane: number

    @Field(() => Float)
    @Column({ type: 'real' })
    public price: number

    @Field(() => Float)
    @Column({ type: 'real' })
    public gallons: number

    @Field(() => Float)
    @Column({ type: 'real' })
    public total: number

    @Field(() => Float)
    @Column({ type: 'real' })
    public mileage: number

    @Field(() => Car)
    @ManyToOne(type => Car, car => car.id)
    @JoinColumn({ name: 'car_id' })
    public car: Car
}
