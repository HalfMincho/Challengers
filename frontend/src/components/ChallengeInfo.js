import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import DefaultButton from './DefaultButton';
import {
  MonetizationOn,
  ShoppingCartOutlined,
  BookmarkBorder,
  PhotoCamera,
} from '@mui/icons-material';

const Input = styled('input')({
  display: 'none',
});

const showRightSideButtons = () => {
  return (
    <CardActions>
      <Stack alignItems="center" direction="row" spacing={1}>
        <IconButton color="primary" size="large">
          <BookmarkBorder fontSize="inherit" padding="3px" />
        </IconButton>
        <IconButton color="primary" size="large">
          <ShoppingCartOutlined fontSize="inherit" padding="3px" />
        </IconButton>
        <DefaultButton color="neutral" size="small" text="문의하기" variant="outlined" />
      </Stack>
    </CardActions>
  );
};

const submitPhoto = () => {
  return (
    <CardContent sx={{ padding: '30px' }}>
      <Divider variant="middle" />
      <Typography mt={5} sx={{ fontWeight: 500, fontSize: '1.2em' }}>
        인증샷 업로드
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        margin="15px"
        spacing={0.5}
      >
        <Box>
          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton aria-label="upload picture" color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        <Box
          autoComplete="off"
          component="form"
          noValidate
          sx={{
            '& > :not(style)': { m: 1, width: '55em' },
          }}
        >
          <TextField
            color="neutral"
            fullWidth
            id="outlined-multiline-static"
            label="이번 인증은 어떠셨나요?"
            multiline
            rows={4}
          />
        </Box>
      </Stack>
    </CardContent>
  );
};

const ChallengeInfo = ({ data }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 275, marginTop: 5 }} variant="outlined">
        {data.image && (
          <CardMedia alt="챌린지 대표 이미지" component="img" height="130" image={data.image} />
        )}
        <CardContent sx={{ padding: '30px' }}>
          <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {data.start_at}부터 시작
            </Typography>
            {showRightSideButtons()}
          </Stack>
          <Typography sx={{ fontWeight: 500, fontSize: '1.5em' }}>{data.name}</Typography>
          <Stack alignItems="center" direction="row" spacing={1}>
            <DefaultButton color="neutral" size="small" text={data.auth_day} variant="outlined" />
            <DefaultButton
              color="neutral"
              size="small"
              text={data.auth_count_in_day}
              variant="outlined"
            />
            <Typography sx={{ fontSize: '0.9em' }}>
              {data.start_at}~{data.end_at}
            </Typography>
          </Stack>
          <Stack alignItems="center" direction="row" mt={1} spacing={1}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <MonetizationOn size="small" />
              <Typography sx={{ fontSize: '0.9em', fontWeight: 500 }}>참가비</Typography>
            </Stack>
            <Typography sx={{ fontSize: '0.9em' }}>총 {data.cost}원</Typography>
          </Stack>
        </CardContent>
        <CardContent sx={{ padding: '30px' }}>
          <Typography mt={2} sx={{ fontWeight: 500, fontSize: '1.2em' }}>
            인증 방법
          </Typography>
          <Typography>{data.description}</Typography>
        </CardContent>
        {submitPhoto()}
      </Card>
    </ThemeProvider>
  );
};

export default ChallengeInfo;
