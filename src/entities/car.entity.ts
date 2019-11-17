import 'reflect-metadata'
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, Float, Int, ObjectType } from 'type-graphql'
import Gas from './gas.entity'

@Entity({ name: 'cars' })
@ObjectType()
export default class Car extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    @OneToMany(() => Gas, gas => gas.carId)
    @JoinColumn()
    @Field(() => Int)
    public id: number

    @Column({ type: 'text' })
    @Field(() => String)
    public make: string

    @Column({ type: 'text' })
    @Field(() => String)
    public model: string

    @Column({ type: 'integer' })
    @Field(() => Int)
    public year: number

    @Column({ type: 'real', name: 'initial_mileage' })
    @Field(() => Float)
    public initialMileage: number

    @Column({ type: 'smallint' })
    @Field(() => Int)
    public doors: number

    @Column({ type: 'timestamp', name: 'purchase_date' })
    @Field(() => Date)
    public purchaseDate: Date
}
