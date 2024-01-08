import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEdititng] = useState(false);

    function handleEditClick() {
        setIsEdititng((isEditing) => !isEditing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let btnCaption = 'Edit';

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" required defaultValue={playerName} onChange={handleChange}/>;
        btnCaption = 'Save';
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}               
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEditClick}>{btnCaption}</button>
            </span>
        </li>
        
    )
}