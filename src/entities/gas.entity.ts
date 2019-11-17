import 'reflect-metadata'
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import Car from './car.entity'

@Entity({ name: 'gas' })
@ObjectType()
export default class Gas extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @Field(() => Int)
    public id: number

    @Column({ type: 'bigint', name: 'car_id' })
    @Field(() => Int)
    public carId: number

    @Column({ type: 'timestamp' })
    @Field(() => Date)
    public date: Date

    @Column({ type: 'real' })
    @Field(() => Float)
    public octane: number

    @Column({ type: 'real' })
    @Field(() => Float)
    public price: number

    @Column({ type: 'real' })
    @Field(() => Float)
    public gallons: number

    @Column({ type: 'real' })
    @Field(() => Float)
    public total: number

    @Column({ type: 'real' })
    @Field(() => Float)
    public mileage: number

    @Field(() => Car)
    @ManyToOne(type => Car, car => car.id)
    @JoinColumn({ name: 'car_id' })
    public car: Car
}
