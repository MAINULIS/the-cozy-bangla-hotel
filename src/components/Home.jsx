import React from 'react';
import { Image } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom';
import HotelBook from './HotelBook';
import { FaArrowDownLong } from "react-icons/fa6";


const Home = () => {
    const hotelData = useLoaderData();
    console.log(hotelData)    
     
    var background = { backgroundSize: 'cover' };
    var textStyle = {
        position: 'absolute',
        top: '30%',
        left: '30%'
    };

    return (
        <div style={{ width: 'auto' }} >
             <Image className='h-25 w-100'
                style={background} 
                src="../src/assets/hero.jpg">
            </Image>
            <div  className='text-secondary' style={textStyle}>
                <h3>A Cozy Bangla luxury Housing 
                </h3>
                <h2 className='ms-5 text-info'>  Let's Book <FaArrowDownLong /> </h2>
            </div>
           <div  className='row'> 
           {
                hotelData.map(hotel => <HotelBook
                key={hotel.id}
                hotel= {hotel}
                ></HotelBook>)
            }
           </div>
        </div>
    );
};

export default Home;