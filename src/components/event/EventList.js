import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getEvents } from "./EventManager.js"

export const EventList = (props) => {
    const history = useHistory();
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
        <header>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
        </header>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="game__title">{event.game.title} by {event.game.maker}</div>
                        <div className="event__organizer">Hosted by {event.organizer.user.username}</div>
                        <div className="event__time">Set to take place at {event.time} on {event.date}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}