import 'reflect-metadata'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Float, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity({ name: 'cars' })
export default class Car extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ type: 'bigint' })
    public id: number

    @Field(() => String)
    @Column({ type: 'text' })
    public make: string

    @Field(() => String)
    @Column({ type: 'text' })
    public model: string

    @Field(() => Int)
    @Column({ type: 'integer' })
    public year: number

    @Field(() => Float)
    @Column({ type: 'real', name: 'initial_mileage' })
    public initialMileage: number

    @Field(() => Int)
    @Column({ type: 'smallint' })
    public doors: number

    @Field(() => Date)
    @Column({ type: 'timestamp', name: 'purchase_date' })
    public purchaseDate: Date
}
