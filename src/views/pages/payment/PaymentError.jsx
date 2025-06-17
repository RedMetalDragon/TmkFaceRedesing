// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';

const PaymentError = () => {
    const theme = useTheme();
    const navigate = useNavigate();

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
                                <ErrorTwoToneIcon sx={{ fontSize: 70, color: theme.palette.error.main, mb: 2 }} />
                                <Typography variant="h2" color="error.main" gutterBottom>
                                    Payment Failed
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                    There was an error processing your payment. Please try again or contact support if the problem persists.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => navigate('/get-started')}
                                    size="large"
                                >
                                    Try Again
                                </Button>
                            </Box>
                        </MainCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PaymentError;