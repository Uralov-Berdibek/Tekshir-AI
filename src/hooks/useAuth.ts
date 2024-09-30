import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          router.push('/auth');
          return;
        }

        // Check user existence
        await axios.get('http://localhost:8090/user/get-me', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        router.push('/auth');
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuth;
