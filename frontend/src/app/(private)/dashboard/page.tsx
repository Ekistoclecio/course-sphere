'use client';

import { DashboardTemplate } from '@/components/templates/Dashboard';
import { Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box component="main" flexGrow={1} paddingX={4} paddingY={3} overflow="hidden">
      <DashboardTemplate />
    </Box>
  );
}
