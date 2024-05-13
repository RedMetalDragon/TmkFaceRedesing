import * as React from 'react';
import StripePricingTable from './StripePricingTable';

function PricingTable() {
    const publishableKey = import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY;
    const pricingTableId = import.meta.env.VITE_APP_STRIPE_PRICE_ID_TABLE;
    return <StripePricingTable publishableKey={publishableKey} pricingTableId={pricingTableId}></StripePricingTable>;
}

export default PricingTable;
