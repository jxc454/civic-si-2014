import 'reflect-metadata'
import {BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'
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
import { v4 as uuidv4 } from 'uuid'
import isUUID = require('validator/lib/isUUID')

@ObjectType()
@ArgsType()
@Entity({ name: 'gas' })
export default class Gas extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn( { type: 'bigint'})
    public id: number

    @Field(() => Int)
    @Column( { type: 'bigint'})
    public car_id: number

    @Field(() => Date)
    @Column( { type: 'timestamp'})
    public date: Date

    @Field(() => Float)
    @Column( { type: 'real'})
    public octane: number

    @Field(() => Float)
    @Column( { type: 'real'})
    public price: number

    @Field(() => Float)
    @Column( { type: 'real'})
    public gallons: number

    @Field(() => Float)
    @Column( { type: 'real'})
    public total: number

    @Field(() => Float)
    @Column( { type: 'real'})
    public mileage: number
}
