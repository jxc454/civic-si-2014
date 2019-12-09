import 'reflect-metadata'
import {
    Arg,
    Args,
    ArgsType,
    Authorized,
    Ctx,
    Field,
    InputType,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql'
import Gas from '../entities/gas.entity'
import { getConnection } from 'typeorm'
import { Min } from 'class-validator'
import Car from '../entities/car.entity'
import computeMileage from '../milesPerGallon'
import { Context } from 'vm'

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

@ObjectType()
class MileageByDate {
    @Field()
    public date: Date

    @Field()
    public mileage: number
}

@ArgsType()
class CarId {
    @Field(() => Int)
    public carId: number
}

@Resolver(() => Gas)
export default class GasResolver {
    @Authorized('ADMIN')
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

    @Authorized()
    @Query(() => [Gas!]!)
    public async getGas(
        @Arg('id')
        id: number
    ): Promise<Gas[]> {
        return Gas.findByIds([id])
    }

    @Authorized('READ')
    @Query(() => [MileageByDate!]!)
    public async getMileageByDate(
        @Ctx() ctx: Context,
        @Args() { carId }: CarId
    ): Promise<MileageByDate[]> {
        // get initialMileage for the car
        const initialMileage = (await Car.findOne({ id: carId })).initialMileage

        // get date, gallons, mileage for the car
        const res = await Gas.createQueryBuilder('gas')
            .innerJoin('gas.car', 'car')
            .where({ carId })
            .select(['gas.date', 'gas.mileage', 'gas.gallons'])
            .orderBy('gas.date', 'ASC')
            .getMany()

        // calculate mpg
        return computeMileage(
            initialMileage,
            res.map(d => {
                return { date: d.date, gallons: d.gallons, miles: d.mileage }
            })
        )
    }
}
