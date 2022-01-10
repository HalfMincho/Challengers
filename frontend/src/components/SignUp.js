import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Stack, TextField } from '@mui/material';

// const SignUpBlock = styled.div`
// .container {
//   display: grid;
//   grid-gap: 2.5rem;
//   place-items: center;
//   margin-top: 80px;
// }
//
// .title {
//   margin-right: 325px;
// }
//
// .form {
//   display: grid;
//   grid-row-gap: 0.8rem;
// }
//
// label {
//   font-size: 15px;
// }
//
// .form > div {
//   display: grid;
//   grid-gap: 5px;
// }
//
// .input {
//   font-size: 15px;
//   border: 0.7px solid #a6a3a3;
//   border-radius: 5px;
//   padding: 10px;
//   width: 400px;
//   color: #000;
// }
//
// .inputSmall {
//   font-size: 15px;
//   border: 0.7px solid #a6a3a3;
//   border-radius: 5px;
//   padding: 10px;
//   width: 330px;
//   color: #000;
// }
//
// .errorMessage {
//   color: red;
//   font-size: 13px;
// }
//
// .noError {
//   opacity: 0;
//   font-size: 13px;
// }
//
// .doubleCheck {
//   border: 0.7px solid #3c91e6;
//   border-radius: 3px;
//   margin-left: 5px;
//   background: none;
//   font-size: 15px;
//   padding: 10px 5px;
//   color: #3c91e6;
//   cursor: pointer;
// }
//
// #buttons {
//   display: inline-block;
//   text-align: center;
// }
//
// #buttons button {
//   border: 0.7px solid #3c91e6;
//   border-radius: 3px;
//   font-size: 15px;
//   padding: 10px 40px;
//   width: 190px;
//   cursor: pointer;
// }
//
// #backButton {
//   background: none;
//   margin-right: 8px;
//   color: #3c91e6;
// }
//
// #signUpButton {
//   background: #3c91e6;
//   margin-left: 8px;
//   color: #fff;
//   box-shadow: 0 3px 7px 0 #dbdbdb;
// }
// `;

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F06694',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F06694',
  },
  '& .MuiOutlinedInput-root': {
    // '& fieldset': {
    //   borderColor: 'red',
    // },
    // '&:hover fieldset': {
    //   borderColor: 'yellow',
    // },
    '&.Mui-focused fieldset': {
      borderColor: '#F06694',
    },
  },
});

function SignUp() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiCssCssTextField-root': { m: 1 },
        // bgcolor: '#cfe8fc',
        height: '100vh',
        mx: 20,
        my: 7,
      }}
      noValidate
      autoComplete="off"
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
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={3}>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  fullWidth
                  required
                  id="standard-required"
                  label="이름"
                  autoComplete="current-password"
                  color="secondary"
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  fullWidth
                  required
                  id="standard-required"
                  label="비밀번호"
                  type="password"
                  autoComplete="current-password"
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  fullWidth
                  required
                  id="standard-required"
                  label="비밀번호 확인"
                  type="password"
                  autoComplete="current-password"
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  fullWidth
                  required
                  id="standard-required"
                  label="닉네임"
                  autoComplete="current-password"
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <CssTextField
                  fullWidth
                  required
                  id="standard-required"
                  label="이메일 인증"
                  type="password"
                  autoComplete="current-password"
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