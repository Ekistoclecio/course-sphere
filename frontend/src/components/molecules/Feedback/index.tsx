'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';

interface FeedbackProps {
  image: React.ReactNode;
  title: string;
  description?: string;
}

export const Feedback: React.FC<FeedbackProps> = ({ image, title, description }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      width="100%"
      height="100%"
      p={2}
    >
      <Box
        sx={{
          width: { xs: '300px', sm: '400px', md: '450px' },
          maxWidth: '100%',
          mb: 2,
          '& svg, & img': {
            width: '100%',
            height: 'auto',
          },
        }}
      >
        {image}
      </Box>

      <Typography variant="h4" gutterBottom color="text.disabled">
        {title}
      </Typography>

      {description && (
        <Typography variant="subtitle1" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
};
