import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../../Redux/Slices/eventSlice';
import BaseLayout from '../../Layouts/BaseLayout';
import { EventCard } from '../../Components/EventCard';

function EventList() {
    const dispatch = useDispatch();
    const { events } = useSelector(state => state?.events);
    const [selectedYear, setSelectedYear] = useState(''); // State to hold selected year

    async function loadEvents() {
        await dispatch(getAllEvents());
    }

    function separateEvents() {
        const currentDate = new Date();
        const upcomingEvents = [];
        const pastEvents = [];

        events.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate >= currentDate) {
                upcomingEvents.push(event);
            } else {
                pastEvents.push(event);
            }
        });

        return { upcomingEvents, pastEvents };
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

    // Separate events into upcoming and past
    const { upcomingEvents, pastEvents } = separateEvents();

    // Generate years from 2010 to current year - 1
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2010 }, (_, i) => 2010 + i);

    // Filter past events by selected year
    const filteredPastEvents = selectedYear 
        ? pastEvents.filter(event => new Date(event.date).getFullYear() === parseInt(selectedYear)) 
        : pastEvents;

    return (
        <BaseLayout>
            {
                sortedEvents.length === 0 ? 
                (
                    <div className="flex justify-center items-center h-96">
                        <h1 className="text-3xl text-center opacity-50">
                            No events listed!
                        </h1>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-4 mb-10 justify-items-center max-w-screen-sm mx-auto pt-24">
                        {
                            upcomingEvents.map(element => (
                                <div className="flex-shrink-0 w-80 m-0 p-0" key={element._id}>
                                    <EventCard data={element} isPast={false} />
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {/* Dropdown for filtering past events by year */}
            {pastEvents.length > 0 && (
                <div className="mt-10 mb-10">
                    <div >
                        <h2 className=" text-center mb-2">Completed Events</h2>
                        <div className="flex justify-center mb-4">
                            <select 
                                value={selectedYear} 
                                onChange={(e) => setSelectedYear(e.target.value)} 
                                className="border border-gray-300 rounded p-2"
                            >
                                <option value="">Select Year</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-4 justify-items-center max-w-screen-sm mx-auto pt-4">
                        {
                            filteredPastEvents.map(element => (
                                <div className="flex-shrink-0 w-80 m-0 p-0" key={element._id}>
                                    <EventCard data={element} isPast={true} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
        </BaseLayout>
    );
}

export default EventList;
