import {useMutation} from '@apollo/react-hooks';
import findIndex from 'lodash/findIndex';
import {useCallback, useState} from 'react';
import styled from 'styled-components';
import {ReactComponent as TrashIcon} from '../../../../images/icons/trash.svg';
import {ReactComponent as CheckIcon} from '../../../../images/icons/check-circle.svg';
import {StatusOfTodo} from '../../../../app/__generated__/Schema';
import {TodoFragment} from '../../fragments/__generated__/TodoFragment';
import MUTATION_CREATE_TODO from '../../mutations/createTodo';
import MUTATION_UPDATE_TODO from '../../mutations/updateTodo';
import {
  CreateTodoMutation,
  CreateTodoMutationVariables,
} from '../../mutations/__generated__/CreateTodoMutation';
import {UpdateTodoMutationVariables} from '../../mutations/__generated__/UpdateTodoMutation';
import QUERY_TODOS from '../../queries/todos';
import {TodosQuery} from '../../queries/__generated__/TodosQuery';
import {
  RemoveTodoMutation,
  RemoveTodoMutationVariables,
} from '../../mutations/__generated__/RemoveTodoMutation';
import MUTATION_REMOVE_TODO from '../../mutations/removeTodo';
import invariant from 'tiny-invariant';

// Editable Todo Props
interface EditableTodoProps {
  todo?: TodoFragment;
}

/**
 * Wrap
 */
const Wrap = styled.div`
  position: relative;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * Title
 */
const Title = styled.div`
  flex-grow: 1;
`;

/**
 * Input
 */
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #202020;
  margin: 0;
  padding: 8px;
  outline: none;
  border: 1px solid rgba(150, 150, 150, 0.25);
  border-radius: 4px;
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  line-height: 1.4;
  transition-property: border-color, box-shadow;
  transition-duration: 300ms;

  &:focus {
    border-color: #495867;
    box-shadow: 0 0 0 3px #bdd5ea;
  }
`;

/**
 * Title Typography
 */
const TitleTypography = styled.div`
  padding: 8px;
  border: 1px dashed rgba(150, 150, 150, 0.25);
  border-radius: 4px;
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  line-height: 1.4;
  user-select: none;
`;

/**
 * Actions
 */
const Actions = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  margin: 0 -4px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * Action Button
 */
const ActionButton = styled.button`
  cursor: pointer;
  padding: 4px;
  margin: 0 4px;
  width: 24px;
  height: 24px;
  outline: none;
  border: none;
  border-radius: 1000px;
  background-color: #ffffff;
  transition-property: background-color, color;
  transition-duration: 300ms;
`;

/**
 * Remove Button
 */
const RemoveButton = styled(ActionButton)`
  color: #fe5f55;

  &:hover,
  &:focus {
    background-color: #fe5f55;
    color: #ffffff;
  }
`;

/**
 * Status Button - Idle
 */
const StatusButtonIdle = styled(ActionButton)`
  color: #909090;

  &:hover,
  &:focus {
    color: #202020;
  }
`;

/**
 * Status Button - Done
 */
const StatusButtonDone = styled(ActionButton)`
  color: #495867;

  &:hover,
  &:focus {
    color: #909090;
  }

  & > svg > * {
    stroke-width: 2;
  }
`;

/**
 * Editable Todo
 */
