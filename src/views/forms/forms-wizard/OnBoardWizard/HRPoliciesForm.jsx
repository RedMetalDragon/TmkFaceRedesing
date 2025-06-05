import PropTypes from 'prop-types';
import {
    Button,
    Grid,
    Stack,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Box,
    styled,
    Paper,
    Card,
    Avatar,
    Switch
} from '@mui/material';
import { keyframes } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PolicyIcon from '@mui/icons-material/Policy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Removed all keyframe animations for a clean, static interface
// This approach prioritizes focus and eliminates visual distractions
// allowing users to concentrate fully on policy configuration decisions

// Main container with sophisticated policy management aesthetic - static design
const PolicyContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: `linear-gradient(145deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.action.hover} 100%)`,
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[10],
    position: 'relative',
    overflow: 'hidden',

    // Static design - removed floating animation for focused user experience

    // Create an authoritative background pattern for policy management
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 25% 25%, 
      ${theme.palette.success.light}12 0%, 
      transparent 50%),
      radial-gradient(circle at 75% 75%, 
      ${theme.palette.primary.light}12 0%, 
      transparent 50%),
      linear-gradient(135deg, 
      transparent 0%, 
      ${theme.palette.action.hover}50 100%)`,
        zIndex: 0
    },

    // Ensure content appears above background
    '& > *': {
        position: 'relative',
        zIndex: 1
    }
}));

// Header section with policy management branding
const PolicyHeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.success.light}40`,
    boxShadow: theme.shadows[4]
}));

// Enhanced avatar for policy management with clean, static styling
const PolicyAvatar = styled(Avatar)(({ theme }) => ({
    width: 90,
    height: 90,
    backgroundColor: theme.palette.success.main,
    marginBottom: theme.spacing(2),
    // Static design - removed pulse animation for focused interface
    boxShadow: theme.shadows[6], // Added consistent shadow for depth

    '& .MuiSvgIcon-root': {
        fontSize: '3rem'
    }
}));

// Individual policy card with clean, static design focused on content
const PolicyCard = styled(Card)(({ theme, isCompleted }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(2),
    border: isCompleted ? `2px solid ${theme.palette.success.main}` : `2px solid ${theme.palette.divider}`,
    backgroundColor: isCompleted ? `${theme.palette.success.light}10` : theme.palette.background.paper,
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    position: 'relative',

    // Static design - removed floating animations for focused experience
    // Improved box shadow for clean, professional depth
    boxShadow: theme.shadows[3],

    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
        borderColor: theme.palette.primary.main
    },

    // Add completion indicator
    ...(isCompleted && {
        '&::after': {
            content: '""',
            position: 'absolute',
            top: theme.spacing(1),
            right: theme.spacing(1),
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: theme.palette.success.main,
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='white' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e")`,
            backgroundSize: '16px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }
    })
}));

// Policy section icon with floating design
const PolicySectionIcon = styled(Box)(({ theme, color = 'primary' }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: theme.palette[color].light,
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),

    '& .MuiSvgIcon-root': {
        color: theme.palette[color].dark,
        fontSize: '1.5rem'
    }
}));

// Enhanced dropdown with sophisticated styling - static design
const PolicyDropdown = styled(TextField)(({ theme }) => ({
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
            boxShadow: theme.shadows[6]
        }
    },

    '& .MuiInputLabel-root': {
        fontWeight: 600,

        '&.Mui-focused': {
            fontWeight: 700
        }
    }

    // Static design - removed selection animation for clean, distraction-free interface
}));

