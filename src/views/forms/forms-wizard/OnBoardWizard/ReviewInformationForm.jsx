import PropTypes from 'prop-types';
import { Button, Stack, Typography, Checkbox, FormControlLabel, Paper, Divider, Box, Grid, Avatar, Chip, styled } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import PolicyIcon from '@mui/icons-material/Policy';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';

// Main container with sophisticated review interface aesthetic - completely static
const ReviewContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(3),
    background: `linear-gradient(145deg, 
    ${theme.palette.background.paper} 0%, 
    ${theme.palette.action.hover} 100%)`,
    border: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[12],
    position: 'relative',
    overflow: 'hidden',

    // Static design with sophisticated background pattern
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 20%, 
      ${theme.palette.success.light}08 0%, 
      transparent 50%),
      radial-gradient(circle at 80% 80%, 
      ${theme.palette.primary.light}08 0%, 
      transparent 50%),
      linear-gradient(135deg, 
      transparent 0%, 
      ${theme.palette.action.hover}30 100%)`,
        zIndex: 0
    },

    // Ensure content appears above background
    '& > *': {
        position: 'relative',
        zIndex: 1
    }
}));

// Header section with completion celebration design
const ReviewHeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.success.light}`,
    boxShadow: theme.shadows[6],
    background: `linear-gradient(135deg, 
    ${theme.palette.success.light}10 0%, 
    ${theme.palette.background.paper} 100%)`
}));

// Completion avatar with success theming
const CompletionAvatar = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 100,
    backgroundColor: theme.palette.success.main,
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[8],

    '& .MuiSvgIcon-root': {
        fontSize: '3.5rem'
    }
}));

// Individual review section card with elegant, static design
const ReviewSectionCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',

    // Static design with elegant hover enhancement
    '&:hover': {
        borderColor: theme.palette.primary.light,
        boxShadow: theme.shadows[6]
    }
}));

// Section header with icon and enhanced typography
const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderBottom: `2px solid ${theme.palette.divider}`
}));

// Section icon with color-coded theming for different data types
const SectionIcon = styled(Avatar)(({ theme, sectionColor = 'primary' }) => ({
    width: 48,
    height: 48,
    backgroundColor: theme.palette[sectionColor].light,
    marginRight: theme.spacing(2),

    '& .MuiSvgIcon-root': {
        color: theme.palette[sectionColor].dark,
        fontSize: '1.5rem'
    }
}));

// Info row for structured data display
const InfoRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.action.hover,
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.action.selected
    }
}));

// Info icon for individual data points
const InfoIcon = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    marginRight: theme.spacing(2),

    '& .MuiSvgIcon-root': {
        color: theme.palette.primary.dark,
        fontSize: '1rem'
    }
}));

// Enhanced confirmation section with stronger visual prominence
const ConfirmationSection = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    border: `2px solid ${theme.palette.warning.light}`,
    boxShadow: theme.shadows[4],

    // Visual emphasis for the critical confirmation step
    background: `linear-gradient(135deg, 
    ${theme.palette.warning.light}05 0%, 
    ${theme.palette.background.paper} 100%)`
}));

// Department chips container with organized layout
const DepartmentChipsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1)
}));

