'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
    >
      <img
        src="/404.svg"
        alt="Página não encontrada"
        width={300}
        height={300}
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <Typography variant="h3" mt={4} color="primary">
        Página não encontrada
      </Typography>

      <Typography variant="body1" mt={2} color="text.secondary" maxWidth={400}>
        A página que você está procurando pode ter sido removida, renomeada ou está temporariamente
        indisponível.
      </Typography>

      <Button component={Link} href="/dashboard" variant="contained" color="primary" sx={{ mt: 4 }}>
        Voltar ao início
      </Button>
    </Box>
  );
}
