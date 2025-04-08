import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { generateUsers, User } from '../src/components/mockUsers'; // Đảm bảo file này tồn tại

interface State {
  users: User[];
  currentPage: number;
}

type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'DELETE_USER'; payload: number }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: State = {
  users: [],
  currentPage: 1,
};

const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    default:
      return state;
  }
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = generateUsers(100);
    dispatch({ type: 'SET_USERS', payload: data });
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
