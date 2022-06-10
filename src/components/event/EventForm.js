import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createEvent } from './EventManager.js'
import { getGames } from "../game/GameManager.js"

export const EventForm = () => {
    const history = useHistory();
    const [games, setGames] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        description: 0,
        date: "",
        time: ""
    });

    useEffect(() => {
        getGames().then((data) => setGames(data))
    }, [])

    const changeEventState = (domEvent) => {
        let newEvent = {...currentEvent}
        let newValue = domEvent.target.value
        newEvent[domEvent.target.name] = newValue
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="gameId" required autoFocus className="form-control"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                        <option value="0">Select Game</option>
                        {
                            games.map((game) => (
                                <option key={game.id} value={game.id}>
                                    {game.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" placeholder="Enter Description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" placeholder="YYYY-MM-DD" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">time: </label>
                    <input type="text" name="time" placeholder="HH:MM:SS" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}