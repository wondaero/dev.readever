'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import Input from '@/components/atoms/Input1';
import Input1WithTitle from '@/components/Input1WithTitle';


const Main = styled.main`
  height: 100%;
  min-width: 280px;
  z-index: 1;
  display: flex;
  flex-direction: column;

  & > div{
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, .5);
    padding-top: 50px;
    flex: 1;
    overflow-y: auto;
    background: linear-gradient(to bottom, #fff, #ccc);

    .wrapper{
      max-width: 480px;
      margin: 0 auto;
      padding: 0 10px;

      h2{
        margin-bottom: 50px;

        strong{
          display: inline-block;
          vertical-align: top;
          margin-bottom: 5px;
          position: relative;
      
          &:after{
            content: '';
            position: absolute;
            display: inline-block;
            background: linear-gradient(to left, transparent, indigo);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            opacity: .5;
            vertical-algin: top;
            transform: rotate(-5deg) scale(0.85);
          }
        }
      }

      .part-wrapper{
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);

        label{
          margin-bottom: 10px;

          &:last-of-type{
            margin-bottom: 0;
          }

          input{
            height: 42px;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            appearance: none;
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"]{
            -moz-appearance: textfield;
          }
        }

        .id-input{
          margin-bottom: 10px;

          strong{
            display: inline-flex;
            align-items: center;
            vertical-align: top;
            margin-bottom: 10px;

            button{
              background: indigo;
              color: #fff;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 0;
              margin-left: 5px;
              padding: 5px 10px;
              font-size: 14px;
              cursor: pointer;
            }
          }

          p{
            color: indigo;
            opacity: .8;
            margin: 2px 0 0;
            font-size: 12px;
            padding-left: 4px;
          }
        }
      }
  
      .sign-up-btn{
        display: flex;
        width: 100%;
        background: indigo;
        color: #fff;
        border: 0;
        border-radius: 5px;
        align-items: center;
        justify-content: center;
        height: 50px;
        font-size: 24px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
        margin-bottom: 10px;
        cursor: pointer;
      }

      a{
        color: #222;
        font-size: 18px;
      }
    }

  }
`;





export default function SignUp() {
  return (
    <Main>
      <Header/>
      <div>
        <div className="wrapper">
          <h2><strong>회원가입</strong></h2>
          <div className="part-wrapper">
            <div className="id-input">
              <div>
                <strong>
                  <span>아이디</span>
                  <button>중복 확인</button>
                </strong>
                <Input type="text" placeholder="아이디를 입력해주세요." />
                <p>6 ~ 20자 이내</p>
              </div>
            </div>
            <Input1WithTitle
              title="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
            <Input1WithTitle
              title="비밀번호 확인"
              type="password"
              placeholder="위와 동일한 비밀번호를 입력해주세요."
            />
          </div>
          <div className="part-wrapper">
            <Input1WithTitle
              title="이름"
              type="text"
              placeholder="이름을 입력해주세요."
            />
            <Input1WithTitle
              title="생년월일"
              type="date"
              placeholder="생년월일을 입력해주세요."
            />
            <Input1WithTitle
              title="연락처"
              type="tel"
              placeholder="연락처를 입력해주세요."
              tip="'-' 제외"
            />
          </div>
          <button className="sign-up-btn">가입</button>
        </div>
        
      </div>
    </Main>
  );
}
