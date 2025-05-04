'use client';

import styled from 'styled-components';
import Header from '@/components/Header';


const BookList = styled.ul`
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





export default function Booklist2() {
  return (
    <>
        <Header/>
        <BookList>
            <li>안녕</li>
            <li>안녕</li>
            <li>안녕</li>
            <li>안녕</li>
        </BookList>
    </>
  );
}
