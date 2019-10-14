import 'reflect-metadata'
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { getConnection } from 'typeorm'
import Car from '../entities/car.entity'

@InputType()
class AddCarInput {
    @Field()
    public make: string

    @Field()
    public model: string

    @Field()
    public year: number

    @Field()
    public initialMileage: number

    @Field()
    public doors: number

    @Field()
    public purchaseDate: Date
}

@Resolver(() => Car)
export default class CarResolver {
    @Mutation(() => String)
    public async addCar(@Arg('input') input: AddCarInput): Promise<string> {
        let newCarRecord = new Car()
        newCarRecord.make = input.make
        newCarRecord.model = input.model
        newCarRecord.year = input.year
        newCarRecord.initialMileage = input.initialMileage
        newCarRecord.doors = input.doors
        newCarRecord.purchaseDate = input.purchaseDate

        await getConnection('default')
            .manager.save(newCarRecord)
            .then(() => console.log('SAVED CAR'))
        return 'saved, should return ID!'
    }

    @Query(() => [Car!]!)
    public async getAllCars(): Promise<Car[]> {
        return Car.find({ skip: 0, take: 25 })
    }
}
