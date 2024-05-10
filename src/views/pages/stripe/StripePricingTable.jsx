import PropTypes from 'prop-types';

function StripeEmbededScript(publishableKey, pricingTableId) {
    return {
        __html: `<script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                <stripe-pricing-table 
                    pricing-table-id=${pricingTableId}
                    publishable-key="${publishableKey}">
                </stripe-pricing-table>`
    };
}

const StripePricingTable = ({ publishableKey, pricingTableId }) => {
    return <div dangerouslySetInnerHTML={StripeEmbededScript(publishableKey, pricingTableId)} />;
};

StripePricingTable.propTypes = {
    publishableKey: PropTypes.string.isRequired,
    pricingTableId: PropTypes.string.isRequired
};

export default StripePricingTable;
