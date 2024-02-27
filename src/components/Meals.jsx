import React from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';
const requestedConfig = {}
const Meals = () => {
    const { data: loadMeals, error, isLoading } = useHttp('http://localhost:3000/meals', requestedConfig, [])
    if (isLoading) return (<p className='center'>Loading...</p>)

    if (error) {
        return <Error title="Failed to Fetch Meal" message={error} />
    }
    return (
        <ul id='meals'>{
            loadMeals.map((meal) => {
                return <MealItem key={meal.id} meal={meal} />
            })
        }
        </ul>
    )
}

export default Meals