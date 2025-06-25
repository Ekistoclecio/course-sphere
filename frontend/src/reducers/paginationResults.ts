export type ResultsAction<T> =
  | { type: 'SET_ALL'; payload: T[] }
  | { type: 'APPEND'; payload: T[] }
  | { type: 'REMOVE'; id: number | string }
  | { type: 'UPDATE'; payload: T };

export function paginationResultsReducer<T extends { id: number | string }>(
  state: T[],
  action: ResultsAction<T>
): T[] {
  switch (action.type) {
    case 'SET_ALL':
      return action.payload;
    case 'APPEND':
      return [...state, ...action.payload];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.id);
    case 'UPDATE':
      return state.map((item) => (item.id === action.payload.id ? action.payload : item));
    default:
      return state;
  }
}
