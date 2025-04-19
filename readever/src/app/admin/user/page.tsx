'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import Input from '@/components/atoms/Input1';
import Link from "next/link";

import { useState } from 'react';

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
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    background: linear-gradient(to bottom, #fff, #ccc);

    .tab{
      display: flex;
      align-items: center;
      list-style: none;
      border-bottom: 1px solid #888;
      margin: 0;
      padding: 0;
      margin-bottom: 20px;

      li{
        position: relative;
        top: 1px;
        display: flex;
        
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
    }
  }
`;





export default function adminUser() {
  return (
    <Main>
      <Header/>
      <div>
        <ul className="tab">
          <li className="on">
            <Link href="/admin/user">회원</Link>
          </li>
          <li>
            <Link href="/admin/book">지정도서</Link>
          </li>
          <li>
            <Link href="/admin/mission">미션</Link>
          </li>
        </ul>
        
      </div>
    </Main>
  );
}
