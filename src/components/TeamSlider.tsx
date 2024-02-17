// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const MySlider = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         centerMode: true,
//         centerPadding: '60px', 
//         slidesToShow: 3, // You might need to adjust this depending on the size of your images
//         speed: 500,
//         focusOnSelect: true,
//         responsive: [
//           {
//             breakpoint: 768, 
//             settings: {
//               arrows: false,
//               centerMode: true,
//               centerPadding: '40px', // Adjust the padding for smaller screens
//               slidesToShow: 1
//             }
//           }
//         ]
//       };

//   return (
//     <Slider {...settings}>
    
//       <div className="slide">
//         <div className="card">
//          <img src="/img/rectangle-1267@2x.png" alt="" />
//         </div>
        
//       </div>
//       <div className="slide">
//         <div className="card">
//             <div className='flex justify-center items-center'>
//             <img className='' src="/img/rectangle-531@2x.png" alt="" />
//             </div>
    
//         </div>
        
//       </div>
//       <div className="slide">
//         <div className="card">
//          <img src="/img/rectangle-1256@2x.png" alt="" />
//         </div>
        
//       </div>
   
//     </Slider>
//   );
// };

// function SampleNextArrow(props:any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props:any) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// export default MySlider;
//   {/* <div className="tt"></div>
//     {singleEvent?.imageUrl?.length && (
//           <Slider {...settings}>
//             {singleEvent?.imageUrl.map((item: any) => (
//               <div className="w-full " style={{transform: 'rotate(20deg)'}}>
//               <img className="w-full h-[350px] fit-cover rounded-lg	 " src={item || ""} alt="text" />
//             </div>
//             ))}
//           </Slider>
//         )} */}