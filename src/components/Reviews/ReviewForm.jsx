import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { postReview } from '../../helpers/reviewsHelpers';
import PropTypes from 'prop-types';
import RatingStarsSelector from './RatingStarsSelector';
import { useI18n } from '../../context/I18nContext';

const ReviewForm = ({
  productId,
  alreadyReviewed,
  setnewReviewCount,
  username,
}) => {
  const { t } = useI18n();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReviewSubmit = async () => {
    setIsLoading(true);
    try {
      await postReview({ productId, rating, comment });
      setRating(1);
      setComment('');
      setIsLoading(true);
      setnewReviewCount((prev) => prev + 1);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (alreadyReviewed) {
    return (
      <Box
        sx={{
          margin: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign={'center'}>
          {t('gracias-opinion', { username })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        margin: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign={'center'}>
        {t('danos-tu-opinion')}
      </Typography>
      <RatingStarsSelector setSelectedRating={setRating} />
      <TextField
        label={t('escribir-comentario')}
        multiline
        rows={4}
        value={comment}
        sx={{ minWidth: '250px', width: '100%', backgroundColor: '#f4f4f4' }}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={handleReviewSubmit}
        variant="contained"
        disabled={isLoading || comment.length === 0}
      >
        {t('enviar')}
      </Button>
    </Box>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  alreadyReviewed: PropTypes.bool.isRequired,
  setnewReviewCount: PropTypes.func.isRequired,
};

export default ReviewForm;
