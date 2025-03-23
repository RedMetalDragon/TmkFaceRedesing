import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    Box,
    Button,
    Grid,
    Typography,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { currencySymbol } from 'utils/helperFunctions';

// Import slice actions
import { setBillingCycle, setSelectedPlan, getPlansAvailables, switchBillingCycle } from 'store/slices/createAccount';

// assets
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import TwoWheelerTwoToneIcon from '@mui/icons-material/TwoWheelerTwoTone';
import AirportShuttleTwoToneIcon from '@mui/icons-material/AirportShuttleTwoTone';
import DirectionsBoatTwoToneIcon from '@mui/icons-material/DirectionsBoatTwoTone';
import Loader from 'ui-component/Loader';

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

const PlanCard = ({ plan, onSelect, selectedPlan }) => {
    const theme = useTheme();
    const isSelected = selectedPlan?.subscriptionName === plan.subscriptionName;
    const darkBorder = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary[200] + 75;

    return (
        <MainCard
            boxShadow
            sx={{
                pt: 1.75,
                border: isSelected ? '2px solid' : '1px solid',
                borderColor: isSelected ? 'secondary.main' : darkBorder,
                cursor: 'pointer'
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
                            // '& > sup': {
                            //     fontSize: '1rem',
                            //     marginTop: '0.5rem',
                            //     marginRight: '0.25rem'
                            // },
                            '& > span': {
                                fontSize: '1.25rem',
                                fontWeight: 500,
                                marginTop: '0.5rem',
                                marginLeft: '0.25rem'
                            }
                        }}
                    >
                        {/* <span>{currencySymbol(plan.subscriptionCurrency)}</span> */}
                        <span>{(plan.subscriptionAmount / 100).toFixed(2)}</span>
                        <span>/{plan.subscriptionBillingCycle.toLowerCase()}</span>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant={isSelected ? 'contained' : 'outlined'} onClick={() => onSelect(plan)}>
                        {isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
};

PlanCard.propTypes = {
    plan: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedPlan: PropTypes.object
};

const PlanAvailable = ({ handleNext, handleBack }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { selectedPlan, isSubmitting, availablePlans, error, loadingPlans, billingCycle } = useSelector((state) => state.createAccount);

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
            dispatch(setBillingCycle(newBillingCycle));
            
            // If there's a selected plan, find its equivalent in the new billing cycle and select it
            if (selectedPlan) {
                const newPlans = newBillingCycle === 'Monthly' ? availablePlans?.monthlyPlans : availablePlans?.yearlyPlans;
                const equivalentPlan = newPlans?.find(plan => plan.subscriptionName === selectedPlan.subscriptionName);
                if (equivalentPlan) {
                    dispatch(setSelectedPlan(equivalentPlan));
                }
            }
        }
    };

    const handleSelectPlan = (plan) => {
        dispatch(setSelectedPlan(plan));
    };

    const handleConfirm = () => {
        if (selectedPlan) {
            handleNext();
        }
    };

    if (loadingPlans || isSubmitting) {
        return <Loader />;
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        );
    }

    const plansToShow = billingCycle === 'Monthly' ? availablePlans?.monthlyPlans : availablePlans?.yearlyPlans;

    if (!plansToShow?.length) {
        return (
            <Alert severity="warning" sx={{ mb: 2 }}>
                No subscription plans available at the moment. Please try again later.
            </Alert>
        );
    }

    return (
        <>
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                <Grid item>
                    <ToggleButtonGroup value={billingCycle} exclusive onChange={handleChangeBillingCycle}>
                        <ToggleButton value="Monthly">Monthly</ToggleButton>
                        <ToggleButton value="Yearly">Yearly</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid container spacing={gridSpacing}>
                {plansToShow.map((plan, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <PlanCard plan={plan} onSelect={handleSelectPlan} selectedPlan={selectedPlan} />
                    </Grid>
                ))}
                <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="outlined" onClick={handleBack}>
                        Back
                    </Button>
                    <Button variant="contained" onClick={handleConfirm} disabled={!selectedPlan}>
                        Continue
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

PlanAvailable.propTypes = {
    handleNext: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired
};

export default PlanAvailable;
