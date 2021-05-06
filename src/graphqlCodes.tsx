import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthorizeOauthInput = {
  adapterName: OauthAdapterName;
  code: Scalars['String'];
};

export type CheckEmailAvailabilityInput = {
  address: Scalars['String'];
};

export type Email = {
  __typename?: 'Email';
  id: Scalars['String'];
  address: Scalars['String'];
  isPrimary: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  checkEmailAvailability: Scalars['Boolean'];
  verifyEmail: Scalars['Boolean'];
  refreshToken: Scalars['String'];
  signIn: Scalars['String'];
  signUp: Scalars['String'];
  requestOAuth: Scalars['String'];
  authorizeOAuth: Scalars['String'];
};

export type MutationCheckEmailAvailabilityArgs = {
  input: CheckEmailAvailabilityInput;
};

export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MutationSignInArgs = {
  input: SignInInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationRequestOAuthArgs = {
  input: RequestOauthInput;
};

export type MutationAuthorizeOAuthArgs = {
  input: AuthorizeOauthInput;
};

export enum OauthAdapterName {
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Google = 'GOOGLE',
}

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  forename?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  isLoggedIn: Scalars['Boolean'];
  loggedInUserId?: Maybe<Scalars['String']>;
  user: User;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type RequestOauthInput = {
  adapterName: OauthAdapterName;
};

export type SignInEmailInput = {
  address: Scalars['String'];
};

export type SignInInput = {
  email: SignInEmailInput;
  password: Scalars['String'];
};

export type SignUpEmailInput = {
  address: Scalars['String'];
};

export type SignUpInput = {
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  email: SignUpEmailInput;
  profile: SignUpProfileInput;
};

export type SignUpProfileInput = {
  forename: Scalars['String'];
  surname: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  emails: Array<Email>;
  isActivated: Scalars['Boolean'];
  isBlocked: Scalars['Boolean'];
  profile: Profile;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type VerifyEmailInput = {
  id: Scalars['String'];
  address: Scalars['String'];
  expires: Scalars['Float'];
  signature: Scalars['String'];
};

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'signIn'>;

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & Pick<User, 'id'>;
};

export const SignInDocument = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input)
  }
`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const UserDocument = gql`
  query user($userId: String!) {
    user(id: $userId) {
      id
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;
