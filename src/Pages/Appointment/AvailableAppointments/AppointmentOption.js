import React from 'react';

const AppointmentOption = ({ option, setTreatment }) => {
    const { name, slots, price } = option;
    return (
        <div className="card  bg-base-100 shadow-xl my-17">
            <div className="card-body text-center ">
                <h2 className="text-secondary  font-bold text-xl">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try another day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} Available</p>
                <p><small>Price - ${price}</small></p>
                <div className="card-actions justify-center">
                    <label

                        onClick={() => setTreatment(option)}
                        htmlFor="booking-modal" className="btn btn-primary text-white">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;