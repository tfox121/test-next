import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar, Button, IconButton, Toolbar,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface LayoutProps {
  children: ReactElement | ReactElement[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [session, loading] = useSession();
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => router.push('/')}>
            <svg id="logo-dark" width="140.75" height="40" viewBox="0 0 140.75 40">
              <g>
                <g>
                  <path className="logo__mark" fill="#e94848" d="M35.47,11.8V28.45a3.21,3.21,0,0,1-1.61,2.79L19.33,39.57a3.21,3.21,0,0,1-3.2,0L1.61,31.23A3.21,3.21,0,0,1,0,28.45V11.8A3.21,3.21,0,0,1,1.61,9l9-5.18a.8.8,0,0,1,1.2.7v8.33a.8.8,0,0,1-.4.7l-1.75,1A1.61,1.61,0,0,0,8.87,16v8.32a1.61,1.61,0,0,0,.81,1.39l7.26,4.17a1.61,1.61,0,0,0,1.6,0l7.27-4.17a1.61,1.61,0,0,0,.81-1.39V16a1.61,1.61,0,0,0-.81-1.39l-1.74-1a.8.8,0,0,1-.4-.7V4.54a.8.8,0,0,1,1.2-.7l9,5.17A3.21,3.21,0,0,1,35.47,11.8Z" />
                  <path className="logo__mark" fill="#e94848" d="M23.65,17.19v5.86a.8.8,0,0,1-.4.7l-5.11,2.94a.8.8,0,0,1-.8,0l-5.11-2.94a.8.8,0,0,1-.4-.7V17.19a.8.8,0,0,1,.4-.7l1.75-1a1.61,1.61,0,0,0,.81-1.39V2.38A1.61,1.61,0,0,1,15.59,1L16.94.21a1.61,1.61,0,0,1,1.6,0L19.89,1a1.61,1.61,0,0,1,.81,1.39V14.1a1.61,1.61,0,0,0,.81,1.39l1.75,1A.8.8,0,0,1,23.65,17.19Z" />
                </g>
                <path className="logo__type" fill="#0f0f0f" d="M44.35,29.44V15.29h4v1.5a3.51,3.51,0,0,1,3.42-2h.11v4.25c-2.43.06-3.34.76-3.34,2.58v7.81ZM67.83,15.29V29.44h-4V27.91c-.68,1.36-2.12,2-4.39,2-4.27,0-7.19-3.06-7.19-7.56s3-7.58,7.27-7.58c2.15,0,3.51.62,4.3,2v-1.5ZM56.51,22.36A3.52,3.52,0,0,0,60,26a3.46,3.46,0,0,0,3.54-3.62,3.54,3.54,0,1,0-7.08,0ZM84,10.56V29.44H80v-1.5a5,5,0,0,1-4.33,2c-4.13,0-7.1-3.17-7.1-7.58s3-7.53,7-7.53a5.57,5.57,0,0,1,4.19,1.67V10.56ZM72.83,22.33A3.48,3.48,0,0,0,76.39,26,3.52,3.52,0,0,0,80,22.31a3.59,3.59,0,0,0-7.19,0Zm16.58-7V29.44H85.17V15.29Zm.73,7.16a7.64,7.64,0,0,1,15.28-.08,7.64,7.64,0,0,1-15.28.08Zm4.25-.11A3.45,3.45,0,0,0,97.81,26a3.41,3.41,0,0,0,3.37-3.59,3.4,3.4,0,1,0-6.79,0Zm26.08,1.73h4.27a7.6,7.6,0,0,1-15-1.73,7.57,7.57,0,0,1,15-1.58h-4.27a3.26,3.26,0,0,0-3.08-2A3.4,3.4,0,0,0,114,22.42,3.33,3.33,0,0,0,117.35,26,3.45,3.45,0,0,0,120.47,24.06Zm5-1.61a7.64,7.64,0,0,1,15.28-.08,7.64,7.64,0,0,1-15.28.08Zm4.25-.11A3.45,3.45,0,0,0,133.14,26a3.41,3.41,0,0,0,3.37-3.59,3.4,3.4,0,1,0-6.79,0ZM87.29,10.24a2.12,2.12,0,1,0,2.12,2.12A2.12,2.12,0,0,0,87.29,10.24Zm20.33,15.27a2.12,2.12,0,1,0,2.12,2.12A2.12,2.12,0,0,0,107.62,25.52Z" />
              </g>
            </svg>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Services
          </Typography>
          {!session
            ? (
              <Button color="inherit" onClick={() => signIn()}>
                Login
              </Button>
            )
            : (
              <Button color="inherit" onClick={() => signOut()}>
                Signed in as
                {' '}
                {session.user.name}
                {' - '}
                Logout
              </Button>
            )}

        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="sm">
          {children}
        </Container>
      </main>
    </>
  );
};

export default Layout;
