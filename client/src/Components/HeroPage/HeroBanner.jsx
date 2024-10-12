import React from 'react'
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TextsmsIcon from "@mui/icons-material/Textsms";
import ReplayIcon from "@mui/icons-material/Replay";
import CreditCardIcon from "@mui/icons-material/CreditCard";
const HeroBanner = () => {
  return (
    <div className="board px-4 gap-4 mx-auto sm:px-20 h-40 grid grid-cols-2 sm:grid-cols-4 rounded-sm shadow-md py-2 bg-white">
        <div className="cards w-40 text-xs px-2 flex gap-2 justify-center items-center">
          <LocalShippingIcon />
          <div>
            <h6 className="font-semibold">Free shipping</h6>
            <p className="text-slate-600">When you spend $80 or more</p>
          </div>
        </div>
        <div className="cards w-40 text-xs px-1 flex gap-2 justify-center items-center">
          <ReplayIcon />

          <div>
            <h6 className="font-semibold">Satisfied or return</h6>
            <p className="text-slate-600">Easy 30-day return policy</p>
          </div>
        </div>
        <div className="cards w-40 text-xs px-1 flex gap-2 justify-center items-center">
          <TextsmsIcon />
          <div>
            <h6 className="font-semibold">We are available 24/7</h6>
            <p className="text-slate-600">Need help? contact us</p>
          </div>
        </div>
        <div className="cards w-40 text-xs px-1 flex gap-2 justify-center items-center">
          <CreditCardIcon />
          <div>
            <h6 className="font-semibold">100% secure payments</h6>
            <p className="text-slate-600">Visa, Mastercard, Stripe, Paypal</p>
          </div>
        </div>
      </div>
  )
}

export default HeroBanner