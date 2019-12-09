import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AddCarInput = {
  make: Scalars['String'],
  model: Scalars['String'],
  year: Scalars['Float'],
  initialMileage: Scalars['Float'],
  doors: Scalars['Float'],
  purchaseDate: Scalars['DateTime'],
};

export type AddGasInput = {
  carId: Scalars['Float'],
  date: Scalars['DateTime'],
  octane: Scalars['Float'],
  price: Scalars['Float'],
  gallons: Scalars['Float'],
  total: Scalars['Float'],
  mileage: Scalars['Float'],
};

export type Car = {
   __typename?: 'Car',
  id: Scalars['Int'],
  make: Scalars['String'],
  model: Scalars['String'],
  year: Scalars['Int'],
  initialMileage: Scalars['Float'],
  doors: Scalars['Int'],
  purchaseDate: Scalars['DateTime'],
};


export type Gas = {
   __typename?: 'Gas',
  id: Scalars['Int'],
  carId: Scalars['Int'],
  date: Scalars['DateTime'],
  octane: Scalars['Float'],
  price: Scalars['Float'],
  gallons: Scalars['Float'],
  total: Scalars['Float'],
  mileage: Scalars['Float'],
  car: Car,
};

export type MileageByDate = {
   __typename?: 'MileageByDate',
  date: Scalars['DateTime'],
  mileage: Scalars['Float'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addCar: Scalars['String'],
  addGas: Scalars['String'],
};


export type MutationaddCarArgs = {
  input: AddCarInput
};


export type MutationaddGasArgs = {
  input: AddGasInput
};

export type Query = {
   __typename?: 'Query',
  getAllCars: Array<Car>,
  getGas: Array<Gas>,
  getMileageByDate: Array<MileageByDate>,
};


export type QuerygetGasArgs = {
  id: Scalars['Float']
};


export type QuerygetMileageByDateArgs = {
  carId: Scalars['Int']
};

export type AddGasMutationVariables = {
  input: AddGasInput
};


export type AddGasMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addGas'>
);

export type MileageByDateQueryVariables = {
  carId: Scalars['Int']
};


export type MileageByDateQuery = (
  { __typename?: 'Query' }
  & { getMileageByDate: Array<(
    { __typename?: 'MileageByDate' }
    & Pick<MileageByDate, 'date' | 'mileage'>
  )> }
);


export const AddGasDocument = gql`
    mutation AddGas($input: AddGasInput!) {
  addGas(input: $input)
}
    `;
export type AddGasMutationFn = ApolloReactCommon.MutationFunction<AddGasMutation, AddGasMutationVariables>;
export type AddGasComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddGasMutation, AddGasMutationVariables>, 'mutation'>;

    export const AddGasComponent = (props: AddGasComponentProps) => (
      <ApolloReactComponents.Mutation<AddGasMutation, AddGasMutationVariables> mutation={AddGasDocument} {...props} />
    );
    
export type AddGasProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddGasMutation, AddGasMutationVariables> | TChildProps;
export function withAddGas<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddGasMutation,
  AddGasMutationVariables,
  AddGasProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddGasMutation, AddGasMutationVariables, AddGasProps<TChildProps>>(AddGasDocument, {
      alias: 'addGas',
      ...operationOptions
    });
};

/**
 * __useAddGasMutation__
 *
 * To run a mutation, you first call `useAddGasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGasMutation, { data, loading, error }] = useAddGasMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddGasMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddGasMutation, AddGasMutationVariables>) {
        return ApolloReactHooks.useMutation<AddGasMutation, AddGasMutationVariables>(AddGasDocument, baseOptions);
      }
export type AddGasMutationHookResult = ReturnType<typeof useAddGasMutation>;
export type AddGasMutationResult = ApolloReactCommon.MutationResult<AddGasMutation>;
export type AddGasMutationOptions = ApolloReactCommon.BaseMutationOptions<AddGasMutation, AddGasMutationVariables>;
export const MileageByDateDocument = gql`
    query MileageByDate($carId: Int!) {
  getMileageByDate(carId: $carId) {
    date
    mileage
  }
}
    `;
export type MileageByDateComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MileageByDateQuery, MileageByDateQueryVariables>, 'query'> & ({ variables: MileageByDateQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const MileageByDateComponent = (props: MileageByDateComponentProps) => (
      <ApolloReactComponents.Query<MileageByDateQuery, MileageByDateQueryVariables> query={MileageByDateDocument} {...props} />
    );
    
export type MileageByDateProps<TChildProps = {}> = ApolloReactHoc.DataProps<MileageByDateQuery, MileageByDateQueryVariables> | TChildProps;
export function withMileageByDate<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MileageByDateQuery,
  MileageByDateQueryVariables,
  MileageByDateProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MileageByDateQuery, MileageByDateQueryVariables, MileageByDateProps<TChildProps>>(MileageByDateDocument, {
      alias: 'mileageByDate',
      ...operationOptions
    });
};

/**
 * __useMileageByDateQuery__
 *
 * To run a query within a React component, call `useMileageByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useMileageByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMileageByDateQuery({
 *   variables: {
 *      carId: // value for 'carId'
 *   },
 * });
 */
export function useMileageByDateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MileageByDateQuery, MileageByDateQueryVariables>) {
        return ApolloReactHooks.useQuery<MileageByDateQuery, MileageByDateQueryVariables>(MileageByDateDocument, baseOptions);
      }
export function useMileageByDateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MileageByDateQuery, MileageByDateQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MileageByDateQuery, MileageByDateQueryVariables>(MileageByDateDocument, baseOptions);
        }
export type MileageByDateQueryHookResult = ReturnType<typeof useMileageByDateQuery>;
export type MileageByDateLazyQueryHookResult = ReturnType<typeof useMileageByDateLazyQuery>;
export type MileageByDateQueryResult = ApolloReactCommon.QueryResult<MileageByDateQuery, MileageByDateQueryVariables>;