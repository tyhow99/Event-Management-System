import Table from "../components/Table";
import SearchBar from "../components/Searchbar";
import "./EventSchedule.css"


function EventSchedule()
{
    return(
        <div className="event-container">
            <div className="title-box">
                <h1>Event Schedule</h1>
            </div>
            <div className="search-bat">
                <SearchBar />
            </div>
            <div className="grid-container">
                <button onClick="">Edit</button>
                <Table />
            </div>
        </div>
    );
};

export default EventSchedule;