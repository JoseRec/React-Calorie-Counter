import type { Activity } from "../Types/Index"

export type AcitivityActions = 
    { type: 'save-activity', payload: {newActivity : Activity}}|
    { type: 'edit-activity', payload: {id : Activity['id']}} | 
    { type: 'delete-activity',payload: {id: Activity['id']}} |
    { type: 'restart-app'} 

export type AcitivityState = {
    activities : Activity[],
    activeID: Activity['id']
}


const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : AcitivityState = {
    activities : localStorageActivities(),
    activeID : ''
}

export const acitivityReducer = (
    state :  AcitivityState = initialState,
    action: AcitivityActions
)  => {
    if(action.type === 'save-activity'){
        // este codigo maneja la logica para actualizar el state
        let updateActivitis : Activity[] = []
        if(state.activeID){ // Para eso esta propiedad
            // Quiere editar?
            updateActivitis = state.activities.map(activity => activity.id === state.activeID ? action.payload.newActivity : activity)
        }else{
            // O quiere agregar
            updateActivitis = [...state.activities, action.payload.newActivity]
        }

        return{
            ...state, 
            activities: updateActivitis,
            activeID : ''
        }
    }

    if(action.type === 'edit-activity'){
        return{
            ...state, 
            activeID: action.payload.id
        }
    }

    if(action.type === 'delete-activity'){
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app'){
        return{
           activities: [],
            activeID: ''
        }
    }

    return state
}