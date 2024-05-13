import { FunctionComponent, useState, useEffect } from "react";
import SearchEventContainer from "../components/SearchMainEventFilter";
import SideIconMenu from "../components/SideIconMenu";
import { Clip } from "../components/Clip";
import Tabs from "../components/Tabs";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
// import { fetchEvents } from "../utils/fetchEvents";
import { ToastProvider } from '../utils/ToastProvider';
import { useTranslation } from "react-i18next";
import { eventContextStore } from "../contexts/eventContext";
import { userAuthContext } from "../contexts/authContext";
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);





const EventMainPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [events, setEvents] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1280);
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("ALL");
  const { handleLocationFilter, clearFilter, handleSearch } = eventContextStore();
  useEffect(() => {
    handleLocationFilter(selectedLocations);
    if (clearFilter) {
      handleLocationFilter([])
    }
  }, [selectedLocations, clearFilter]);

  const handleTabChange = (tab: string) => {
    const lowerTab = tab?.toLowerCase();
    setCurrentTab(lowerTab);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRemoveLocation = (locationToRemove: string) => {
    setSelectedLocations((prevSelectedLocations) =>
      prevSelectedLocations.filter((location) => location !== locationToRemove)
    );
  };

  useEffect(() => {
    if (clearFilter === true) {
      setSelectedLocations([])

    }
  }, [clearFilter]);

  // test

  const {user} = userAuthContext();

  async function getTotalAmountPaid(customerId:any) {
    try {
      // Retrieve payment history for the customer
     
const customers = await stripe.customers.list({
  limit: 30,
});
  
      // Calculate total amount paid
      // let totalAmountPaid = 0;
      const totalAmountPaid = customers.data.find((data: any) => "dero@gmail.com" === data.email);

      console.log(totalAmountPaid, "asd")
   // Retrieve payments associated with the customer
   const payments = await stripe.paymentIntents.list({
    customer: customerId,
  });
  console.log(payments, "aswwd")

  // Retrieve subscriptions associated with the customer
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 100, // Adjust as needed
  });

  // Extract session IDs from payments and subscriptions
  const sessionIds = [
    ...payments.data.map((payment:any) => payment.metadata.session_id),
    ...subscriptions.data.map((subscription:any) => subscription.metadata.session_id),
  ];

  return sessionIds;
    } catch (error) {
      console.error('Error retrieving payment history:', error);
      throw error;
    }
  }
  
  getTotalAmountPaid("cus_Q3C3Vf8MFTWURN")
    .then(totalAmountPaid => {
      console.log('Total amount paid:', totalAmountPaid);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  
  
  
  const handleCheckout = async (e:any) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
     if(token){
  
     
      const lineItems = [
        {
          price_data: {
            currency: "JPY",
            product_data: {
              name: "Per Event", 
            },
            unit_amount: 550,
          },
          quantity: 1,
        }
      ];
      var baseUrl = window.location.origin;
      var createEvent = baseUrl + '/create-event';
      const customer = await stripe.customers.create({
        name: user.id,
        email: user.email,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: user.email,
        
        success_url: `${createEvent}/{CHECKOUT_SESSION_ID}`,
        cancel_url: baseUrl,
        allow_promotion_codes: true,
      
      });
  
      window.location.href = session.url;
    }else{
      window.location.href = '/login-page';
    }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  
    // try{
    //   const customer = await stripe.customers.create();
    //   const ephemeralKey = await stripe.ephemeralKeys.create(
    //     {customer: customer.id},
    //     {apiVersion: '2024-04-10'}
    //   );
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 1099,
    //     currency: 'eur',
    //     customer: customer.id,
    //     setup_future_usage: 'off_session',
    //     automatic_payment_methods: {
    //       enabled: true,
    //     },
    //   });
    
    //   console.log(paymentIntent.client_secret, ephemeralKey.secret, customer.id)
    //   // res.json({
    //   //   paymentIntent: paymentIntent.client_secret,
    //   //   ephemeralKey: ephemeralKey.secret,
    //   //   customer: customer.id,
    //   //   publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx'
    //   // });
    //   }catch(error){
    //   console.error('Error creating customer:', error);
    // }
    
    
  };
  //test
  return (
    <ToastProvider iconColor="white" textColor="white">
      <div className="flex flex-col gap-0 overflow-hidden px-10 py-0 mx-0 xl:px-20 bg-[white]  transition-colors duration-2000 animate-color-change">
        <SearchEventContainer />
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-end gap-3">
            <div className="hidden md:block md:animate__animated md:animate__rotateIn xl:animate__animated xl:animate__rotateIn">
              <img
                className="object-cover w-16 animate-pulse"
                alt=""
                src="/img/rectangle-1248@2x.png"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4 my-2 xl:m-0">
              <h1 className="text-[#193A8B] text-[xl] lg:text-[3xl] font-semibold animate__animated animate__rubberBand animate__repeat-3">
                {t('EVENTS_IN')}
              </h1>
              {selectedLocations.map((location, index) => (
                <div key={index} className="flex items-center ">
                  <Clip place={location} />
                  <span
                    onClick={() => handleRemoveLocation(location)}
                    data-te-chip-close
                    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-4 h-4">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>

                </div>
              ))}
            </div>
          </div>
          <div>
            <div onClick={handleCheckout}>
              <button
                type="button"
                className="flex items-center  rounded-md bg-[#17B3A6] px-3 py-3 text-xs font-semibold text-white shadow-sm cursor-pointer animate__animated animate__jello animate__repeat-2 hover:animate-bounce"
                onClick={() => localStorage.removeItem('par')}
              >
                <PencilSquareIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                {t('CREATE_EVENTS')}
              </button>
            </div>
          </div>
        </div>

        <Tabs events={events} setEvents={setEvents} selectedCities={setSelectedLocations} setCurrentTabs={handleTabChange} />

      </div>
    </ToastProvider>
  );
};

export default EventMainPage;
