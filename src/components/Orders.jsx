import React, { useContext } from 'react';
import { AuthContext } from '../contextProvider/AuthProvider';

const Orders = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className='m-5'>
            <h3 className='items-center'> {user? user.name : ''}, your orders is here</h3>
            <p>{user.email}</p>
        </div>
    );
};

export default Orders;