// Enhanced checkbox/switch container
const PolicyToggleContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`,
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[4]
    }
}));

const validationSchema = yup.object({
    workingHours: yup.string().required('Working hours are required'),
    probationPeriod: yup.string().required('Probation period is required'),
    ptoPolicy: yup.string().required('PTO Policy is required'),
    allowWorkFromHome: yup.boolean()
});

const HRPoliciesForm = ({
    policy,
    setPolicy,
    handleNext,
    handleBack,
    setErrorIndex,
    workingHoursOptions,
    probationOptions,
    ptoOptions
}) => {
    const formik = useFormik({
        initialValues: {
            workingHours: policy?.workingHours || '',
            probationPeriod: policy?.probationPeriod || '',
            ptoPolicy: policy?.ptoPolicy || '',
            allowWorkFromHome: policy?.allowWorkFromHome || false
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values) => {
            setPolicy(values);
            handleNext();
        }
    });

    // Calculate completion percentage for visual feedback
    const getCompletionPercentage = () => {
        const requiredFields = ['workingHours', 'probationPeriod', 'ptoPolicy'];
        const completedFields = requiredFields.filter((field) => formik.values[field] && !formik.errors[field]);
        return Math.round((completedFields.length / requiredFields.length) * 100);
    };

    // Helper function to check if a specific policy section is completed
    const isPolicyCompleted = (fieldName) => {
        return formik.values[fieldName] && !formik.errors[fieldName];
    };

    return (
        <>
            {/* Header Section */}
            <Grid container direction="column" alignItems="center" spacing={2} mb={4}>
                <Grid item>
                    <PolicyAvatar>
                        <PolicyIcon />
                    </PolicyAvatar>
                </Grid>
                <Grid item>
                    <Typography variant="h4" gutterBottom align="center">
                        HR Policies Configuration
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 700 }}>
                        Configure your company's human resources policies. These settings will define how your organization operates and
                        what employees can expect regarding work arrangements and benefits.
                    </Typography>
                </Grid>
            </Grid>

            <PolicyContainer elevation={8}>
                <PolicyHeaderSection>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PolicyIcon color="success" />
                        Policy Configuration Center
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Configuration progress: {getCompletionPercentage()}%
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: 6,
                            backgroundColor: 'action.hover',
                            borderRadius: 3,
                            mt: 1,
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                width: `${getCompletionPercentage()}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #4caf50 0%, #8bc34a 100%)',
                                borderRadius: 3,
                                transition: 'width 0.5s ease-in-out'
                            }}
                        />
                    </Box>
                </PolicyHeaderSection>

                <form onSubmit={formik.handleSubmit} id="hr-policies-form">
                    <Grid container spacing={3}>
                        {/* Working Hours Policy */}
                        <Grid item xs={12} md={6}>
                            <PolicyCard isCompleted={isPolicyCompleted('workingHours')}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <PolicySectionIcon color="primary">
                                        <ScheduleIcon />
                                    </PolicySectionIcon>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Working Hours
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Define standard operating hours for your organization
                                        </Typography>
                                    </Box>
                                </Box>

                                <PolicyDropdown
                                    id="workingHours"
                                    name="workingHours"
                                    label="Working Hours *"
                                    select
                                    value={formik.values.workingHours}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.workingHours && Boolean(formik.errors.workingHours)}
                                    helperText={formik.touched.workingHours && formik.errors.workingHours}
                                    fullWidth
                                    className={formik.values.workingHours ? '' : ''} // Removed animation class for static design
                                >
                                    <MenuItem value="">Select Working Hours</MenuItem>
                                    {workingHoursOptions &&
                                        workingHoursOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </PolicyDropdown>
                            </PolicyCard>
                        </Grid>

                        {/* Probation Period Policy */}
                        <Grid item xs={12} md={6}>
                            <PolicyCard isCompleted={isPolicyCompleted('probationPeriod')}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <PolicySectionIcon color="warning">
                                        <TimerIcon />
                                    </PolicySectionIcon>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Probation Period
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Set the standard probationary period for new hires
                                        </Typography>
                                    </Box>
                                </Box>

                                <PolicyDropdown
                                    id="probationPeriod"
                                    name="probationPeriod"
                                    label="Probation Period *"
                                    select
                                    value={formik.values.probationPeriod}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.probationPeriod && Boolean(formik.errors.probationPeriod)}
                                    helperText={formik.touched.probationPeriod && formik.errors.probationPeriod}
                                    fullWidth
                                    className={formik.values.probationPeriod ? '' : ''} // Removed animation class for static design
                                >
                                    <MenuItem value="">Select Probation Period</MenuItem>
                                    {probationOptions &&
                                        probationOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </PolicyDropdown>
                            </PolicyCard>
                        </Grid>

                        {/* PTO Policy */}
                        <Grid item xs={12} md={6}>
                            <PolicyCard isCompleted={isPolicyCompleted('ptoPolicy')}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <PolicySectionIcon color="info">
                                        <BeachAccessIcon />
                                    </PolicySectionIcon>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Time Off Policy
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Configure how employees can request and use paid time off
                                        </Typography>
                                    </Box>
                                </Box>

                                <PolicyDropdown
                                    id="ptoPolicy"
                                    name="ptoPolicy"
                                    label="PTO Policy *"
                                    select
                                    value={formik.values.ptoPolicy}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.ptoPolicy && Boolean(formik.errors.ptoPolicy)}
                                    helperText={formik.touched.ptoPolicy && formik.errors.ptoPolicy}
                                    fullWidth
                                    className={formik.values.ptoPolicy ? '' : ''} // Removed animation class for static design
                                >
                                    <MenuItem value="">Select PTO Policy</MenuItem>
                                    {ptoOptions &&
                                        ptoOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                </PolicyDropdown>
                            </PolicyCard>
                        </Grid>

                        {/* Remote Work Policy */}
                        <Grid item xs={12} md={6}>
                            <PolicyCard isCompleted={true}>
                                {' '}
                                {/* Always considered complete since it's optional */}
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                    <PolicySectionIcon color="secondary">
                                        <HomeWorkIcon />
                                    </PolicySectionIcon>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Remote Work
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            Allow employees to work from home when needed
                                        </Typography>
                                    </Box>
                                </Box>
                                <PolicyToggleContainer>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                id="allowWorkFromHome"
                                                name="allowWorkFromHome"
                                                color="primary"
                                                checked={formik.values.allowWorkFromHome}
                                                onChange={formik.handleChange}
                                                size="medium"
                                            />
                                        }
                                        label={
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="subtitle1" fontWeight={600}>
                                                    Work From Home
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {formik.values.allowWorkFromHome ? 'Enabled' : 'Disabled'}
                                                </Typography>
                                            </Box>
                                        }
                                        labelPlacement="bottom"
                                        sx={{ margin: 0 }}
                                    />
                                </PolicyToggleContainer>
                            </PolicyCard>
                        </Grid>
                    </Grid>
                </form>

                {/* Enhanced Navigation with policy completion status */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setErrorIndex(2);
                                handleBack();
                            }}
                        >
                            Back
                        </Button>
                    </AnimateButton>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {getCompletionPercentage() === 100 ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CheckCircleIcon color="success" fontSize="small" />
                                    All policies configured!
                                </Box>
                            ) : (
                                `${3 - Object.keys(formik.errors).length} policies remaining`
                            )}
                        </Typography>
                    </Box>

                    <AnimateButton>
                        <Button variant="contained" onClick={formik.handleSubmit} disabled={!formik.isValid || formik.isSubmitting}>
                            {getCompletionPercentage() === 100 ? 'Review Setup' : `Continue (${getCompletionPercentage()}%)`}
                        </Button>
                    </AnimateButton>
                </Stack>
            </PolicyContainer>
        </>
    );
};

HRPoliciesForm.propTypes = {
    policy: PropTypes.object,
    setPolicy: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func,
    workingHoursOptions: PropTypes.array,
    probationOptions: PropTypes.array,
    ptoOptions: PropTypes.array
};

export default HRPoliciesForm;
