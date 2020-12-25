import gql from 'graphql-tag';
import FRAGMENT_TODO from '../fragments/todo';

/**
 * Update Todo
 */
const MUTATION_UPDATE_TODO = gql`
  mutation UpdateTodoMutation($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      ...TodoFragment
    }
  }
  ${FRAGMENT_TODO}
`;

// DEFAULT EXPORT
export default MUTATION_UPDATE_TODO;
