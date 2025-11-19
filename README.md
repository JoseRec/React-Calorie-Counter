# React-Calorie-Counter 
**Aplicación construida en React y TypeScript**

React-Calorie-Counter es una app web para registrar, gestionar y visualizar el consumo y gasto calórico diario. Está diseñada con una arquitectura moderna usando `useReducer`, Hooks, persistencia local y una interfaz visual.

## Características

- Registro de comidas y actividades físicas con información de categoría, nombre y calorías.  
- Edición y eliminación de actividades.  
- Cálculo automático de calorías consumidas, quemadas y netas.  
- Botón para reiniciar toda la aplicación.
- Persistencia automática de actividades usando `localStorage`.  
- Interfaz fluida y moderna con fondo animado tipo Aurora, transparencias (glassmorphism) y transiciones suaves.

## Tecnologías
- React  
- TypeScript  
- `useReducer` para la gestión del estado global  
- `useEffect` y `useMemo` para optimización y sincronización  
- `localStorage` para persistencia de datos  
- Estilos modernos con fondo Aurora

## Componentes

- **App**: punto de entrada, conecta el reducer, sincroniza con localStorage y envuelve todo con el fondo animado.  
- **Form**: formulario para añadir o editar una actividad. Valida nombre y calorías.  
- **ActivityList**: muestra la lista de actividades con botones para editar y eliminar.  
- **CalorieTracker**: resumen calórico con tres tarjetas para consumidas, quemadas y netas.  
- **CalorieDisplay**: componente reutilizable para mostrar números y etiquetas.  
- **Aurora**: componente visual que genera el fondo animado con degradados.
