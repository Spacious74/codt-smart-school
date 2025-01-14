import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const PricingSection = () => {
  const email = localStorage.getItem('email'); // Retrieve email from local storage

  useEffect(() => {
    toast.success('Welcome to our School Management System!');
  }, []);

  return (
    <section className="py-20 bg-gray-100 text-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="font-bold tracking-wider uppercase text-[#503dff]">Pricing</span>
          <h2 className="text-4xl font-bold lg:text-5xl">Choose Your Best Plan</h2>
          {email && <p className="mt-4 text-lg">Registered Email: {email}</p>}
        </div>
        <div className="flex flex-wrap items-stretch -mx-4">
          {/* Basic Plan */}
          <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
            <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow-lg sm:p-8 bg-white hover:shadow-xl transition-shadow">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#503dff]">Basic</h4>
                <span className="text-6xl font-bold">65 INR / Month</span>
              </div>
              <p className="mt-3 leading-relaxed">Ideal for small schools looking to manage student records efficiently.</p>
              <ul className="flex-1 mb-6 text-gray-600">
                <li className="flex mb-2 space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Student Enrollment Management</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Basic Reporting Tools</span>
                </li>
                <li className="flex mb-2 space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Email Notifications</span>
                </li>
              </ul>
              <a
                href={email ? `https://codt.in/portalpaygateway.php?email=${encodeURIComponent(email)}&plan=Basic|65|1 Month` : '#'}
                className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-[#503dff] text-white"
              >
                Get Started
              </a>
            </div>
          </div>
          {/* Premium Plan */}
          <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
            <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow-lg sm:p-8 bg-[#503dff] text-white hover:shadow-xl transition-shadow">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold">Premium</h4>
                <span className="text-6xl font-bold">390 INR / 3 Months</span>
              </div>
              <p className="leading-relaxed">Perfect for medium-sized institutions with advanced needs.</p>
              <ul className="flex-1 space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6" />
                  <span>Advanced Reporting Tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6" />
                  <span>Online Assignment Management</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6" />
                  <span>Parent Communication Portal</span>
                </li>
              </ul>
              <a
                href={email ? `https://codt.in/portalpaygateway.php?email=${encodeURIComponent(email)}&plan=Premium|390|3 Months` : '#' }
                className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded bg-white text-[#503dff]"
              >
                Get Started
              </a>
            </div>
          </div>
          {/* Enterprise Plan */}
          <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
            <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow-lg sm:p-8 bg-white hover:shadow-xl transition-shadow">
              <div className="space-y-2">
                <h4 className="text-2xl font-bold text-[#503dff]">Enterprise</h4>
                <span className="text-6xl font-bold">780 INR / Year</span>
              </div>
              <p className="leading-relaxed text-gray-600">Best for large institutions with extensive management needs.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Customizable Dashboard</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Advanced Security Features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>24/7 Customer Support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckIcon className="flex-shrink-0 w-6 h-6 text-[#503dff]" />
                  <span>Dedicated Account Manager</span>
                </li>
              </ul>
              <a
                href={email ? `https://codt.in/portalpaygateway.php?email=${encodeURIComponent(email)}&plan=Enterprise|780|1 Year` : '#'}
                className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded bg-[#503dff] text-white"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default PricingSection;
