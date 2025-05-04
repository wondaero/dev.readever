'use client';

import styled from 'styled-components';
import Link from "next/link";

interface TabProps {
  active: string;
}

const Tab = styled.ul`
  border-bottom: 1px solid #888;
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 100%;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  border-bottom: 1px solid #888;

  li{
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    
    a{
      padding: 6px 20px;
      border: 1px solid transparent;
      border-top: 4px solid transparent;
      border-bottom: 0;
    }
    
    &.on a{
      border-radius: 10px 10px 0 0;
      border: 1px solid #888;
      background: #fff;
      border-top: 4px solid indigo;
      border-bottom: 0;
    }
  }
`;



export default function AdminTab({active}): TabProps{
  return (
    <Tab>
      <li className={active === 'read' ? 'on' : ''}>
        <Link href="/admin/read">읽음처리</Link>
      </li>
      <li className={active === 'user' ? 'on' : ''}>
        <Link href="/admin/user">회원</Link>
      </li>
      <li className={active === 'book' ? 'on' : ''}>
        <Link href="/admin/book">지정도서</Link>
      </li>
      <li className={active === 'stage' ? 'on' : ''}>
        <Link href="/admin/stage">스테이지</Link>
      </li>
    </Tab>
  );
}
