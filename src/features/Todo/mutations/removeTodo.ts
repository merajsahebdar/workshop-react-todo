import gql from 'graphql-tag';

/**
 * Remove Todo
 */
const MUTATION_REMOVE_TODO = gql`
  mutation RemoveTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      id
    }
  }
`;

// DEFAULT EXPORT
export default MUTATION_REMOVE_TODO;
