import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import DefaultButton from './DefaultButton';
import { MonetizationOn, ShoppingCartOutlined, BookmarkBorder } from '@mui/icons-material';

const ChallengeInfo = ({ data }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 275, marginTop: 5 }} variant="outlined">
        {data.image && (
          <CardMedia alt="챌린지 대표 이미지" component="img" height="140" image={data.image} />
        )}
        <CardContent>
          <Stack align-items="flex-end" direction="row" justifyContent="space-between">
            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {data.start_at}부터 시작
            </Typography>
            <CardActions>
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" size="large">
                  <BookmarkBorder fontSize="inherit" padding="3px" />
                </IconButton>
                <IconButton color="primary" size="large">
                  <ShoppingCartOutlined fontSize="inherit" padding="3px" />
                </IconButton>
                <DefaultButton color="neutral" size="small" text="문의하기" variant="outlined" />
              </Stack>
            </CardActions>
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
          <Typography mt={2} sx={{ fontWeight: 500, fontSize: '1.2em' }}>
            인증 방법
          </Typography>
          <Typography>{data.description}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default ChallengeInfo;
