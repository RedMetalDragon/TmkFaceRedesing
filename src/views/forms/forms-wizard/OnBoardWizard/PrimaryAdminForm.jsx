import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField, Box, styled, Paper, Avatar } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';

// Gentle floating animation for the main container
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-4px);
  }
`;

// Subtle pulse animation for the avatar
const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
  }
`;

// Input field focus animation - creates a gentle glow effect
const glowAnimation = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px rgba(33, 150, 243, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(33, 150, 243, 0.6);
  }
`;

// Main container with floating design aesthetic
const MainContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: `linear-gradient(145deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.action.hover} 100%)`,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[8],
    position: 'relative',
    overflow: 'hidden',

    // Add subtle floating animation to the entire container
    animation: `${floatAnimation} 6s ease-in-out infinite`,

    // Create a subtle background pattern
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 30%, 
      ${theme.palette.primary.light}15 0%, 
      transparent 50%),
      radial-gradient(circle at 80% 70%, 
      ${theme.palette.secondary.light}10 0%, 
      transparent 50%)`,
        zIndex: 0
    },

    // Ensure content appears above the background pattern
    '& > *': {
        position: 'relative',
        zIndex: 1
    }
}));

// Header section with enhanced styling
const HeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[3]
}));

// Enhanced avatar with pulsing animation
const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
    width: 80,
    height: 80,
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    animation: `${pulseAnimation} 3s ease-in-out infinite`,

    '& .MuiSvgIcon-root': {
        fontSize: '2.5rem'
    }
}));

// Input field container with enhanced styling and hover effects
const InputFieldContainer = styled(Box)(({ theme }) => ({
    position: 'relative',

    // Enhanced TextField styling
    '& .MuiTextField-root': {
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(1.5),
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

            '&:hover': {
                backgroundColor: theme.palette.action.hover,
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4]
            },

            '&.Mui-focused': {
                backgroundColor: theme.palette.background.paper,
                transform: 'translateY(-2px)',
                animation: `${glowAnimation} 2s ease-in-out infinite`
            }
        },

        '& .MuiInputLabel-root': {
            fontWeight: 600,

            '&.Mui-focused': {
                fontWeight: 700
            }
        }
    }
}));

// Icon container for field labels
const FieldIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),

    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.dark,
        fontSize: '1.25rem'
    }
}));

// Enhanced form section with better visual hierarchy
const FormSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: `inset 0 2px 4px ${theme.palette.action.hover}`
}));

const validationSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    jobTitle: yup.string().required('Job Title is required'),
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{4,6}$/, 'Please enter a valid phone number')
});

const PrimaryAdminForm = ({ primaryAdmin, setPrimaryAdmin, handleNext, handleBack, setErrorIndex }) => {
    const formik = useFormik({
        initialValues: {
            firstName: primaryAdmin?.firstName || '',
            lastName: primaryAdmin?.lastName || '',
            email: primaryAdmin?.email || '',
            jobTitle: primaryAdmin?.jobTitle || '',
            phone: primaryAdmin?.phone || ''
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            setPrimaryAdmin(values);
            handleNext();
        }
    });

    // Helper function to get completion percentage for visual feedback
    const getCompletionPercentage = () => {
        const fields = ['firstName', 'lastName', 'email', 'jobTitle', 'phone'];
        const completedFields = fields.filter((field) => formik.values[field] && !formik.errors[field]);
        return Math.round((completedFields.length / fields.length) * 100);
    };

    return (
        <>
            {/* Header Section with floating design */}
            <Grid container direction="column" alignItems="center" spacing={2} mb={4}>
                <Grid item>
                    <AnimatedAvatar>
                        <AdminPanelSettingsIcon />
                    </AnimatedAvatar>
                </Grid>
                <Grid item>
                    <Typography variant="h4" gutterBottom align="center">
                        Primary Administrator
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600 }}>
                        Set up the primary administrator account for your organization. This person will have full access to manage company
                        settings and users.
                    </Typography>
                </Grid>
            </Grid>

            <MainContainer elevation={6}>
                {/* <HeaderSection>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="primary" />
                        Administrator Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Form completion: {getCompletionPercentage()}%
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: 4,
                            backgroundColor: 'action.hover',
                            borderRadius: 2,
                            mt: 1,
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                width: `${getCompletionPercentage()}%`,
                                height: '100%',
                                backgroundColor: 'primary.main',
                                borderRadius: 2,
                                transition: 'width 0.3s ease-in-out'
                            }}
                        />
                    </Box>
                </HeaderSection> */}
                <FormSection>
                    <form onSubmit={formik.handleSubmit} id="primary-admin-form">
                        <Grid container spacing={3}>
                            {/* Personal Information Section */}
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mb: 2,
                                        textAlign: 'center'
                                    }}
                                >
                                    <PersonIcon color="primary" />
                                    Personal Information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFieldContainer>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <FieldIcon>
                                            <PersonIcon />
                                        </FieldIcon>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            First Name
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="firstName"
                                        name="firstName"
                                        label="First Name *"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </InputFieldContainer>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFieldContainer>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <FieldIcon>
                                            <PersonIcon />
                                        </FieldIcon>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Last Name
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name *"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </InputFieldContainer>
                            </Grid>

                            {/* Contact Information Section */}
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mt: 2,
                                        mb: 2
                                    }}
                                >
                                    <EmailIcon color="primary" />
                                    Contact Information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFieldContainer>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <FieldIcon>
                                            <EmailIcon />
                                        </FieldIcon>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Email Address
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email Address *"
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        fullWidth
                                        variant="outlined"
                                    />
                                </InputFieldContainer>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFieldContainer>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <FieldIcon>
                                            <PhoneIcon />
                                        </FieldIcon>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Phone Number
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Phone Number *"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        fullWidth
                                        variant="outlined"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </InputFieldContainer>
                            </Grid>

                            {/* Professional Information Section */}
                            <Grid item xs={12}>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        mt: 2,
                                        mb: 2
                                    }}
                                >
                                    <WorkIcon color="primary" />
                                    Professional Information
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <InputFieldContainer>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <FieldIcon>
                                            <WorkIcon />
                                        </FieldIcon>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            Job Title
                                        </Typography>
                                    </Box>
                                    <TextField
                                        id="jobTitle"
                                        name="jobTitle"
                                        label="Job Title *"
                                        value={formik.values.jobTitle}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                                        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                                        fullWidth
                                        variant="outlined"
                                        placeholder="e.g., CEO, IT Director, HR Manager"
                                    />
                                </InputFieldContainer>
                            </Grid>
                        </Grid>
                    </form>
                </FormSection>

                {/* Enhanced Navigation with completion status */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setErrorIndex(1);
                                handleBack();
                            }}
                        >
                            Back
                        </Button>
                    </AnimateButton>
                    <AnimateButton>
                        <Button variant="contained" onClick={formik.handleSubmit} disabled={!formik.isValid || formik.isSubmitting}>
                            Continue
                        </Button>
                    </AnimateButton>
                </Stack>
            </MainContainer>
        </>
    );
};

PrimaryAdminForm.propTypes = {
    primaryAdmin: PropTypes.object,
    setPrimaryAdmin: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default PrimaryAdminForm;
