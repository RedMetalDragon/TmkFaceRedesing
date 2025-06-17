import PropTypes from 'prop-types';
import { Button, Grid, Stack, Typography, TextField, Chip, Box, styled, Paper } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';

// Gentle floating animation for the bubble-like movement
const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-6px) rotate(0.5deg);
  }
  66% {
    transform: translateY(-3px) rotate(-0.5deg);
  }
`;

// Subtle vibration effect for hover - gentle movements for refined feel
const vibrateAnimation = keyframes`
  0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
  25% { transform: translateX(-0.5px) translateY(-0.3px) rotate(-0.2deg); }
  50% { transform: translateX(0.5px) translateY(0.3px) rotate(0.2deg); }
  75% { transform: translateX(-0.3px) translateY(0.5px) rotate(-0.1deg); }
`;

// Left panel container for input controls and selected departments
const ControlPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    background: `linear-gradient(145deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.action.hover} 100%)`,
    border: `1px solid ${theme.palette.divider}`,
    // Add subtle shadow for depth
    boxShadow: theme.shadows[3]
}));

// Right panel container for the floating department buttons
const FloatingButtonContainer = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',

    // Create a bubble-like background environment
    background: `radial-gradient(circle at 30% 20%, 
    ${theme.palette.primary.light}20 0%, 
    transparent 50%),
    radial-gradient(circle at 70% 80%, 
    ${theme.palette.secondary.light}15 0%, 
    transparent 50%),
    linear-gradient(135deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.action.hover} 100%)`,

    border: `2px dashed ${theme.palette.primary.light}`,
    boxShadow: `inset 0 0 20px ${theme.palette.action.hover}`
}));

// Round floating buttons with enhanced hover effects - more compact and refined
const FloatingButton = styled(Button)(({ theme, delay = 0, isSelected }) => ({
    // Make buttons perfectly round but more compact
    borderRadius: '50%',
    minWidth: '4vw',
    height: '4vh',
    padding: 0,

    // Base floating animation with staggered delays for organic movement
    animation: `${floatAnimation} ${4 + delay * 0.3}s ease-in-out infinite`,
    animationDelay: `${delay * 0.15}s`,

    // Smooth transitions for all state changes
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Base styling for depth and visual appeal
    boxShadow: isSelected ? theme.shadows[6] : theme.shadows[3],

    // Typography adjustments for round buttons - smaller, more readable
    fontSize: '0.65rem',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.1,

    // Selected state styling
    ...(isSelected && {
        transform: 'scale(1.05)',
        zIndex: 2,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    }),

    // Hover effects - refined and subtle
    '&:hover': {
        // Switch to gentle vibration animation on hover
        animation: `${vibrateAnimation} 0.3s ease-in-out infinite`,
        transform: isSelected ? 'scale(1.1)' : 'scale(1.02)',
        boxShadow: theme.shadows[8],
        zIndex: 3,

        // Add a subtle glow effect
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '-1px',
            left: '-1px',
            right: '-1px',
            bottom: '-1px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, 
        ${theme.palette.primary.main}, 
        ${theme.palette.secondary.contrastText})`,
            zIndex: -1,
            opacity: 0.5
        }
    },

    // Focus styles for accessibility
    '&:focus': {
        outline: `2px solid ${theme.palette.primary.light}40`,
        outlineOffset: '3px'
    },

    // Responsive sizing for different screen sizes
    [theme.breakpoints.down('md')]: {
        minWidth: '55px',
        height: '55px',
        fontSize: '0.6rem'
    },

    [theme.breakpoints.down('sm')]: {
        minWidth: '50px',
        height: '50px',
        fontSize: '0.55rem'
    }
}));

// Container for selected department chips with organized layout and flexible growth
const ChipContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.spacing(1.5),
    minHeight: '12vh',
    flexGrow: 1, // Allow container to grow and fill available space
    border: `2px dashed ${theme.palette.divider}`,
    alignItems: 'flex-start',
    alignContent: 'flex-start',

    // Add a subtle inner shadow for depth
    boxShadow: `inset 0 2px 4px ${theme.palette.action.hover}`
}));

// Input section styling for better visual hierarchy
const InputSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1.5),
    border: `2px solid ${theme.palette.divider}`
}));

const validationSchema = yup.object({
    departments: yup.array().min(1, 'At least one department is required')
});

const commonDepartments = [
    'Human Resources',
    'Engineering',
    'Sales',
    'Marketing',
    'Finance',
    'Customer Support',
    'IT Support',
    'Legal',
    'Operations',
    'Product Management'
];

