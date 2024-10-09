import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../Redux/Slices/eventSlice';
import BaseLayout from '../../Layouts/BaseLayout';
import { EventCard } from '../../Components/EventCard';

function EventList() {
    const dispatch = useDispatch();
    const { events } = useSelector(state => state?.events);

    async function loadEvents() {
        await dispatch(getAllEvents());
    }

    useEffect(() => {
        loadEvents();
    }, []);

    // Sort events by date (newest first)
    const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort in descending order (newest to oldest)
    });

    return (
        <BaseLayout>
            {
                sortedEvents.length === 0 ? 
                (
                    <div className="flex justify-center items-center h-96 ">
                        <h1 className="text-3xl text-center opacity-50">
                            No events listed!
                        </h1>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-10 mb-10 justify-center items-center pt-24">
                        {
                            sortedEvents.map(element => (
                                <div className="flex-shrink-0 w-80" key={element._id}>
                                    <EventCard data={element} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </BaseLayout>
    );
}

export default EventList;
