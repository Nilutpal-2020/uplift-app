import React from 'react';

const habit = (props) => {
    const idForEdit = "inputEdit" + Math.floor(Math.random() * 1000);

    // let checkDate = new Date(Object.keys(props.habit.report[props.habit.report.length - 1])).getDate() === new Date().getDate();
    // console.log(checkDate);
    let checkComplete = Object.values(props.habit.report[props.habit.report.length - 1])[0]
    // console.log(checkComplete);
    return (
        <div>
            <div className="input-group justify-content-center mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input 
                            type="checkbox" 
                            style={{cursor: 'pointer'}}
                            defaultChecked={checkComplete}
                            onClick={() => props.checkComplete(props.habit.id)}
                            />
                    </div>
                </div>
                {/* { checkDate && checkComplete ? } */}
                <input 
                    id={idForEdit}
                    type="text" 
                    className="from-control p-2 pl-3" 
                    value={props.habit.name} 
                    aria-describedby="button-addon"
                    style={{width: '50%',
                            outline: 'none',
                            border: '1px solid #ccc',
                            textDecoration: [checkComplete ? 'line-through' : 'None']}} 
                    onChange={props.onEdit}
                    onBlur={props.updateEdited}
                    maxLength="30"
                    disabled={checkComplete}
                    />
                <div className="input-group-append">
                    <label className="input-group-text" htmlFor={idForEdit}>EDIT</label>
                </div>
                <div className="input-group-append">
                    <button 
                        className="btn btn-outline-danger" 
                        type="button" 
                        id="button-addon"
                        onClick={() => {props.deleteHabit(props.habit.id)}}
                        >DELETE</button>
                </div>
            </div>
        </div>
    );
}

export default habit;