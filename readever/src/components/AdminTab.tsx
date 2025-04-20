'use client';

import styled from 'styled-components';
import Link from "next/link";

interface TabProps {
  active: string;
}


const Tab = styled.div`
  border-bottom: 1px solid #888;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 100%;
  width: 100%;

  li{
    display: inline-flex;
    vertical-align: top;
    position: relative;
    top: 1px;
    align-items: center;
    
    a{
      padding: 10px 20px;
      border: 1px solid transparent;
    }
    
    &.on a{
      border-radius: 10px 10px 0 0;
      border: 1px solid #888;
      background: #fff;
      border-bottom: 1px solid #fff;
    }
  }
`;



export default function AdminTab({active}): TabProps{
  return (
    <Tab>
      <li className={active === 'user' ? 'on' : ''}>
        <Link href="/admin/user">회원</Link>
      </li>
      <li className={active === 'book' ? 'on' : ''}>
        <Link href="/admin/book">지정도서</Link>
      </li>
      <li className={active === 'mission' ? 'on' : ''}>
        <Link href="/admin/mission">미션</Link>
      </li>
    </Tab>
  );
}
