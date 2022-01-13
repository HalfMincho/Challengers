import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack, TextField } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F06694',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F06694',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#F06694',
    },
  },
});

function SignUp() {
  return (
    <Box
      autoComplete="off"
      component="form"
      noValidate
      sx={{
        '& .MuiCssCssTextField-root': { m: 1 },
        height: '100vh',
        mx: 20,
        my: 7,
      }}
    >
      <Container maxWidth="xs">
        <Grid container direction="column" justifyContent="center">
          <Grid item xs={12}>
            <Box
              sx={{
                fontWeight: 600,
                fontSize: 'h6.fontSize',
                letterSpacing: -1,
                color: '#343a40',
                mb: 3,
              }}
            >
              회원가입
            </Box>
            <Stack alignItems="center" direction="column" justifyContent="center" spacing={3}>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  autoComplete="current-password"
                  color="secondary"
                  fullWidth
                  id="standard-required"
                  label="이름"
                  required
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  autoComplete="current-password"
                  fullWidth
                  id="standard-required"
                  label="비밀번호"
                  required
                  type="password"
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  autoComplete="current-password"
                  fullWidth
                  id="standard-required"
                  label="비밀번호 확인"
                  required
                  type="password"
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  autoComplete="current-password"
                  fullWidth
                  id="standard-required"
                  label="닉네임"
                  required
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  autoComplete="current-password"
                  fullWidth
                  id="standard-required"
                  label="이메일 인증"
                  required
                  type="password"
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SignUp;
