import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// material-ui
import { Alert, Box, Typography } from '@mui/material';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

const ErrorBoundary = () => {
    const error = useRouteError();

    // Log all errors to the console for debugging
    console.error(error);

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <Alert color="error">Error 404 - This page doesn't exist!</Alert>;
        }

        if (error.status === 401) {
            return <Alert color="error">Error 401 - You aren't authorized to see this</Alert>;
        }

        if (error.status === 503) {
            return <Alert color="error">Error 503 - Looks like our API is down</Alert>;
        }

        if (error.status === 418) {
            return <Alert color="error">Error 418 - Contact administrator</Alert>;
        }
    }

    // Fallback UI for generic JavaScript errors
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                padding: 2
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Application Error
            </Typography>
            <Typography variant="body1">
                Oops! Something went wrong on our end. We're working to fix it.
            </Typography>
            <Typography variant="body1">
                Please try refreshing the page or contact support if the problem persists.
            </Typography>
        </Box>
    );
};

export default ErrorBoundary;
