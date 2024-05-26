import { createContext,useReducer } from "react";

export const CategoriesContext = createContext()

export function categoriesReducer(state,action)
{
    switch(action.type)
    {
        case "UPDATE_CATEGORY":
            return{
                categories: action.payload
            };

        case "ADD_CATEGORY":
            return{
                categories: action.payload
            };
        case "SET_CATEGORIES":
            return{
                categories:action.payload
            };
        case "DELETE_CATEGORY":
            return{
                categories: state.categories.filter(w => w._id !== action.payload._id) 
            };
        default:
            return state;

    }
}


export const CategoriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoriesReducer, { 
        categories: null
    })
    
    return (
        <CategoriesContext.Provider value={{...state, dispatch }}>
        { children }
        </CategoriesContext.Provider>
    )
  }
