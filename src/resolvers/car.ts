import 'reflect-metadata'
import { Arg, Authorized, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
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
    @Authorized(['ADMIN'])
    @Mutation(() => String)
    public async addCar(@Arg('input') input: AddCarInput): Promise<string> {
        await getConnection('default')
            .manager.save(Object.assign(new Car(), input))
            .then(() => console.log('SAVED CAR'))
        return 'saved, should return ID!'
    }

    @Authorized()
    @Query(() => [Car!]!)
    public async getAllCars(): Promise<Car[]> {
        return Car.find({ skip: 0, take: 25 })
    }
}
