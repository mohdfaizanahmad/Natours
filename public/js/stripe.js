/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
// Public key
const stripe = Stripe(
  'pk_test_51MfgkJSAZsIlsP5mybX1Na0DRw07uHjv62ZVnSJbvoaHEtTrZVOT5K2oCpfjcg8twKKDAZJu7WnrOCKRR0eJlVTN005WjqyVNi'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);
    //alert(session.data.session.id);
    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