function EditableTodo(props: EditableTodoProps): React.ReactElement {
  // State: Mode
  const [mode, setMode] = useState<'edit' | 'view'>(props.todo ? 'view' : 'edit');

  // State: Todo
  const [todo, setTodo] = useState(props.todo ?? {title: '', status: StatusOfTodo.IDLE});

  // Mutation: Save
  const [save, {loading: updating}] = useMutation<
    CreateTodoMutation,
    CreateTodoMutationVariables | UpdateTodoMutationVariables
  >(props.todo ? MUTATION_UPDATE_TODO : MUTATION_CREATE_TODO, {
    update(proxy, {data}) {
      if (!props.todo && data?.createTodo) {
        const latest = proxy.readQuery<TodosQuery>({query: QUERY_TODOS});
        const todos = latest ? latest.todos : [];
        const todosCount = latest ? latest.todosCount : 0;

        proxy.writeQuery<TodosQuery>({
          query: QUERY_TODOS,
          data: {
            todos: [data.createTodo, ...todos],
            todosCount: todosCount + 1,
          },
        });
      }
    },
    onCompleted() {
      if (props.todo) {
        setMode('view');
      } else {
        setTodo({
          title: '',
          status: StatusOfTodo.IDLE,
        });
      }
    },
  });

  /**
   * Handle Save
   */
  const handleSave = useCallback(async () => {
    await save({
      variables: {
        input: {
          ...(props.todo ? {id: props.todo.id} : {}),
          title: todo.title,
          status: todo.status,
        },
      },
    });
  }, [props.todo, todo, save]);

  /**
   * Toggle Status
   */
  const toggleStatus = useCallback(async () => {
    invariant(props.todo, 'No item to remove!');

    const nextStatus = todo.status === StatusOfTodo.IDLE ? StatusOfTodo.DONE : StatusOfTodo.IDLE;
    setTodo(prevState => ({...prevState, status: nextStatus}));
    await save({
      variables: {
        input: {
          id: props.todo.id,
          status: nextStatus,
        },
      },
    });
  }, [props.todo, todo, save]);

  // Mutation: Remove
  const [remove, {loading: removing}] = useMutation<
    RemoveTodoMutation,
    RemoveTodoMutationVariables
  >(MUTATION_REMOVE_TODO, {
    update(proxy, {data}) {
      const latest = proxy.readQuery<TodosQuery>({query: QUERY_TODOS});
      if (latest && data?.removeTodo) {
        const removedIndex = findIndex(latest.todos, t => t.id === data.removeTodo.id);
        if (removedIndex >= 0) {
          latest.todos.splice(removedIndex, 1);
          proxy.writeQuery({
            query: QUERY_TODOS,
            data: {
              todos: [...latest.todos],
              todosCount: latest.todosCount - 1,
            },
          });
        }
      }
    },
  });

  /**
   * Handle Remove
   */
  const handleRemove = useCallback(async () => {
    invariant(props.todo, 'No item to remove!');

    await remove({
      variables: {
        input: {
          id: props.todo.id,
        },
      },
    });
  }, [props.todo, remove]);

  /**
   * Handle Title Change
   *
   * @param {React.ChangeEvent} event
   */
  const handleTitleChange = useCallback(({target}: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(prevState => ({...prevState, title: target.value}));
  }, []);

  /**
   * Handle Title Double Click
   *
   * @param {React.MouseEvent} event
   */
  const handleTitleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setMode('edit');
  }, []);

  /**
   * Handle Title Key Press
   */
  const handleTitleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSave();
      }
    },
    [handleSave]
  );

  /**
   * Handle Cancel
   */
  const handleCancel = useCallback(() => {
    if (props.todo) {
      setMode('view');
    }
  }, [props.todo]);

  // Render
  return (
    <Wrap>
      <Title>
        {mode === 'edit' ? (
          <Input
            disabled={updating || removing}
            autoFocus
            autoComplete="off"
            placeholder="Write down the title..."
            value={todo.title}
            onKeyPress={handleTitleKeyPress}
            onChange={handleTitleChange}
            onBlur={handleCancel}
          />
        ) : (
          <TitleTypography onDoubleClick={handleTitleDoubleClick}>{todo.title}</TitleTypography>
        )}
      </Title>
      {props.todo && (
        <Actions>
          {todo.status === StatusOfTodo.IDLE ? (
            <StatusButtonIdle disabled={updating || removing} onClick={toggleStatus}>
              <CheckIcon />
            </StatusButtonIdle>
          ) : (
            <StatusButtonDone disabled={updating || removing} onClick={toggleStatus}>
              <CheckIcon />
            </StatusButtonDone>
          )}
          <RemoveButton disabled={removing} onClick={handleRemove}>
            <TrashIcon />
          </RemoveButton>
        </Actions>
      )}
    </Wrap>
  );
}

// DEFAULT EXPORT
export default EditableTodo;
