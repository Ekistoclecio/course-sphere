'use client';
import Loading from '@/app/loading';
import { CoursesTemplate } from '@/components/templates/Courses';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { fetchCourseById } from '@/queries/course/fetch';
import { Course } from '@/schemas/course/course';
import { invalidateCoursesCache } from '@/queries/course/invalidation';

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCourseChange = (course: Course) => {
    setCourse(course);
  };

  const getCourse = async () => {
    try {
      setIsLoading(true);
      const course = await fetchCourseById(Number(id));
      invalidateCoursesCache();
      setCourse(course);
    } catch {
      router.replace('/not-found');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (isLoading || !course) {
    return <Loading />;
  }

  return <CoursesTemplate course={course!} onCourseChangeCallback={handleCourseChange} />;
}
