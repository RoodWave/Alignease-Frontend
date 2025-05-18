import { Avatar, Box, Rating, Typography } from '@mui/material'

const Review = ({review}) => {
    const { image, rating, comment } = review

    return (
        <Box sx={{
            width: 354,
            height: 152,
            bgcolor: '#EBEBEB',
            borderRadius: '10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Avatar src={image} alt={'image'} sx={{
                width: 80,
                height: 80,
                position: 'absolute',
                top: -40,
                left: 15,
            }} />
            <Rating
                value={rating}
                readOnly
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                }} />
            <Typography sx={{
                fontSize: 10,
                fontWeight: 500,
                color: '#757575',
                width: 297,
                height: 75,
                overflow: 'auto',
                scrollbarWidth: 'none',
                mt: 5,
                textAlign: 'center',
            }}>
                {comment}
            </Typography>
        </Box>
    )
}

export default Review