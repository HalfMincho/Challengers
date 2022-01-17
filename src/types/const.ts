export const category = [
  "건강",
  "정서",
  "생활",
  "역량",
  "자산",
  "취미",
  "그 외",
] as const;

export const mailContent = {
  mailVerification: {
    mailVerificationMailTitle: "Challengers: 회원가입을 위한 메일 인증",
    mailVerificationMailBody: (
      token: string,
    ) => `<p>안녕하세요, Challengers입니다.</p>
                              <p></p> 
                              <p>본인이 회원가입을 요청하신 것이 맞다면 다음 코드를 입력하여 회원가입을 계속 진행해주세요.</p>
                              <p>아니라면 이 메일을 무시해 주세요.</p> 
                              <p>인증코드: ${token}</p>`,
  },
};