const ReviewInformationForm = ({
    companyInfo,
    departments,
    primaryAdmin,
    policy,
    verified,
    setVerified,
    handleNext,
    handleBack,
    setErrorIndex
}) => {
    const handleCheckbox = (e) => {
        setVerified(e.target.checked);
    };

    // Helper function to format address information comprehensively
    const formatAddress = (info) => {
        const addressParts = [info?.address1, info?.address2, info?.city, info?.state, info?.zipCode, info?.country].filter(Boolean);

        return addressParts.length > 0 ? addressParts.join(', ') : 'Address not provided';
    };

    // Helper function to format policy labels in human-readable format
    const formatPolicyLabel = (value, options) => {
        if (!value || !options) return value;
        const option = options.find((opt) => opt.value === value);
        return option ? option.label : value;
    };

    return (
        <>
            {/* Completion Header Section */}
            <ReviewHeaderSection>
                <CompletionAvatar>
                    <CheckCircleIcon />
                </CompletionAvatar>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
                    Review Your Organization Setup
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600 }}>
                    Please review all the information below carefully. Once confirmed, this will become your organization's configuration
                    and can be modified later through your admin panel.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 2,
                        padding: 2,
                        backgroundColor: 'success.light',
                        borderRadius: 2,
                        color: 'success.dark'
                    }}
                >
                    <VerifiedIcon />
                    <Typography variant="subtitle1" fontWeight={600}>
                        Setup Nearly Complete
                    </Typography>
                </Box>
            </ReviewHeaderSection>

            <ReviewContainer elevation={10}>
                {/* Company Information Section */}
                <ReviewSectionCard elevation={3}>
                    <SectionHeader>
                        <SectionIcon sectionColor="primary">
                            <BusinessIcon />
                        </SectionIcon>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                Company Information
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Basic organizational details and contact information
                            </Typography>
                        </Box>
                    </SectionHeader>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <BusinessIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Company Name
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {companyInfo?.name || 'Not provided'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <WorkIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Industry
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {companyInfo?.industry || 'Not specified'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <LocationOnIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Address
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {formatAddress(companyInfo)}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <PhoneIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {companyInfo?.phone || 'Not provided'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>
                    </Grid>
                </ReviewSectionCard>

                {/* Departments Section */}
                <ReviewSectionCard elevation={3}>
                    <SectionHeader>
                        <SectionIcon sectionColor="secondary">
                            <GroupsIcon />
                        </SectionIcon>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                Organization Departments
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {departments?.length || 0} department(s) configured for your organization
                            </Typography>
                        </Box>
                    </SectionHeader>

                    {departments && departments.length > 0 ? (
                        <DepartmentChipsContainer>
                            {departments.map((dept, index) => (
                                <Chip
                                    key={index}
                                    label={dept}
                                    color="secondary"
                                    variant="filled"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: '0.875rem'
                                    }}
                                />
                            ))}
                        </DepartmentChipsContainer>
                    ) : (
                        <Box
                            sx={{
                                textAlign: 'center',
                                py: 3,
                                backgroundColor: 'action.hover',
                                borderRadius: 2,
                                border: '2px dashed',
                                borderColor: 'divider'
                            }}
                        >
                            <Typography variant="body1" color="text.secondary" fontStyle="italic">
                                No departments have been configured yet
                            </Typography>
                        </Box>
                    )}
                </ReviewSectionCard>

                {/* Primary Administrator Section */}
                <ReviewSectionCard elevation={3}>
                    <SectionHeader>
                        <SectionIcon sectionColor="info">
                            <PersonIcon />
                        </SectionIcon>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                Primary Administrator
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Main administrative contact for your organization
                            </Typography>
                        </Box>
                    </SectionHeader>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <PersonIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Full Name
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {`${primaryAdmin?.firstName || ''} ${primaryAdmin?.lastName || ''}`.trim() || 'Not provided'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <WorkIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Job Title
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {primaryAdmin?.jobTitle || 'Not provided'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <EmailIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Email Address
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {primaryAdmin?.email || 'Not provided'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <PhoneIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Phone Number
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {primaryAdmin?.phone || 'Not provided'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>
                    </Grid>
                </ReviewSectionCard>

                {/* HR Policies Section */}
                <ReviewSectionCard elevation={3}>
                    <SectionHeader>
                        <SectionIcon sectionColor="success">
                            <PolicyIcon />
                        </SectionIcon>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                HR Policies Configuration
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Workplace policies and employee guidelines
                            </Typography>
                        </Box>
                    </SectionHeader>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <WorkIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Working Hours
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {policy?.workingHours || 'Not configured'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <PolicyIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Probation Period
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {policy?.probationPeriod || 'Not configured'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <PolicyIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        PTO Policy
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {policy?.ptoPolicy || 'Not configured'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InfoRow>
                                <InfoIcon>
                                    <PolicyIcon />
                                </InfoIcon>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Remote Work Policy
                                    </Typography>
                                    <Typography variant="body1" fontWeight={600}>
                                        {policy?.allowWorkFromHome ? 'Enabled' : 'Disabled'}
                                    </Typography>
                                </Box>
                            </InfoRow>
                        </Grid>
                    </Grid>
                </ReviewSectionCard>

                {/* Final Confirmation Section */}
                <ConfirmationSection>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <VerifiedIcon color="warning" sx={{ mt: 0.5 }} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom fontWeight={700}>
                                Final Confirmation Required
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Please confirm that you have reviewed all information above and that it is accurate. This will complete your
                                organization setup process.
                            </Typography>

                            <FormControlLabel
                                control={<Checkbox checked={verified} onChange={handleCheckbox} color="primary" size="medium" />}
                                label={
                                    <Typography variant="body1" fontWeight={600}>
                                        I have reviewed and confirm that all the above information is correct
                                    </Typography>
                                }
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    </Box>
                </ConfirmationSection>

                {/* Enhanced Navigation */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setErrorIndex(3);
                                handleBack();
                            }}
                        >
                            Back
                        </Button>
                    </AnimateButton>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            {verified ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
                                    <CheckCircleIcon fontSize="small" />
                                    Ready to complete setup
                                </Box>
                            ) : (
                                'Please confirm the information above to finish'
                            )}
                        </Typography>
                    </Box>

                    <AnimateButton>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setErrorIndex(0);
                                handleNext();
                            }}
                            disabled={!verified}
                            sx={{
                                backgroundColor: verified ? 'success.main' : undefined,
                                '&:hover': {
                                    backgroundColor: verified ? 'success.dark' : undefined
                                }
                            }}
                        >
                            {verified ? 'Complete Setup' : 'Confirm to Finish'}
                        </Button>
                    </AnimateButton>
                </Stack>
            </ReviewContainer>
        </>
    );
};

ReviewInformationForm.propTypes = {
    companyInfo: PropTypes.object,
    departments: PropTypes.array,
    primaryAdmin: PropTypes.object,
    policy: PropTypes.object,
    verified: PropTypes.bool,
    setVerified: PropTypes.func,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
    setErrorIndex: PropTypes.func
};

export default ReviewInformationForm;
