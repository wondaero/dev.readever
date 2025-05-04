'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import Input from '@/components/atoms/Input1';
import Link from "next/link";


const Main = styled.main`
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
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

      input{
        margin-bottom: 10px;
        display: block;
      }
  
      button{
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





export default function login() {
  return (
    <Main>
      <Header/>
      <div>
        <div className="wrapper">
          <h2><strong>로그인</strong></h2>
          <Input type="text" placeholder="ID를 입력해주세요." />
          <Input type="password" placeholder="패스워드를 입력해주세요." />
          <button>로그인</button>
          <div>
            <Link href="/signUp">회원가입</Link>
          </div>
        </div>
        
      </div>
    </Main>
  );
}
