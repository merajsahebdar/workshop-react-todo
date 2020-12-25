import gql from 'graphql-tag';

/**
 * Todo Fragment
 */
const FRAGMENT_TODO = gql`
  fragment TodoFragment on Todo {
    id
    title
    status
    updatedAt
  }
`;

// DEFAULT EXPORT
export default FRAGMENT_TODO;
