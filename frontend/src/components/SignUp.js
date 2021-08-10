import { Link } from "react-router-dom";
import { useSignUp } from "./useSignUp";

function SignUp() {
  const { name, password, passwordConfirm, nickname, email,
    emailError, passwordError, passwordLengthError, 
    onChange, onChangeEmail, onChangePassword, onChangePasswordCheck
  } = useSignUp();

  return (
    <>
      <div className="container">
        <h2 className="title">회원가입</h2>
        <form onSubmit={onSubmit} className="form" action="index.html">
          <div>
            <label htmlFor="user-email">이메일</label>
            <div>
              <input
                className="inputSmall"
                placeholder="이메일 주소"
                name="user-email"
                value={email}
                required
                onChange={onChange}
                onChangeEmail={onChangeEmail}
              />
              <button className="doubleCheck" onClick={}>
                중복확인
              </button>
              {emailError ? (
                <div className="errorMessage">
                  올바르지 않은 이메일 형식입니다.
                </div>
              ) : (
                <div className="noError">no error</div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <input
              className="input"
              type="password"
              placeholder="비밀번호"
              name="user-password"
              value={password}
              required
              onChange={onChangePassword}
            />
            {passwordLengthError ? (
              <div className="errorMessage">
                비밀번호는 8자 이상이어야 합니다.
              </div>
            ) : (
              <div className={"noError"}>no error</div>
            )}
          </div>
          <div>
            <label htmlFor="user-password-check">비밀번호 확인</label>
            <input
              className={"input"}
              type="password"
              placeholder="비밀번호 확인"
              name="user-password-check"
              value={passwordConfirm}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError ? (
              <div className="errorMessage">
                비밀번호가 일치하지 않습니다.
              </div>
            ) : (
              <div className="noError">no error</div>
            )}
          </div>
          <div>
            <label htmlFor="user-name">이름</label>
            <input
              className={"input"}
              placeholder="이름(본명)"
              name="user-name"
              value={name}
              required
              onChange={onChangeName}
            />
            <div className="noError">no error</div>
          </div>
          <div>
            <label htmlFor="user-nickname">닉네임</label>
            <div>
              <input
                className="inputSmall"
                placeholder="닉네임(별명)"
                name="user-nickname"
                value={nickname}
                required
                onChange={onChangeNickname}
              />
              <button className="doubleCheck">중복확인</button>
              <div className={noError}>no error</div>
            </div>
          </div>
          <div id="buttons">
            <Link to="/">
              <button id="backButton">돌아가기</button>
            </Link>
            <button
              id="signUpButton"
              htmltype="submt"
              onSubmit={onSubmit}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;