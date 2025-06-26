'use client';

import { Box, Typography, Grid } from '@mui/material';
import { CourseCard } from '@/components/molecules/CourseCard';
import { Button } from '@/components/atoms/Button';
import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@/components/atoms/Pagination';
import { Feedback } from '@/components/molecules/Feedback';
import { CreateCourseModal } from '@/components/organisms/CreateCourseModal';
import { useDashboard } from '@/components/templates/Dashboard/useDashboard';

export const DashboardTemplate = () => {
  const {
    isCreateCourseModalOpen,
    isLoadingCourses,
    courses,
    totalPages,
    page,
    setIsCreateCourseModalOpen,
    handleDeleteCourseCallback,
    handleInstructorsChangeCallback,
    handleEditCourseCallback,
    handleCreateCourseCallback,
    goToPage,
  } = useDashboard();

  return (
    <>
      <Box display="flex" flexDirection="column" mx="auto" height="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h3" color="primary">
            Meus cursos
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateCourseModalOpen(true)}
          >
            Adicionar curso
          </Button>
        </Box>
        {courses?.length === 0 && !isLoadingCourses && (
          <Feedback
            image={<img src={'/empty.svg'} alt="Nenhum curso encontrado" />}
            title="Nenhum curso encontrado"
            description="Atualmente você não possui nenhum curso cadastrado, clique no botão acima para adicionar um novo curso."
          />
        )}
        <Box flex="1" maxHeight="725px" overflow="auto" pr={2}>
          <Grid container spacing={3}>
            {courses?.map((course) => (
              <Grid
                key={course.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                display="flex"
                justifyContent="center"
              >
                <CourseCard
                  course={course}
                  onInstructorsChangeCallback={handleInstructorsChangeCallback}
                  onDeleteCallback={handleDeleteCourseCallback}
                  onEditCallback={handleEditCourseCallback}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, page) => {
                goToPage(page);
              }}
            />
          </Box>
        )}
      </Box>
      <CreateCourseModal
        open={isCreateCourseModalOpen}
        onClose={() => setIsCreateCourseModalOpen(false)}
        onCreateSuccessCallback={handleCreateCourseCallback}
      />
    </>
  );
};
