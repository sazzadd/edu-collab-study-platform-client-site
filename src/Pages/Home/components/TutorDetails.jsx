import { useParams } from "react-router-dom";


const TutorDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>TutorDetails</h1>
        </div>
    );
};

export default TutorDetails;