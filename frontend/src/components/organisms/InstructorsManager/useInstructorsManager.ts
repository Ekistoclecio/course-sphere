import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useAddInstructor } from '@/queries/course/mutation';
import { useRemoveInstructor } from '@/queries/course/mutation';
import { useCreateUser } from '@/queries/user/mutation';
import { User } from '@/schemas/user/user';
import { SignUpData } from '@/schemas/user/signup';
import { useEffect, useState } from 'react';
import { Course } from '@/schemas/course/course';
import { fetchRandomUsers } from '@/queries/user/fetch';
import { invalidateUsersCache } from '@/queries/user/invalidation';

type TabKey = 'add' | 'remove';

export const useInstructorsManager = (
  current: User[],
  onInstructorsChangeCallback: (instructors: User[]) => void,
  course: Course
) => {
  const { errorHandler } = useErrorHandler();
  const [tab, setTab] = useState<TabKey>('add');
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const { mutateAsync: addInstructor } = useAddInstructor();
  const { mutateAsync: removeInstructor } = useRemoveInstructor();
  const { mutateAsync: createUser } = useCreateUser();

  const [users, setUsers] = useState<User[] | SignUpData[]>([]);
  const [isLoadingRandomUsers, setIsLoadingRandomUsers] = useState(false);

  const handleAddInstructor = async (user: SignUpData) => {
    try {
      setLoadingKey(user.email);
      const registeredUser = await createUser(user);
      const currentInstructors = await addInstructor({
        id: course.id,
        instructorID: [registeredUser.id],
      });
      invalidateUsersCache();
      onInstructorsChangeCallback(currentInstructors.instructors);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingKey(null);
    }
  };

  const handleRemoveInstructor = async (user: User) => {
    try {
      setLoadingKey(user.email);
      const currentInstructors = await removeInstructor({
        id: course.id,
        instructorID: [user.id],
      });
      onInstructorsChangeCallback(currentInstructors.instructors);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoadingKey(null);
    }
  };

  const handleFetchRandomUsers = async () => {
    try {
      setIsLoadingRandomUsers(true);
      const users = await fetchRandomUsers(5);
      setUsers(users);
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoadingRandomUsers(false);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabKey) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (tab === 'add') {
      handleFetchRandomUsers();
    } else {
      setUsers(current);
    }
  }, [tab, current]);

  return {
    tab,
    loadingKey,
    users,
    isLoadingRandomUsers,
    handleAddInstructor,
    handleRemoveInstructor,
    handleTabChange,
  };
};
