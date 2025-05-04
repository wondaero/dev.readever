'use client';

import styled from 'styled-components';
import Link from "next/link";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 1);
  padding: 0 10px;

  h1{
    margin: 0;

    a{
      display: flex;
    }
  }

  & > div{
    display: flex;
    align-items: center;

    & > a{
      margin-right: 10px;
      cursor: pointer;
      
      @media (max-width: 768px) {
        font-size: 14px;
      }
    }
    & > a:last-of-type{
      margin-right: 0;
    }
  }
`;


export default function Header() {
  return (
      <StyledHeader>
        <h1>
          <Link href="/">
            <img src="/imgs/lib-logo.svg" alt="로고 이미지" height="38"/>
          </Link>
        </h1>
        <div>
          <Link href="/bookList">지정도서</Link>
          <Link href="/login">로그인</Link>
          <Link href="/my">내정보</Link>
          <Link href="/admin">관리</Link>
        </div>
      </StyledHeader>
  );
}
