import * as React from 'react';

function PricingPage() {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const pricingTableId = import.meta.env.VITE_APP_STRIPE_PRICE_ID_TABLE;

    return <stripe-pricing-page pricing-table-id={pricingTableId} publishable-key={publishableKey}></stripe-pricing-page>;
}

export default PricingPage;
