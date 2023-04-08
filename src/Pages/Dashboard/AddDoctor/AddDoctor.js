import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    // image hosting key 
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    // loading data using react query 
    const { data: specialities, isLoading, error } = useQuery({
        queryKey: ['speciality'],
        queryFn: async () => fetch('https://doctors-portal-server-opal-ten.vercel.app/appointmentSpeciality')
            .then(res => res.json())
    });


    const handleAddDoctor = data => {
        // console.log(data.img[0]);
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        image: imgData.data.url
                    }

                    // save doctor information to the database 
                    fetch(`https://doctors-portal-server-opal-ten.vercel.app/doctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success('doctor added successfully');
                            navigate('/dashboard/managedoctors')
                        })
                }
            })
    }

    // Bookings.map er error thekaite amra eita use kori 

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='w-96 p-7'>
            <h2 className="text-4xl">Add a doctor</h2>


            <form onSubmit={handleSubmit(handleAddDoctor)}>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name", { required: 'name is required' })} className="input input-bordered w-full max-w-xs" />
                    {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email", { required: "email is required" })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select
                        {...register('speciality')}
                        className="select input-bordered w-full max-w-xs">
                        {/* showing each speciality  */}
                        {
                            specialities.map(speciality => <option
                                key={speciality._id}
                            >{speciality.name}</option>)
                        }
                    </select>

                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register("img", { required: 'Photo is required is required' })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
                </div>


                <input type="submit" className='btn btn-accent w-full mt-4' value='Add Doctor' />
            </form>
        </div>
    );
};

export default AddDoctor;