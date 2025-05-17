import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function RefundPolicy() {
    return (
        <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Return & Privacy Policy
          </h1>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
              Your Privacy, Our Priority
            </h2>
            <p className="text-gray-700 mb-4">
              At <strong>Anantvaa</strong>, your privacy is of utmost importance to us. We are fully committed to safeguarding your personal data and ensuring that your shopping experience is safe, seamless, and secure.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Information We Collect:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Name and Contact Information – For order confirmation and delivery updates</li>
              <li>Shipping Address – To deliver your products accurately</li>
              <li>Payment Details – Collected securely via encrypted payment gateways</li>
              <li>Site Usage Data – Collected through cookies and analytics tools</li>
            </ul>
            <p className="text-gray-700">
              <strong>Note:</strong> We do <span className="text-red-600 font-semibold">not</span> sell, rent, or misuse your data in any form. Your trust is our responsibility.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Return Policy</h2>
            <p className="text-gray-700 mb-4">
              We strive to ensure complete satisfaction with every purchase. However, if you're not entirely happy with your order, here’s how we can help:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Eligibility:</strong> Returns are accepted within <strong>7 days</strong> of receiving the product.</li>
              <li><strong>Condition:</strong> Items must be unused, unwashed, and in their original packaging.</li>
              <li>
                <strong>Process:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Email us at <a href="mailto:support@anantvaa.com" className="text-indigo-600 underline">support@anantvaa.com</a> with your order number and reason for return.</li>
                  <li>Our team will initiate the return and provide shipping instructions.</li>
                </ul>
              </li>
              <li><strong>Refunds:</strong> Issued to your original payment method within <strong>7–10 business days</strong> after item inspection.</li>
            </ul>
            <p className="text-gray-700">
              <strong>Note:</strong> Return shipping costs are the responsibility of the customer unless the product was defective or incorrect.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about your privacy, orders, or returns, please reach out to us at: <br />
              📧 <a href="mailto:support@anantvaa.com" className="text-indigo-600 underline">support@anantvaa.com</a>
            </p>
          </section>
        </div>
        <Footer />
      </>
  )
}
