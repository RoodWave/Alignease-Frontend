import { Box, Grid, IconButton, Typography } from '@mui/material'
import Review from './Review'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import profile1 from '../assets/reviewProfiles/profile1.png';
import profile2 from '../assets/reviewProfiles/profile2.png';
import profile3 from '../assets/reviewProfiles/profile3.png';

const Reviews = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            <Typography sx={{
                fontSize: 50,
                fontWeight: 600,
                mt: 10,
                textTransform: 'uppercase',
            }}>
                What our Clients Say
            </Typography>
            <Typography sx={{
                fontSize: 16,
                fontWeight: 500,
                color: '#757575',
                mb: 3,
                textAlign: 'center',
            }}>
                Here’s what our clients have to say about their experience with RoodWave
            </Typography>
            <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} my={8} >
                <Grid item md={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'} >
                    <IconButton sx={{
                        bgcolor: '#EBEBEB',
                        ":hover": {
                            bgcolor: '#0055FF',
                            opacity: '60%',
                            color: '#FFFFFF',
                        },
                        ":focus": {
                            outline: 'none',
                        }
                    }} >
                        <ArrowBackRoundedIcon />
                    </IconButton>
                </Grid>
                {reviews.map((review) => (
                    <Grid key={review.id} item md={3.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        <Review review={review} />
                    </Grid>
                ))}
                <Grid item md={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <IconButton sx={{
                        bgcolor: '#EBEBEB',
                        ":hover": {
                            bgcolor: '#0055FF',
                            opacity: '60%',
                            color: '#FFFFFF',
                        },
                        ":focus": {
                            outline: 'none',
                        }
                    }}>
                        <ArrowForwardRoundedIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Reviews

const reviews = [
    {
        id: 1,
        name: 'carla',
        image: profile1,
        rating: 4,
        comment: 'Great experience! The layout was clear, and the whole process was effortless. I really appreciated the attention to design and usability'
    },
    {
        id: 2,
        name: 'carla',
        image: profile2,
        rating: 5,
        comment: 'Impressed with the user-friendly interface. Navigation was intuitive, and everything felt organized and aligned perfectly. Booking took less than a minute!'
    },
    {
        id: 3,
        name: 'carla',
        image: profile3,
        rating: 5,
        comment: 'Great experience! The layout was clear, and the whole process was effortless. I really appreciated the attention to design and usability'
    },
]