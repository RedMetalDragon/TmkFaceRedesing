import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Grid,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    IconButton,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getPlansAvailables } from 'store/slices/createAccount';
import Loader from 'ui-component/Loader';

// assets
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone';
import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone';
import DirectionsBoatTwoToneIcon from '@mui/icons-material/DirectionsBoatTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// utils
import { currencySymbol } from 'utils/helperFunctions';

// Mock features - replace with API data later
const MOCK_FEATURES = {
    basic: [
        { name: 'Up to 5 team members', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: false },
        { name: 'Custom branding', included: false },
        { name: 'Advanced security', included: false }
    ],
    standard: [
        { name: 'Up to 15 team members', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority email support', included: true },
        { name: 'API access', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Advanced security', included: false }
    ],
    premium: [
        { name: 'Unlimited team members', included: true },
        { name: 'Enterprise analytics', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Advanced API access', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Advanced security', included: true }
    ]
};

const PlanIcon = ({ planName }) => {
    switch (planName.toLowerCase()) {
        case 'basic':
            return <TwoWheelerTwoToneIcon fontSize="large" />;
        case 'standard':
            return <AirportShuttleTwoToneIcon fontSize="large" />;
        case 'premium':
            return <DirectionsBoatTwoToneIcon fontSize="large" />;
        default:
            return <TwoWheelerTwoToneIcon fontSize="large" />;
    }
};

PlanIcon.propTypes = {
    planName: PropTypes.string.isRequired
};

const FeatureList = ({ features, expanded }) => {
    const theme = useTheme();

    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider sx={{ my: 2 }} />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            {feature.included ? (
                                <CheckCircleOutlineIcon sx={{ color: theme.palette.success.main }} />
                            ) : (
                                <CancelOutlinedIcon sx={{ color: theme.palette.error.light }} />
                            )}
                        </ListItemIcon>
                        <ListItemText
                            primary={feature.name}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    fontSize: '0.875rem',
                                    color: feature.included ? 'inherit' : theme.palette.text.disabled
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Collapse>
    );
};

FeatureList.propTypes = {
    features: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        included: PropTypes.bool.isRequired
    })).isRequired,
    expanded: PropTypes.bool.isRequired
};

const PlanCard = ({ plan, onSelect, isSelected, currency = 'usd' }) => {
    const theme = useTheme();
    const [expanded, setExpanded] = React.useState(false);
    const darkBorder = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75;

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setExpanded(!expanded);
    };

    // Determine which feature set to use based on plan name
    const planFeatures = MOCK_FEATURES[plan.subscriptionName.toLowerCase()] || MOCK_FEATURES.basic;

    return (
        <MainCard
            boxShadow
            sx={{
                pt: 1.75,
                cursor: 'pointer',
                border: isSelected ? '2px solid' : '1px solid',
                borderColor: isSelected ? 'secondary.main' : darkBorder,
                '&:hover': {
                    borderColor: theme.palette.secondary.main
                }
            }}
            onClick={() => onSelect(plan)}
        >
            <Grid container textAlign="center" spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            width: 80,
                            height: 80,
                            background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
                            color: theme.palette.primary.main
                        }}
                    >
                        <PlanIcon planName={plan.subscriptionName} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">{plan.subscriptionName}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{plan.subscriptionDescription}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        component="div"
                        variant="body2"
                        sx={{
                            fontSize: '2.1875rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'flex-start',
                            '& > sup': {
                                fontSize: '1rem',
                                marginTop: '0.5rem',
                                marginRight: '0.25rem'
                            },
                            '& > span': {
                                fontSize: '1.25rem',
                                fontWeight: 500,
                                marginTop: '0.5rem',
                                marginLeft: '0.25rem'
                            }
                        }}
                    >

                        {currencySymbol(currency)}{(plan.subscriptionAmount / 100).toFixed(2)}
                        <span>/{plan.subscriptionBillingCycle.toLowerCase()}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={isSelected ? 'contained' : 'outlined'}
                        color="secondary"
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        {isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            cursor: 'pointer'
                        }}
                        onClick={handleExpandClick}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontStyle: 'italic',
                                color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : theme.palette.grey[600]
                            }}
                        >
                            {expanded ? 'Collapse' : 'View Details'}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={handleExpandClick}
                            sx={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: theme.transitions.create('transform', {
                                    duration: theme.transitions.duration.shortest,
                                }),
                            }}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <FeatureList features={planFeatures} expanded={expanded} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

PlanCard.propTypes = {
    plan: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    currency: PropTypes.string
};

const SubscriptionPlanForm = ({ handleNext, handleBack }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [billingCycle, setBillingCycle] = React.useState('Monthly');
    const { selectedPlan, isSubmitting, availablePlans, loadingPlans, error } = useSelector((state) => state.createAccount);

    useEffect(() => {
        const loadPlans = async () => {
            try {
                await dispatch(getPlansAvailables());
            } catch (err) {
                console.error('Failed to load plans:', err);
            }
        };
        loadPlans();
    }, [dispatch]);

    const handleChangeBillingCycle = (event, newBillingCycle) => {
        if (newBillingCycle !== null) {
            setBillingCycle(newBillingCycle);
        }
    };

    const handleSelectPlan = (plan) => {
        dispatch({ type: 'createAccount/setSelectedPlan', payload: plan });
    };

    const handleConfirm = () => {
        if (selectedPlan) {
            handleNext();
        }
    };

    if (loadingPlans || isSubmitting) {
        return <Loader />;
    }

    const plansToShow = billingCycle === 'Monthly' ? availablePlans?.monthlyPlans : availablePlans?.yearlyPlans;

    if (!plansToShow?.length) {
        return (
            <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h6" color="error">
                    {error || 'No subscription plans available at the moment. Please try again later.'}
                </Typography>
                <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
                    Back
                </Button>
            </Box>
        );
    }

    return (
        <>
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item>
                    <ToggleButtonGroup
                        value={billingCycle}
                        exclusive
                        onChange={handleChangeBillingCycle}
                        color="secondary"
                    >
                        <ToggleButton value="Monthly">Monthly</ToggleButton>
                        <ToggleButton value="Yearly">Yearly</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing}>
                {plansToShow.map((plan, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <PlanCard
                            plan={plan}
                            onSelect={handleSelectPlan}
                            isSelected={selectedPlan?.subscriptionName === plan.subscriptionName}
                            currency={plan.subscriptionCurrency}
                        />
                    </Grid>
                ))}
                <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="outlined" onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirm}
                        disabled={!selectedPlan}
                        color="secondary"
                    >
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

SubscriptionPlanForm.propTypes = {
    handleNext: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
};

export default SubscriptionPlanForm;
