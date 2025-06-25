import { useMutation } from '@/queries/adapters';
import { UpdateCourseData } from '@/schemas/course/updateCourse';
import { CourseModel } from '@/models/course';

export const useCreateCourse = () => {
  return useMutation(CourseModel.create);
};

export const useUpdateCourse = () => {
  return useMutation(({ id, course }: { id: number; course: UpdateCourseData }) =>
    CourseModel.update(course, id)
  );
};

export const useDeleteCourse = () => {
  return useMutation(CourseModel.remove);
};

export const useAddInstructor = () => {
  return useMutation(({ id, instructorID }: { id: number; instructorID: number }) =>
    CourseModel.addInstructor(id, instructorID)
  );
};

export const useRemoveInstructor = () => {
  return useMutation(({ id, instructorID }: { id: number; instructorID: number }) =>
    CourseModel.removeInstructor(id, instructorID)
  );
};
