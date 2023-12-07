
import DetailInstrument from "../Components/DetailInstrument/DetailInstrument";
import { useParams } from 'react-router-dom'

const Detail = (props) => {
    const { id } = useParams();
    return (
        <DetailInstrument id={id}/>
    )
}

export default Detail