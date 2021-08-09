mail_verification_mail_body = "<p>안녕하세요, Challengers입니다.</p>" \
                              "<p></p>" \
                              "<p>본인이 회원가입을 요청하신 것이 맞다면 다음 링크를 눌러 회원가입을 계속 진행해주세요.</p>" \
                              "<p>아니라면 이 메일을 무시해 주세요.</p>" \
                              "<p>인증코드: {token}</p>"

password_change_mail_body = "안녕하세요, Challengers입니다.\n\n"\
                            "계정 비밀번호가 변경되었습니다.\n" \
                            "만약 본인이 요청한 것이 아니라면 메일 halfmincho.challengers@gmail.com로 문의해 주세요.\n"

password_reset_mail_body = "안녕하세요, Challengers입니다. \n\n" \
                           "계정 비밀번호가 초기화되었습니다.\n" \
                           "초기화된 비밀번호는  {new_password}  입니다.\n" \
                           "만약 본인이 요청한 것이 아니라면 메일 halfmincho.challengers@gmail.com로 문의해 주세요.\n"

id_find_mail_body = "안녕하세요, Challengers입니다. \n\n" \
                          "{name}님의 Challengers 로그인 아이디는 \n" \
                          "{id} 입니다. \n" \
                          "만약 본인이 아이디 찾기를 요청한 것이 아니라면 메일 halfmincho.challengers@gmail.com로 문의해 주세요. \n"

manager_password_mail_body = "안녕하세요, Challengers입니다. \n\n" \
                             "{name}님은 Challengers 매니저 콘솔 접근 권한을 얻었습니다.\n" \
                             "접근을 위한 아이디는 Challengers 아이디와 동일하며.\n" \
                             "접근을 위한 패스워드는 {password}로 초기 설정 되었습니다.\n" \

__all__ = ['mail_verification_mail_body', 'password_change_mail_body',
           'password_reset_mail_body', 'id_find_mail_body', 'manager_password_mail_body']
