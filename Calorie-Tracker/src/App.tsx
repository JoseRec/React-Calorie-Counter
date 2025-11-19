import { useReducer, useEffect, useMemo } from "react"
import Form from "./Components/Form"
import ActivityList from "./Components/ActivityList"
import Aurora from "./Components/Aurora"
import { acitivityReducer, initialState } from "./Reducers/activity-reducer"
import CalorieTracker from "./Components/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(acitivityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestarApp = () => useMemo(() => state.activities.length, [state.activities])
  console.log(state)

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-indigo-950 to-slate-900">
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#1A1A2E", "#16213E", "#0F3460"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <header className="relative z-10 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto py-6 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Contador de <span className="text-lime-400">Calorías</span>
          </h1>
          <button
            onClick={() => dispatch({ type: "restart-app" })}
            disabled={!canRestarApp()}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md py-2.5 px-6 font-semibold text-white cursor-pointer rounded-xl text-sm transition-all duration-200 border border-white/10 hover:border-white/20 disabled:bg-white/5 disabled:text-white/30 disabled:cursor-not-allowed disabled:border-white/5">
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="relative z-10 flex justify-center items-center px-5 py-16">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/10">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="relative z-10 bg-linear-to-b from-transparent to-black/20 py-16">
        <div className="max-w-4xl mx-auto px-5">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="relative z-10 py-16 px-5 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </div>
  )
}

export default App
