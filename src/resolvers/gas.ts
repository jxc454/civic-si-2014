import 'reflect-metadata'
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import Gas from '../entities/gas.entity'
import { getConnection } from 'typeorm'
import { Min } from 'class-validator'

@InputType()
class AddGasInput {
    @Field()
    @Min(0)
    public carId: number

    @Field()
    public date: Date

    @Field()
    public octane: number

    @Field()
    public price: number

    @Field()
    public gallons: number

    @Field()
    public total: number

    @Field()
    public mileage: number
}

@Resolver(() => Gas)
export default class GasResolver {
    @Mutation(() => String)
    public async addGas(@Arg('input') input: AddGasInput): Promise<string> {
        let newRecord = new Gas()
        newRecord.carId = input.carId
        newRecord.date = input.date
        newRecord.gallons = input.gallons
        newRecord.mileage = input.mileage
        newRecord.octane = input.octane
        newRecord.price = input.price
        newRecord.total = input.total

        await getConnection('default')
            .manager.save(newRecord)
            .then(() => console.log('SAVED GAS'))
        return 'saved, should return ID!'
    }

    @Query(() => [Gas!]!)
    public async getGas(
        @Arg('id')
        id: number
    ): Promise<Gas[]> {
        return Gas.findByIds([id])
    }
}
