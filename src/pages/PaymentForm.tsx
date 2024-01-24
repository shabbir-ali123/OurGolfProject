import React, { useEffect, useState } from "react";
import ChampionShipName from "../components/ChampionShipName";
import { fetchEvents } from "../utils/fetchEvents";
interface PaymentFormProps {
  onSubmit: (values: PaymentFormValues) => void;
}

export interface PaymentFormValues {
  joiningFee: number;
  accountHolderName: string;
  paypalId: string;
  accountNumber: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = () => {
  const [events, setEvents] = useState<any>([]); 
  
  const eventID = Number(localStorage.getItem('selectedEventId'));

useEffect(() => {
  const getEvents = async () => {
    try {
      await fetchEvents(null, null, setEvents); 
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  getEvents();
}, []);
const paymentDetails = events.find((item: any) => item.id === eventID);
console.log(paymentDetails, 'pd')
  return (
    <div className="">
      <ChampionShipName />
      <div className="p-4 mx-auto my-6 bg-opacity-100 border rounded-md max-w-7xl bg-gradient-to-b from-teal-50 to-teal-100 ">
        <div>
          <div className="flex items-center">
            <img src="/img/golfplyr.png" alt="image" className="w-10 h-16" />
            <h2 className="text-2xl font-semibold text-blue-800 font-poppins-semibold">
              instructions
            </h2>
          </div>
          <div>
            <ul>
              <li className="flex items-center gap-4 py-1 text-lg text-gray-700 font-poppins-regular">
                <span>
                  <svg
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1257 3.06904C22.0889 3.06904 23.9716 3.84888 25.3597 5.23702C26.7479 6.62516 27.5277 8.50788 27.5277 10.471C27.5277 12.4341 26.7479 14.3168 25.3597 15.705C23.9716 17.0931 22.0889 17.873 20.1257 17.873C19.9227 17.873 19.7279 17.7923 19.5843 17.6487C19.4407 17.5051 19.36 17.3103 19.36 17.1072C19.36 16.9042 19.4407 16.7094 19.5843 16.5658C19.7279 16.4222 19.9227 16.3415 20.1257 16.3415C21.6827 16.3415 23.1759 15.723 24.2768 14.6221C25.3778 13.5211 25.9963 12.028 25.9963 10.471C25.9963 8.91404 25.3778 7.42085 24.2768 6.31991C23.1759 5.21898 21.6827 4.60048 20.1257 4.60048C19.9227 4.60048 19.7279 4.5198 19.5843 4.3762C19.4407 4.2326 19.36 4.03784 19.36 3.83476C19.36 3.63167 19.4407 3.43691 19.5843 3.29331C19.7279 3.14971 19.9227 3.06904 20.1257 3.06904ZM14.2552 20.6806C14.2559 20.0164 14.0562 19.3675 13.6822 18.8186C14.2051 18.7051 14.6927 18.4668 15.1036 18.124C15.5145 17.7813 15.8363 17.3443 16.0418 16.8502C16.2473 16.3562 16.3302 15.8198 16.2836 15.2868C16.2369 14.7538 16.0621 14.24 15.7739 13.7891H20.1257C21.0058 13.7891 21.8497 13.4395 22.472 12.8173C23.0943 12.195 23.4439 11.351 23.4439 10.471C23.4439 9.59098 23.0943 8.747 22.472 8.12473C21.8497 7.50246 21.0058 7.15288 20.1257 7.15288L9.0228 7.15288L10.567 6.1919C11.3286 5.74969 11.8833 5.02306 12.1091 4.17187C12.3349 3.32068 12.2133 2.41465 11.7711 1.65309C11.3289 0.891534 10.6023 0.336837 9.75107 0.111025C8.89988 -0.114786 7.99385 0.00678507 7.23229 0.448995L0.85129 4.19082C0.681519 4.29568 0.559393 4.46269 0.510916 4.65626C0.46244 4.84983 0.491446 5.05468 0.591753 5.22718C0.692062 5.39969 0.855751 5.52622 1.04796 5.57983C1.24017 5.63345 1.44572 5.60991 1.62084 5.51424L8.00184 1.77624C8.20505 1.65893 8.42937 1.58279 8.662 1.55217C8.89464 1.52154 9.13102 1.53704 9.35767 1.59778C9.81539 1.72044 10.2056 2.0199 10.4426 2.4303C10.6795 2.84069 10.7437 3.3284 10.621 3.78612C10.5603 4.01277 10.4555 4.22523 10.3127 4.41138C10.1698 4.59752 9.99173 4.75372 9.78852 4.87103C9.78089 4.87456 9.77362 4.87883 9.76683 4.88379L5.93822 7.26774C5.7966 7.35551 5.68747 7.48708 5.62739 7.64249C5.56731 7.79789 5.55955 7.96866 5.60531 8.12887C5.65106 8.28908 5.74783 8.43 5.88092 8.53024C6.01401 8.63048 6.17616 8.68458 6.34278 8.68432H20.1257C20.5996 8.68432 21.0541 8.87256 21.3891 9.20762C21.7242 9.54269 21.9124 9.99714 21.9124 10.471C21.9124 10.9449 21.7242 11.3993 21.3891 11.7344C21.0541 12.0694 20.5996 12.2577 20.1257 12.2577H11.4476C11.2445 12.2577 11.0497 12.3384 10.9061 12.482C10.7625 12.6256 10.6819 12.8203 10.6819 13.0234C10.6819 13.2265 10.7625 13.4212 10.9061 13.5648C11.0497 13.7084 11.2445 13.7891 11.4476 13.7891H12.979C13.4529 13.7891 13.9073 13.9774 14.2424 14.3124C14.5775 14.6475 14.7657 15.1019 14.7657 15.5758C14.7657 16.0497 14.5775 16.5041 14.2424 16.8392C13.9073 17.1742 13.4529 17.3625 12.979 17.3625H10.4266C10.2235 17.3625 10.0288 17.4432 9.88518 17.5868C9.74158 17.7304 9.6609 17.9251 9.6609 18.1282C9.6609 18.3313 9.74158 18.526 9.88518 18.6696C10.0288 18.8132 10.2235 18.8939 10.4266 18.8939H10.9371C11.411 18.8939 11.8654 19.0822 12.2005 19.4172C12.5355 19.7523 12.7238 20.2067 12.7238 20.6806C12.7238 21.1545 12.5355 21.6089 12.2005 21.944C11.8654 22.279 11.411 22.4673 10.9371 22.4673H6.34278C3.51855 22.4673 1.59787 21.5357 1.58 21.5267C1.39891 21.438 1.19011 21.4242 0.998953 21.4885C0.807796 21.5528 0.649714 21.6899 0.559038 21.87C0.503105 21.9754 0.473341 22.0927 0.472258 22.212C0.471977 22.3546 0.51149 22.4944 0.586344 22.6157C0.6612 22.737 0.768427 22.835 0.895958 22.8986C0.985292 22.9433 3.13569 24 6.34278 24H10.9371C11.373 24 11.8045 23.9141 12.2072 23.7473C12.6098 23.5805 12.9757 23.3359 13.2838 23.0277C13.592 22.7194 13.8363 22.3535 14.003 21.9508C14.1697 21.5481 14.2554 21.1165 14.2552 20.6806Z"
                      fill="#2E53FF"
                    />
                  </svg>
                </span>{" "}
                Please submit your personal Information Below
              </li>
              <li className="flex items-center gap-4 py-1 text-lg text-gray-700 font-poppins-regular">
                <span>
                  <svg
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1257 3.06904C22.0889 3.06904 23.9716 3.84888 25.3597 5.23702C26.7479 6.62516 27.5277 8.50788 27.5277 10.471C27.5277 12.4341 26.7479 14.3168 25.3597 15.705C23.9716 17.0931 22.0889 17.873 20.1257 17.873C19.9227 17.873 19.7279 17.7923 19.5843 17.6487C19.4407 17.5051 19.36 17.3103 19.36 17.1072C19.36 16.9042 19.4407 16.7094 19.5843 16.5658C19.7279 16.4222 19.9227 16.3415 20.1257 16.3415C21.6827 16.3415 23.1759 15.723 24.2768 14.6221C25.3778 13.5211 25.9963 12.028 25.9963 10.471C25.9963 8.91404 25.3778 7.42085 24.2768 6.31991C23.1759 5.21898 21.6827 4.60048 20.1257 4.60048C19.9227 4.60048 19.7279 4.5198 19.5843 4.3762C19.4407 4.2326 19.36 4.03784 19.36 3.83476C19.36 3.63167 19.4407 3.43691 19.5843 3.29331C19.7279 3.14971 19.9227 3.06904 20.1257 3.06904ZM14.2552 20.6806C14.2559 20.0164 14.0562 19.3675 13.6822 18.8186C14.2051 18.7051 14.6927 18.4668 15.1036 18.124C15.5145 17.7813 15.8363 17.3443 16.0418 16.8502C16.2473 16.3562 16.3302 15.8198 16.2836 15.2868C16.2369 14.7538 16.0621 14.24 15.7739 13.7891H20.1257C21.0058 13.7891 21.8497 13.4395 22.472 12.8173C23.0943 12.195 23.4439 11.351 23.4439 10.471C23.4439 9.59098 23.0943 8.747 22.472 8.12473C21.8497 7.50246 21.0058 7.15288 20.1257 7.15288L9.0228 7.15288L10.567 6.1919C11.3286 5.74969 11.8833 5.02306 12.1091 4.17187C12.3349 3.32068 12.2133 2.41465 11.7711 1.65309C11.3289 0.891534 10.6023 0.336837 9.75107 0.111025C8.89988 -0.114786 7.99385 0.00678507 7.23229 0.448995L0.85129 4.19082C0.681519 4.29568 0.559393 4.46269 0.510916 4.65626C0.46244 4.84983 0.491446 5.05468 0.591753 5.22718C0.692062 5.39969 0.855751 5.52622 1.04796 5.57983C1.24017 5.63345 1.44572 5.60991 1.62084 5.51424L8.00184 1.77624C8.20505 1.65893 8.42937 1.58279 8.662 1.55217C8.89464 1.52154 9.13102 1.53704 9.35767 1.59778C9.81539 1.72044 10.2056 2.0199 10.4426 2.4303C10.6795 2.84069 10.7437 3.3284 10.621 3.78612C10.5603 4.01277 10.4555 4.22523 10.3127 4.41138C10.1698 4.59752 9.99173 4.75372 9.78852 4.87103C9.78089 4.87456 9.77362 4.87883 9.76683 4.88379L5.93822 7.26774C5.7966 7.35551 5.68747 7.48708 5.62739 7.64249C5.56731 7.79789 5.55955 7.96866 5.60531 8.12887C5.65106 8.28908 5.74783 8.43 5.88092 8.53024C6.01401 8.63048 6.17616 8.68458 6.34278 8.68432H20.1257C20.5996 8.68432 21.0541 8.87256 21.3891 9.20762C21.7242 9.54269 21.9124 9.99714 21.9124 10.471C21.9124 10.9449 21.7242 11.3993 21.3891 11.7344C21.0541 12.0694 20.5996 12.2577 20.1257 12.2577H11.4476C11.2445 12.2577 11.0497 12.3384 10.9061 12.482C10.7625 12.6256 10.6819 12.8203 10.6819 13.0234C10.6819 13.2265 10.7625 13.4212 10.9061 13.5648C11.0497 13.7084 11.2445 13.7891 11.4476 13.7891H12.979C13.4529 13.7891 13.9073 13.9774 14.2424 14.3124C14.5775 14.6475 14.7657 15.1019 14.7657 15.5758C14.7657 16.0497 14.5775 16.5041 14.2424 16.8392C13.9073 17.1742 13.4529 17.3625 12.979 17.3625H10.4266C10.2235 17.3625 10.0288 17.4432 9.88518 17.5868C9.74158 17.7304 9.6609 17.9251 9.6609 18.1282C9.6609 18.3313 9.74158 18.526 9.88518 18.6696C10.0288 18.8132 10.2235 18.8939 10.4266 18.8939H10.9371C11.411 18.8939 11.8654 19.0822 12.2005 19.4172C12.5355 19.7523 12.7238 20.2067 12.7238 20.6806C12.7238 21.1545 12.5355 21.6089 12.2005 21.944C11.8654 22.279 11.411 22.4673 10.9371 22.4673H6.34278C3.51855 22.4673 1.59787 21.5357 1.58 21.5267C1.39891 21.438 1.19011 21.4242 0.998953 21.4885C0.807796 21.5528 0.649714 21.6899 0.559038 21.87C0.503105 21.9754 0.473341 22.0927 0.472258 22.212C0.471977 22.3546 0.51149 22.4944 0.586344 22.6157C0.6612 22.737 0.768427 22.835 0.895958 22.8986C0.985292 22.9433 3.13569 24 6.34278 24H10.9371C11.373 24 11.8045 23.9141 12.2072 23.7473C12.6098 23.5805 12.9757 23.3359 13.2838 23.0277C13.592 22.7194 13.8363 22.3535 14.003 21.9508C14.1697 21.5481 14.2554 21.1165 14.2552 20.6806Z"
                      fill="#2E53FF"
                    />
                  </svg>
                </span>{" "}
                Please submit the fee in given payment details
              </li>
              <li className="flex items-center gap-4 py-1 text-lg text-gray-700 font-poppins-regular">
                <span>
                  <svg
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1257 3.06904C22.0889 3.06904 23.9716 3.84888 25.3597 5.23702C26.7479 6.62516 27.5277 8.50788 27.5277 10.471C27.5277 12.4341 26.7479 14.3168 25.3597 15.705C23.9716 17.0931 22.0889 17.873 20.1257 17.873C19.9227 17.873 19.7279 17.7923 19.5843 17.6487C19.4407 17.5051 19.36 17.3103 19.36 17.1072C19.36 16.9042 19.4407 16.7094 19.5843 16.5658C19.7279 16.4222 19.9227 16.3415 20.1257 16.3415C21.6827 16.3415 23.1759 15.723 24.2768 14.6221C25.3778 13.5211 25.9963 12.028 25.9963 10.471C25.9963 8.91404 25.3778 7.42085 24.2768 6.31991C23.1759 5.21898 21.6827 4.60048 20.1257 4.60048C19.9227 4.60048 19.7279 4.5198 19.5843 4.3762C19.4407 4.2326 19.36 4.03784 19.36 3.83476C19.36 3.63167 19.4407 3.43691 19.5843 3.29331C19.7279 3.14971 19.9227 3.06904 20.1257 3.06904ZM14.2552 20.6806C14.2559 20.0164 14.0562 19.3675 13.6822 18.8186C14.2051 18.7051 14.6927 18.4668 15.1036 18.124C15.5145 17.7813 15.8363 17.3443 16.0418 16.8502C16.2473 16.3562 16.3302 15.8198 16.2836 15.2868C16.2369 14.7538 16.0621 14.24 15.7739 13.7891H20.1257C21.0058 13.7891 21.8497 13.4395 22.472 12.8173C23.0943 12.195 23.4439 11.351 23.4439 10.471C23.4439 9.59098 23.0943 8.747 22.472 8.12473C21.8497 7.50246 21.0058 7.15288 20.1257 7.15288L9.0228 7.15288L10.567 6.1919C11.3286 5.74969 11.8833 5.02306 12.1091 4.17187C12.3349 3.32068 12.2133 2.41465 11.7711 1.65309C11.3289 0.891534 10.6023 0.336837 9.75107 0.111025C8.89988 -0.114786 7.99385 0.00678507 7.23229 0.448995L0.85129 4.19082C0.681519 4.29568 0.559393 4.46269 0.510916 4.65626C0.46244 4.84983 0.491446 5.05468 0.591753 5.22718C0.692062 5.39969 0.855751 5.52622 1.04796 5.57983C1.24017 5.63345 1.44572 5.60991 1.62084 5.51424L8.00184 1.77624C8.20505 1.65893 8.42937 1.58279 8.662 1.55217C8.89464 1.52154 9.13102 1.53704 9.35767 1.59778C9.81539 1.72044 10.2056 2.0199 10.4426 2.4303C10.6795 2.84069 10.7437 3.3284 10.621 3.78612C10.5603 4.01277 10.4555 4.22523 10.3127 4.41138C10.1698 4.59752 9.99173 4.75372 9.78852 4.87103C9.78089 4.87456 9.77362 4.87883 9.76683 4.88379L5.93822 7.26774C5.7966 7.35551 5.68747 7.48708 5.62739 7.64249C5.56731 7.79789 5.55955 7.96866 5.60531 8.12887C5.65106 8.28908 5.74783 8.43 5.88092 8.53024C6.01401 8.63048 6.17616 8.68458 6.34278 8.68432H20.1257C20.5996 8.68432 21.0541 8.87256 21.3891 9.20762C21.7242 9.54269 21.9124 9.99714 21.9124 10.471C21.9124 10.9449 21.7242 11.3993 21.3891 11.7344C21.0541 12.0694 20.5996 12.2577 20.1257 12.2577H11.4476C11.2445 12.2577 11.0497 12.3384 10.9061 12.482C10.7625 12.6256 10.6819 12.8203 10.6819 13.0234C10.6819 13.2265 10.7625 13.4212 10.9061 13.5648C11.0497 13.7084 11.2445 13.7891 11.4476 13.7891H12.979C13.4529 13.7891 13.9073 13.9774 14.2424 14.3124C14.5775 14.6475 14.7657 15.1019 14.7657 15.5758C14.7657 16.0497 14.5775 16.5041 14.2424 16.8392C13.9073 17.1742 13.4529 17.3625 12.979 17.3625H10.4266C10.2235 17.3625 10.0288 17.4432 9.88518 17.5868C9.74158 17.7304 9.6609 17.9251 9.6609 18.1282C9.6609 18.3313 9.74158 18.526 9.88518 18.6696C10.0288 18.8132 10.2235 18.8939 10.4266 18.8939H10.9371C11.411 18.8939 11.8654 19.0822 12.2005 19.4172C12.5355 19.7523 12.7238 20.2067 12.7238 20.6806C12.7238 21.1545 12.5355 21.6089 12.2005 21.944C11.8654 22.279 11.411 22.4673 10.9371 22.4673H6.34278C3.51855 22.4673 1.59787 21.5357 1.58 21.5267C1.39891 21.438 1.19011 21.4242 0.998953 21.4885C0.807796 21.5528 0.649714 21.6899 0.559038 21.87C0.503105 21.9754 0.473341 22.0927 0.472258 22.212C0.471977 22.3546 0.51149 22.4944 0.586344 22.6157C0.6612 22.737 0.768427 22.835 0.895958 22.8986C0.985292 22.9433 3.13569 24 6.34278 24H10.9371C11.373 24 11.8045 23.9141 12.2072 23.7473C12.6098 23.5805 12.9757 23.3359 13.2838 23.0277C13.592 22.7194 13.8363 22.3535 14.003 21.9508C14.1697 21.5481 14.2554 21.1165 14.2552 20.6806Z"
                      fill="#2E53FF"
                    />
                  </svg>
                </span>{" "}
                After submission of fee Contact with Event Host By clicking on
                Message button
              </li>
              <li className="flex items-center gap-4 py-1 text-lg text-gray-700 font-poppins-regular">
                <span>
                  <svg
                    width="28"
                    height="24"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.1257 3.06904C22.0889 3.06904 23.9716 3.84888 25.3597 5.23702C26.7479 6.62516 27.5277 8.50788 27.5277 10.471C27.5277 12.4341 26.7479 14.3168 25.3597 15.705C23.9716 17.0931 22.0889 17.873 20.1257 17.873C19.9227 17.873 19.7279 17.7923 19.5843 17.6487C19.4407 17.5051 19.36 17.3103 19.36 17.1072C19.36 16.9042 19.4407 16.7094 19.5843 16.5658C19.7279 16.4222 19.9227 16.3415 20.1257 16.3415C21.6827 16.3415 23.1759 15.723 24.2768 14.6221C25.3778 13.5211 25.9963 12.028 25.9963 10.471C25.9963 8.91404 25.3778 7.42085 24.2768 6.31991C23.1759 5.21898 21.6827 4.60048 20.1257 4.60048C19.9227 4.60048 19.7279 4.5198 19.5843 4.3762C19.4407 4.2326 19.36 4.03784 19.36 3.83476C19.36 3.63167 19.4407 3.43691 19.5843 3.29331C19.7279 3.14971 19.9227 3.06904 20.1257 3.06904ZM14.2552 20.6806C14.2559 20.0164 14.0562 19.3675 13.6822 18.8186C14.2051 18.7051 14.6927 18.4668 15.1036 18.124C15.5145 17.7813 15.8363 17.3443 16.0418 16.8502C16.2473 16.3562 16.3302 15.8198 16.2836 15.2868C16.2369 14.7538 16.0621 14.24 15.7739 13.7891H20.1257C21.0058 13.7891 21.8497 13.4395 22.472 12.8173C23.0943 12.195 23.4439 11.351 23.4439 10.471C23.4439 9.59098 23.0943 8.747 22.472 8.12473C21.8497 7.50246 21.0058 7.15288 20.1257 7.15288L9.0228 7.15288L10.567 6.1919C11.3286 5.74969 11.8833 5.02306 12.1091 4.17187C12.3349 3.32068 12.2133 2.41465 11.7711 1.65309C11.3289 0.891534 10.6023 0.336837 9.75107 0.111025C8.89988 -0.114786 7.99385 0.00678507 7.23229 0.448995L0.85129 4.19082C0.681519 4.29568 0.559393 4.46269 0.510916 4.65626C0.46244 4.84983 0.491446 5.05468 0.591753 5.22718C0.692062 5.39969 0.855751 5.52622 1.04796 5.57983C1.24017 5.63345 1.44572 5.60991 1.62084 5.51424L8.00184 1.77624C8.20505 1.65893 8.42937 1.58279 8.662 1.55217C8.89464 1.52154 9.13102 1.53704 9.35767 1.59778C9.81539 1.72044 10.2056 2.0199 10.4426 2.4303C10.6795 2.84069 10.7437 3.3284 10.621 3.78612C10.5603 4.01277 10.4555 4.22523 10.3127 4.41138C10.1698 4.59752 9.99173 4.75372 9.78852 4.87103C9.78089 4.87456 9.77362 4.87883 9.76683 4.88379L5.93822 7.26774C5.7966 7.35551 5.68747 7.48708 5.62739 7.64249C5.56731 7.79789 5.55955 7.96866 5.60531 8.12887C5.65106 8.28908 5.74783 8.43 5.88092 8.53024C6.01401 8.63048 6.17616 8.68458 6.34278 8.68432H20.1257C20.5996 8.68432 21.0541 8.87256 21.3891 9.20762C21.7242 9.54269 21.9124 9.99714 21.9124 10.471C21.9124 10.9449 21.7242 11.3993 21.3891 11.7344C21.0541 12.0694 20.5996 12.2577 20.1257 12.2577H11.4476C11.2445 12.2577 11.0497 12.3384 10.9061 12.482C10.7625 12.6256 10.6819 12.8203 10.6819 13.0234C10.6819 13.2265 10.7625 13.4212 10.9061 13.5648C11.0497 13.7084 11.2445 13.7891 11.4476 13.7891H12.979C13.4529 13.7891 13.9073 13.9774 14.2424 14.3124C14.5775 14.6475 14.7657 15.1019 14.7657 15.5758C14.7657 16.0497 14.5775 16.5041 14.2424 16.8392C13.9073 17.1742 13.4529 17.3625 12.979 17.3625H10.4266C10.2235 17.3625 10.0288 17.4432 9.88518 17.5868C9.74158 17.7304 9.6609 17.9251 9.6609 18.1282C9.6609 18.3313 9.74158 18.526 9.88518 18.6696C10.0288 18.8132 10.2235 18.8939 10.4266 18.8939H10.9371C11.411 18.8939 11.8654 19.0822 12.2005 19.4172C12.5355 19.7523 12.7238 20.2067 12.7238 20.6806C12.7238 21.1545 12.5355 21.6089 12.2005 21.944C11.8654 22.279 11.411 22.4673 10.9371 22.4673H6.34278C3.51855 22.4673 1.59787 21.5357 1.58 21.5267C1.39891 21.438 1.19011 21.4242 0.998953 21.4885C0.807796 21.5528 0.649714 21.6899 0.559038 21.87C0.503105 21.9754 0.473341 22.0927 0.472258 22.212C0.471977 22.3546 0.51149 22.4944 0.586344 22.6157C0.6612 22.737 0.768427 22.835 0.895958 22.8986C0.985292 22.9433 3.13569 24 6.34278 24H10.9371C11.373 24 11.8045 23.9141 12.2072 23.7473C12.6098 23.5805 12.9757 23.3359 13.2838 23.0277C13.592 22.7194 13.8363 22.3535 14.003 21.9508C14.1697 21.5481 14.2554 21.1165 14.2552 20.6806Z"
                      fill="#2E53FF"
                    />
                  </svg>
                </span>{" "}
                Send the screen shots of your payment to event host
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center py-4 ml-10">
            <div className="grid grid-cols-10 gap-6 ">
              <div className="relative col-span-3">
                <div
                  style={{
                    backgroundImage: 'url("/img/shortImage.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="relative "
                >
                  <div className="absolute inset-0 opacity-75 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800"></div>
                  <div className="flex items-center justify-center">
                    <h2 className="relative z-10 pt-10 text-white">Join Now</h2>
                  </div>
                  <img src="/img/shortImage.png" alt="" className="w-full" />
                </div>
              </div>

              <div
                className="col-span-6 bg-[#17B3A6] shadow-lg "
                style={{ boxShadow: "9px 9px 4px #00c5b5" }}
              >
                <form className="p-6">
                  <p className="text-2xl text-white font-poppins-medium">
                    Payment Information
                  </p>
                  <div className="relative w-full">
                    <label
                      htmlFor="team"
                      className="text-xl font-medium text-white capitalize font-poppins"
                    >
                      account number
                    </label>

                    <div className="relative flex items-center w-full my-3">
                      <svg
                        width="28"
                        height="24"
                        viewBox="0 0 28 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute transform -translate-y-1/2 left-2 top-1/2"
                      >
                        <path
                          d="M6 10H17V12H6V10ZM6 15H19V17H6V15Z"
                          fill="#17B3A6"
                        />
                        <path
                          d="M26 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H26C26.5304 24 27.0391 23.7893 27.4142 23.4142C27.7893 23.0391 28 22.5304 28 22V2C28 1.46957 27.7893 0.960859 27.4142 0.585786C27.0391 0.210714 26.5304 0 26 0ZM26 2V4H2V2H26ZM2 22V6H26V22H2Z"
                          fill="#17B3A6"
                        />
                      </svg>

                      <input
                        type="text"
                        name="Player"
                        id="teamname"
                        value={paymentDetails?.branchName}
                        className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                      />
                    </div>
                  </div>

                  <div className="relative w-full">
                    <label
                      htmlFor="team"
                      className="text-xl font-medium text-white capitalize font-poppins"
                    >
                      paypal id
                    </label>

                    <div className="relative flex items-center w-full my-3">
                      <svg
                        width="26"
                        height="24"
                        viewBox="0 0 26 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute transform -translate-y-1/2 left-2 top-1/2"
                      >
                        <path
                          d="M1 5C1 3.93913 1.42143 2.92172 2.17157 2.17157C2.92172 1.42143 3.93913 1 5 1H21C22.0609 1 23.0783 1.42143 23.8284 2.17157C24.5786 2.92172 25 3.93913 25 5V18.3333C25 19.3942 24.5786 20.4116 23.8284 21.1618C23.0783 21.9119 22.0609 22.3333 21 22.3333H5C3.93913 22.3333 2.92172 21.9119 2.17157 21.1618C1.42143 20.4116 1 19.3942 1 18.3333V5Z"
                          stroke="#17B3A6"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 6.33337H19.6666M17 11.6667H19.6666M6.33331 17H19.6666M6.33331 9.00004C6.33331 9.70728 6.61426 10.3856 7.11436 10.8857C7.61446 11.3858 8.29274 11.6667 8.99998 11.6667C9.70722 11.6667 10.3855 11.3858 10.8856 10.8857C11.3857 10.3856 11.6666 9.70728 11.6666 9.00004C11.6666 8.2928 11.3857 7.61452 10.8856 7.11442C10.3855 6.61433 9.70722 6.33337 8.99998 6.33337C8.29274 6.33337 7.61446 6.61433 7.11436 7.11442C6.61426 7.61452 6.33331 8.2928 6.33331 9.00004Z"
                          stroke="#17B3A6"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <input
                        type="text"
                        name="Player"
                        id="teamname"
                        value={paymentDetails?.accountHolderName}
                        className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                      />
                    </div>
                  </div>
                  <div className="relative w-full capitalize ">
                    <label
                      htmlFor="team"
                      className="text-xl font-medium text-white font-poppins"
                    >
                      account holder name
                    </label>

                    <div className="relative flex items-center w-full my-3 ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute transform -translate-y-1/2 left-2 top-1/2"
                      >
                        <path
                          d="M12 0C13.5913 0 15.1174 0.632141 16.2426 1.75736C17.3679 2.88258 18 4.4087 18 6C18 7.5913 17.3679 9.11742 16.2426 10.2426C15.1174 11.3679 13.5913 12 12 12C10.4087 12 8.88258 11.3679 7.75736 10.2426C6.63214 9.11742 6 7.5913 6 6C6 4.4087 6.63214 2.88258 7.75736 1.75736C8.88258 0.632141 10.4087 0 12 0ZM12 15C18.63 15 24 17.685 24 21V24H0V21C0 17.685 5.37 15 12 15Z"
                          fill="#17B3A6"
                        />
                      </svg>

                      <input
                        type="text"
                        name="Player"
                        id="teamname"
                        value={paymentDetails?.creator?.nickName}
                        className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <label
                      htmlFor="team"
                      className="text-xl font-medium text-white capitalize font-poppins "
                    >
                      joining Fee
                    </label>

                    <div className="relative flex items-center w-full my-3 capitalize ">
                      <svg
                        width="24"
                        height="23"
                        viewBox="0 0 24 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute transform -translate-y-1/2 left-2 top-1/2"
                      >
                        <path
                          d="M16 15C16 13.895 12.866 13 9 13M16 15C16 16.105 12.866 17 9 17C5.134 17 2 16.105 2 15M16 15V19.937C16 21.076 12.866 22 9 22C5.134 22 2 21.077 2 19.937V15M16 15C19.824 15 23 14.013 23 13V3M9 13C5.134 13 2 13.895 2 15M9 13C4.582 13 1 12.013 1 11V6M9 4C4.582 4 1 4.895 1 6M1 6C1 7.105 4.582 8 9 8C9 9.013 12.253 10 16.077 10C19.9 10 23 9.013 23 8M23 3C23 1.895 19.9 1 16.077 1C12.253 1 9.154 1.895 9.154 3M23 3C23 4.105 19.9 5 16.077 5C12.254 5 9.154 4.105 9.154 3M9.154 3V13.166"
                          stroke="#17B3A6"
                          stroke-width="2"
                        />
                      </svg>

                      <input
                        type="text"
                        name="Player"
                        id="teamname"
                        value="¥200"
                        className="w-full py-4 text-base font-normal text-gray-600 border-none rounded-md pl-14 bg-gray-50 font-poppins"
                      />
                    </div>
                  </div>

                  <button className="px-8 py-4 mt-4 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
                    Submit
                  </button>
                </form>
                <div className="flex items-center justify-end">
                  <h3 className="text-white">Contact with Host</h3>
                  <div>
                    <div className="cursor-pointer">
                      <img
                        src="/img/line.png"
                        alt=""
                        width="70px"
                        height="70px"
                      />
                    </div>
                    <div className="ml-1 cursor-pointer">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="19"
                          cy="19"
                          r="18.5"
                          fill="#17B3A6"
                          stroke="white"
                        />
                        <path
                          d="M15.1025 15.8333H22.8974M15.1025 19.7308H20.9487M24.8461 10.9615C25.6213 10.9615 26.3648 11.2695 26.913 11.8177C27.4612 12.3659 27.7692 13.1094 27.7692 13.8846V21.6795C27.7692 22.4547 27.4612 23.1982 26.913 23.7464C26.3648 24.2946 25.6213 24.6026 24.8461 24.6026H19.9743L15.1025 27.5257V24.6026H13.1538C12.3785 24.6026 11.635 24.2946 11.0869 23.7464C10.5387 23.1982 10.2307 22.4547 10.2307 21.6795V13.8846C10.2307 13.1094 10.5387 12.3659 11.0869 11.8177C11.635 11.2695 12.3785 10.9615 13.1538 10.9615H24.8461Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
