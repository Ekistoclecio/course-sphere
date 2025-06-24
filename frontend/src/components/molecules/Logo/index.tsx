import Image from 'next/image';
import { Stack, Typography } from '@mui/material';

export interface LogoInterface {
  direction?: 'row' | 'column';
}

export const Logo = ({ direction = 'row' }: LogoInterface) => {
  return (
    <Stack direction={direction} alignItems="center">
      <Image
        src="/logo.png"
        alt="CourseSphere Logo"
        width={48}
        height={48}
        style={{ objectFit: 'contain' }}
      />
      <Typography variant="h3" component="h1" color="primary.main">
        CourseSphere
      </Typography>
    </Stack>
  );
};
