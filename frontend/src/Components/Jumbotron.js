import React from 'react';
import './../CSS/Jumbotron.css'; // Import CSS for styling
 // Import CSS file for styling

 const Jumbotron = () => {
   return (
     <div className="jumbotron-container">
       <div className="dark-heading">
        
       </div>
       <div className="jumbotron" style={{ backgroundImage: `url('https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1368100647/image_1368100647.jpg?io=getty-c-w1280')` }}>
         <div className="overlay"></div>
         <div className="container">
         <h2>Welcome to our website</h2>
         </div>
       </div>
     </div>
   );
 };
 
 export default Jumbotron;
 