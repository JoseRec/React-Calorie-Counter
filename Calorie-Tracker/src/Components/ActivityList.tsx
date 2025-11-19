import type { Activity } from "../Types/Index"
import type { Dispatch } from "react"
import { categories } from "../Data/Categories"
import { useMemo } from "react"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import type { AcitivityActions } from "../Reducers/activity-reducer"

type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<AcitivityActions>
}
export default function ActivityList({ activities, dispatch }: ActivityListProps) {
    const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities])

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
    return (
        <>
            <h2 className="text-5xl font-black text-white text-center mb-12 tracking-tight">
                Comida y <span className="text-lime-400">Actividades</span>
            </h2>

            {isEmptyActivities
                ? <div className="text-center py-16">
                    <p className="text-white/40 text-lg">No hay actividades aún...</p>
                </div>
                : activities.map(activity => (
                    <div
                        key={activity.id}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 mt-5 rounded-2xl p-6 shadow-xl flex justify-between items-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 group">
                        <div className="space-y-3">
                            <p className={`text-xs font-bold uppercase px-4 py-2 rounded-full inline-block ${activity.category === 1 ? 'bg-lime-500 text-black' : 'bg-orange-500 text-white'}`}>
                                {categoryName(+activity.category)}
                            </p>

                            <p className="text-2xl font-bold text-white">{activity.name}</p>

                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-lime-400">
                                    {activity.calories}
                                </span>
                                <span className="text-white/60 text-sm font-medium uppercase tracking-wide">calorías</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => dispatch({ type: "edit-activity", payload: { id: activity.id } })}
                                className="cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-all duration-200 group-hover:scale-110">
                                <PencilSquareIcon className="h-7 w-7 text-white/70 hover:text-white transition-colors" />
                            </button>

                            <button
                                onClick={() => dispatch({ type: "delete-activity", payload: { id: activity.id } })}
                                className="cursor-pointer p-2 rounded-lg hover:bg-red-500/20 transition-all duration-200 group-hover:scale-110">
                                <XCircleIcon className="h-7 w-7 text-red-500/70 hover:text-red-500 transition-colors" />
                            </button>
                        </div>
                    </div>
                ))}
        </>
    )
}
