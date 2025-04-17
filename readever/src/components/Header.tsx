'use client';

import Image from "next/image";
import styled from 'styled-components';
import Link from "next/link";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 1);
  background: linen;
  padding: 0 10px;

  h1{
    margin: 0;
  }

  & > div{
    display: flex;
    align-items: center;

    & > a{
      margin-right: 5px;
      cursor: pointer;
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
          그루터기 로고
        </h1>
        <div>
          <Link href="/bookList">지정도서</Link>
          <Link href="/login">로그인</Link>
          <Link href="/my">내정보</Link>
        </div>
      </StyledHeader>
  );
}
