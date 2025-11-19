import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "UUID"
import type { FormEvent, ChangeEvent, Dispatch } from "react"
import { categories } from "../Data/Categories"
import type { Activity } from "../Types/Index"
import type { AcitivityActions, AcitivityState } from "../Reducers/activity-reducer"

type formProps = {
    dispatch: Dispatch<AcitivityActions>
    state: AcitivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch, state }: formProps) {
    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(() => {
        if (state.activeID) {
            setActivity(state.activities.filter(stateActivity => stateActivity.id === state.activeID)[0])
        }
    }, [state.activeID])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: "save-activity", payload: { newActivity: activity } })
        setActivity({ ...initialState, id: uuidv4() })
    }

    return (
        <form className="space-y-6" onSubmit={handleSumbit}>
            <div className="space-y-2">
                <label htmlFor="Category" className="font-semibold text-white text-sm uppercase tracking-wide">Categoría</label>
                <select
                    className="border border-white/20 bg-white/5 backdrop-blur-md p-3.5 rounded-xl w-full text-white focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all cursor-pointer"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                            className="bg-slate-900 text-white">
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="font-semibold text-white text-sm uppercase tracking-wide">Actividad</label>
                <input
                    id="name"
                    type="text"
                    className="border border-white/20 bg-white/5 backdrop-blur-md p-3.5 rounded-xl w-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all"
                    placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Pesa, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="Calories" className="font-semibold text-white text-sm uppercase tracking-wide">Calorías</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-white/20 bg-white/5 backdrop-blur-md p-3.5 rounded-xl w-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all"
                    placeholder="Calorías. Ej. 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                disabled={!isValidActivity()}
                className="bg-linear-to-b from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 p-4 w-full font-bold uppercase text-white cursor-pointer rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none mt-8"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} />
        </form>
    )
}
