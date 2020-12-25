import gql from 'graphql-tag';
import FRAGMENT_TODO from '../fragments/todo';

/**
 * Todos Query
 */
const QUERY_TODOS = gql`
  query TodosQuery {
    todos {
      id
      ...TodoFragment
    }
    todosCount
  }
  ${FRAGMENT_TODO}
`;

// DEFAULT EXPORT
export default QUERY_TODOS;
