import React, { useState } from 'react'
import MealItem from './MealItem';

const Meals = () => {
    const [loadMeals, setLoadMeals] = useState([]);
    useState(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');
            if (!response.ok) {
                //
            }
            const meals = await response.json();
            setLoadMeals(meals);
        }
        fetchMeals();
    }, [])
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