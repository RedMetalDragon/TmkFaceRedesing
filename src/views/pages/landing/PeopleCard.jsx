import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// project import
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

// ==============================|| PEOPLE CARD ||============================== //

const PeopleCard = ({ id, name, image, tag, content, view }) => {
    const theme = useTheme();
    const color = ['primary', 'secondary', 'success', 'info', 'error', 'warning'];

    return (
        <SubCard
            sx={{
                bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'background.default',
                cursor: 'pointer',
                '&:hover': {
                    transform: 'scale3d(1.02, 1.02, 1)',
                    transition: 'all .4s ease-in-out'
                },
                opacity: view
            }}
        >
            <Stack spacing={2.5}>
                <Stack direction="row" spacing={2.5} alignItems="center">
                    {image !== '' && (
                        <Avatar
                            src={image && getImageUrl(`testaments/${image}`, ImagePath.LANDING)}
                            alt="user image"
                            sx={{ height: 40, width: 40, bgcolor: 'transparent' }}
                        />
                    )}
                    {image === '' && (
                        <Avatar
                            color={color[Math.floor(Math.random() * (5 - 0 + 1) + 0)]}
                            src={image && getImageUrl(`testaments/${image}`, ImagePath.LANDING)}
                            sx={{ height: 40, width: 40 }}
                            alt="user images"
                        >
                            {name.slice(0, 1)}
                        </Avatar>
                    )}
                    <Stack key={id} spacing={0}>
                        <Typography variant="h4" sx={{ fontWeight: 500 }}>
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: theme.palette.primary.main }}>
                            {tag}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant="body1" sx={{maxHeight: '3.25rem', overflowY: 'auto'}}>{content}</Typography>
            </Stack>
        </SubCard>
    );
};

PeopleCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    tag: PropTypes.string,
    content: PropTypes.string,
    view: PropTypes.number
};

export default PeopleCard;
