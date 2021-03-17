import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();

  return (
    <Box my={4} display="flex" justifyContent="center">
      {/* <Typography variant="h4" component="h1" gutterBottom>
        <div>
          Next.js example
        </div>
      </Typography> */}
      <Button variant="contained" color="secondary" size="large" onClick={() => router.push('/crud')}>
        CRUD Test
      </Button>
    </Box>
  );
}
