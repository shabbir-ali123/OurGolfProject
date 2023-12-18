import React from 'react';

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
  // Handle the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: PaymentFormValues = {
      joiningFee: Number(formData.get('joiningFee')),
      accountHolderName: formData.get('accountHolderName') as string,
      paypalId: formData.get('paypalId') as string,
      accountNumber: formData.get('accountNumber') as string,
    };
    
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[gray-200] px-4">
    <div className="w-full max-w-lg bg-[#17B3A6] rounded-lg shadow-md p-6 mt-10 mb-10">
      <h3 className="text-2xl text-white font-bold mb-6">Instructions</h3>
      <ul className="list-disc ml-5 mb-4">
        <li>Submit your personal information below.</li>
        <li>Submit the fee in given payment details.</li>
        <li>After submission of fee, contact the event host.</li>
        <li>Send screenshots of your payment to the event host.</li>
      </ul>
     
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div className="flex flex-col space-y-2">
          <label htmlFor="joiningFee" className="text-white">Joining Fee</label>
          <input type="number" id="joiningFee" name="joiningFee" placeholder="₹200" className="border rounded px-4 py-2" />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="accountHolderName" className="text-white">Account Holder Name</label>
          <input type="text" id="accountHolderName" name="accountHolderName" placeholder="Name" className="border rounded px-4 py-2" />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="paypalId" className="text-white">PayPal ID</label>
          <input type="text" id="paypalId" name="paypalId" placeholder="PayPal ID" className="border rounded px-4 py-2" />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="accountNumber" className="text-white">Account Number</label>
          <input type="text" id="accountNumber" name="accountNumber" placeholder="Account Number" className="border rounded px-4 py-2" />
        </div>
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition-colors duration-200">Pay Now</button>
      </form>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200">Contact with Host</button>
      </div>
    </div>
  </div>

  );
};

export default PaymentForm;