const OrganizationStructureForm = ({ departments, setDepartments, handleNext, handleBack, setErrorIndex }) => {
    const formik = useFormik({
        initialValues: {
            departments: departments || [],
            customDepartment: ''
        },
        validationSchema,
        onSubmit: (values) => {
            setDepartments(values.departments);
            handleNext();
        }
    });

    const toggleDepartment = (dept) => {
        const current = formik.values.departments;
        if (current.includes(dept)) {
            formik.setFieldValue(
                'departments',
                current.filter((d) => d !== dept)
            );
        } else {
            formik.setFieldValue('departments', [...current, dept]);
        }
    };

    const handleAddCustomDepartment = () => {
        const newDept = formik.values.customDepartment.trim();
        if (newDept && !formik.values.departments.includes(newDept)) {
            formik.setFieldValue('departments', [...formik.values.departments, newDept]);
        }
        formik.setFieldValue('customDepartment', '');
    };

    const handleCustomDeptKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomDepartment();
        }
    };

    const handleDeleteDepartment = (dept) => {
        formik.setFieldValue(
            'departments',
            formik.values.departments.filter((d) => d !== dept)
        );
    };

    return (
        <>
            {/* Header Section - spans full width for visual balance */}
            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}
                mb={4}
                borderBottom={'1px solid'}
                borderColor="divider"
                pb={2}
            >
                <Grid item>
                    <BusinessIcon sx={{ fontSize: '3.5rem', color: 'primary.main' }} />
                </Grid>
                <Grid item>
                    <Typography variant="h4" gutterBottom align="center">
                        Organization Structure
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600 }}>
                        Build your organization by selecting existing departments or creating custom ones. Selected departments will appear
                        on the left panel.
                    </Typography>
                </Grid>
            </Grid>

            {/* Main Two-Column Layout */}
            <Grid container spacing={4} alignItems="flex-start">
                {/* LEFT PANEL: Controls and Selected Departments */}
                <Grid item xs={12} md={5}>
                    <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
                        Add custom departments
                    </Typography>
                    <ControlPanel elevation={3}>
                        {/* Custom Department Input Section */}
                        <InputSection>
                            <form onSubmit={formik.handleSubmit} id="organization-structure-form">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={8}>
                                        <TextField
                                            id="customDepartment"
                                            name="customDepartment"
                                            label="Department Name"
                                            value={formik.values.customDepartment}
                                            onChange={formik.handleChange}
                                            onKeyDown={handleCustomDeptKeyDown}
                                            fullWidth
                                            variant="outlined"
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleAddCustomDepartment}
                                                fullWidth
                                                disabled={!formik.values.customDepartment.trim()}
                                                startIcon={<AddIcon />}
                                            >
                                                Add
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </InputSection>

                        {/* Selected Departments Display */}
                        <Typography variant="h6" gutterBottom>
                            Selected Departments ({formik.values.departments.length})
                        </Typography>

                        <ChipContainer>
                            {formik.values.departments.length > 0 ? (
                                formik.values.departments.map((dept) => (
                                    <Chip
                                        key={dept}
                                        label={dept}
                                        onDelete={() => handleDeleteDepartment(dept)}
                                        color="primary"
                                        variant="filled"
                                        sx={{
                                            // Entrance animation for visual feedback
                                            animation: 'slideIn 0.3s ease-out',
                                            '@keyframes slideIn': {
                                                from: {
                                                    opacity: 0,
                                                    transform: 'translateX(-20px)'
                                                },
                                                to: {
                                                    opacity: 1,
                                                    transform: 'translateX(0)'
                                                }
                                            },
                                            // Enhanced styling for better visual hierarchy
                                            fontWeight: 600,
                                            fontSize: '0.875rem'
                                        }}
                                    />
                                ))
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        flexDirection: 'column',
                                        gap: 1
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                        No departments selected yet
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Select from common departments or add custom ones
                                    </Typography>
                                </Box>
                            )}
                        </ChipContainer>

                        {/* Error Display with better positioning */}
                        {formik.errors.departments && formik.touched.departments && (
                            <Box mt={2}>
                                <Typography color="error" variant="body2" align="center">
                                    {formik.errors.departments}
                                </Typography>
                            </Box>
                        )}
                    </ControlPanel>
                </Grid>

                {/* RIGHT PANEL: Floating Department Buttons */}
                <Grid item xs={12} md={7}>
                    <Typography variant="h6" gutterBottom align="center" sx={{ mb: 2 }}>
                        Common Departments
                    </Typography>
                    <FloatingButtonContainer elevation={2}>
                        {commonDepartments.map((dept, index) => {
                            const isSelected = formik.values.departments.includes(dept);
                            return (
                                <FloatingButton
                                    key={dept}
                                    delay={index} // Creates the staggered floating effect
                                    isSelected={isSelected}
                                    variant={isSelected ? 'contained' : 'outlined'}
                                    color={isSelected ? 'secondary' : 'inherit'}
                                    onClick={() => toggleDepartment(dept)}
                                    // Accessibility attributes for screen readers
                                    aria-label={`${dept} department, ${isSelected ? 'selected' : 'not selected'}`}
                                    role="button"
                                >
                                    {dept}
                                </FloatingButton>
                            );
                        })}
                    </FloatingButtonContainer>
                </Grid>
            </Grid>

            {/* Navigation Buttons - Full Width Bottom Section */}
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 4 }}>
                <AnimateButton>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setErrorIndex(0);
                            handleBack();
                        }}
                    >
                        Back
                    </Button>
                </AnimateButton>
                <AnimateButton>
                    <Button variant="contained" onClick={formik.handleSubmit} disabled={formik.values.departments.length === 0}>
                        Continue
                    </Button>
                </AnimateButton>
            </Stack>
        </>
    );
};

OrganizationStructureForm.propTypes = {
    departments: PropTypes.array,
    setDepartments: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default OrganizationStructureForm;
