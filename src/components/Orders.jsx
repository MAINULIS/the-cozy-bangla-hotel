import React, { useContext } from 'react';
import { AuthContext } from '../contextProvider/AuthProvider';

const Orders = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <h3>This is {user? user.name : ''} orders</h3>
        </div>
    );
};

export default Orders;