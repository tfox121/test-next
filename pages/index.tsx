import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  return (
    <Box my={4} display="flex" justifyContent="center">
      <Button variant="contained" color="secondary" size="large" onClick={() => router.push('/crud')}>
        CRUD Test
      </Button>
    </Box>
  );
}
