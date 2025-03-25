// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Grid, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

// project imports
import MainCard from 'ui-component/cards/MainCard';

const PaymentSuccess = () => {
    const theme = useTheme();
    const [loading, setLoading] = useState(true);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    
    const messages = [
        "Verifying payment...",
        "Setting up your account...",
        "Almost there...",
        "Success! Redirecting to dashboard..."
    ];

    useEffect(() => {
        // Simulate messages changing every 2 seconds
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => {
                if (prev === messages.length - 1) {
                    setLoading(false);
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                bgcolor: theme.palette.mode === 'dark' ? 'dark.dark' : 'grey.50'
            }}
        >
            <Container>
                <Grid container justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs={12} md={8} lg={6}>
                        <MainCard>
                            <Box sx={{ textAlign: 'center', p: 3 }}>
                                {loading ? (
                                    <>
                                        <CircularProgress size={60} thickness={4} />
                                        <Typography variant="h3" sx={{ mt: 2 }}>
                                            {messages[currentMessageIndex]}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography variant="h2" color="success.main">
                                        Payment Successful!
                                    </Typography>
                                )}
                            </Box>
                        </MainCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PaymentSuccess;