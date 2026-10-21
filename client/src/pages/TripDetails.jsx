import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import ActivityBtn from '../components/ActivityBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css'

const TripDetails = ({data}) => {

    const {id} = useParams();
    const [trip, setTrip] = useState(null)
    const [activities, setActivities] = useState([])
    const [destinations, setDestinations] = useState([])

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))[0];
        setTrip(result || null);
    }, [data, id]);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/activities/' + id)
            const data = await response.json()
            setActivities(data)
        }

        const fetchDestinations = async () => {
            const response = await fetch('/api/trips-destinations/destinations/' + id)
            const data = await response.json()
            setDestinations(data)
        }

        fetchActivities()
        fetchDestinations()
    }, [id]);

    if (!trip) {
        return <h3 className="noResults">{'Loading trip...'}</h3>
    }

    return (
        <div className="flex-container">
            <div className="left-side">
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
                <p>{'🗓 ' + trip.start_date.slice(0, 10) + ' to ' + trip.end_date.slice(0, 10) + ' (' + trip.num_days + ' days)'}</p>
                <p>{'💰 Budget: ' + trip.total_cost}</p>
                <h3>Destinations</h3>
                <div>
                    {
                        destinations && destinations.length > 0 ?
                        destinations.map((destination) =>
                            <DestinationBtn key={destination.id} id={destination.id} destination={destination.destination} />
                        ) : <p>{'No destinations added yet 😞'}</p>
                    }
                </div>
                <Link to="/destinations"><button className="addDestinationBtn">+ Add Destination</button></Link>
            </div>

            <div className="right-side" style={{ backgroundImage: `url(${trip.img_url})` }}>
                <h3>Activities</h3>
                <div>
                    {
                        activities && activities.length > 0 ?
                        activities.map((activity) =>
                            <ActivityBtn key={activity.id} id={activity.id} activity={activity.activity} num_votes={activity.num_votes} />
                        ) : <p>{'No activities yet 😞'}</p>
                    }
                </div>
                <Link to={'/activity/create/' + id}><button className="addActivityBtn">+ Add Activity</button></Link>
            </div>
        </div>
    )
}

export default TripDetails
