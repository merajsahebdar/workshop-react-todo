import {useQuery} from '@apollo/react-hooks';
import {Fragment} from 'react';
import styled from 'styled-components';
import QUERY_TODOS from '../../queries/todos';
import type {TodosQuery} from '../../queries/__generated__/TodosQuery';
import EditableTodo from './EditableTodo';

/**
 * Card
 */
const Card = styled.div`
  width: 420px;
  max-width: calc(100% - 32px);
  margin: 16px;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(150, 150, 150, 0.125);
  border-radius: 8px;
`;

/**
 * Total Count Typography
 */
const TotalCountTypography = styled.h5`
  margin: 0;
  padding: 0 8px;
  color: #bdd5ea;
  text-transform: uppercase;
  text-align: right;
`;

/**
 * Todos
 *
 * @returns {React.ReactElement}
 */
function Todos(): React.ReactElement {
  // Query: Todos
  const {loading, data} = useQuery<TodosQuery>(QUERY_TODOS);

  // Render
  return loading ? (
    <Fragment>Loading...</Fragment>
  ) : (
    <Fragment>
      {data && (
        <Card>
          <EditableTodo />
          {data.todos.map(todo => (
            <EditableTodo key={`todos_id:${todo.id}`} todo={todo} />
          ))}
          <TotalCountTypography>Total: {data.todosCount}</TotalCountTypography>
        </Card>
      )}
    </Fragment>
  );
}

// DEFAULT EXPORT
export default Todos;
