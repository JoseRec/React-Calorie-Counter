import { useMemo } from "react"
import type { Activity } from "../Types/Index"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
    // Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((totalCalorias, item) => item.category === 1
        ? totalCalorias + item.calories : totalCalorias, 0), [activities])
    const caloriesBurned = useMemo(() => activities.reduce((totalCalorias, item) => item.category === 2
        ? totalCalorias + item.calories : totalCalorias, 0), [activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-5xl font-black text-white text-center mb-12 tracking-tight">
                Resumen de <span className="text-lime-400">Calorías</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
