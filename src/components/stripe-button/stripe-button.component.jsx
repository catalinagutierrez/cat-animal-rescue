import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/paw.svg';

import CustomButton from '../custom-button/custom-button.component';

const StripeCheckoutButton = ({ amount }) => {
    const amountForStipe = amount * 100;
    const publishableKey =
        'pk_test_51H8Sp7BUoT3opay7ntC7O1fFlNYtk39wkZZCBIejK8a4Xyzs8ll30frtzqVuqleh5RAJRvo4MJe3yVNr3oZQqTKj005uATjZEL';

    const onToken = (token) => {
        console.log(token);
        alert('We have receieved your support. Thank you!');
    };

    return (
        <StripeCheckout
            label='Donate Now'
            name='CAT Animal Rescue Ltd.'
            billingAddress
            shippingAddress
            image={logo}
            description={`You will donate $${amount}`}
            amount={amountForStipe}
            panelLabel='Donation'
            token={onToken}
            stripeKey={publishableKey}
        >
            <CustomButton inverted>Donate Now</CustomButton>
        </StripeCheckout>
    );
};

export default StripeCheckoutButton;
