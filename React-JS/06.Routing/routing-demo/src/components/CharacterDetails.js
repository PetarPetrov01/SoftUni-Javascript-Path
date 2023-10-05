import { useState } from "react";
import { useParams, use } from "react-router-dom";

export const CharacterDetails = () => {

    const { id } = useParams();
    const [character, setUser] = useState([]);

    fetch(`https://swapi.dev/api/people/${id}`)
        .then(res => res.json())
        .then(data => {
            setUser(data);
        })
        .catch(err => alert(err));

    return (
        <div>
            <h1>{character.name}</h1>
            Details
        </div>
    );
};