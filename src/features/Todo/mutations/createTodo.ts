import gql from 'graphql-tag';
import FRAGMENT_TODO from '../fragments/todo';

/**
 * Create Todo
 */
const MUTATION_CREATE_TODO = gql`
  mutation CreateTodoMutation($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      ...TodoFragment
    }
  }
  ${FRAGMENT_TODO}
`;

// DEFAULT EXPORT
export default MUTATION_CREATE_TODO;
