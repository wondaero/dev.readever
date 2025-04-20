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
    }
    ul{
      margin: 0;
      padding: 0;
      padding-left: 20px;
      font-size: 18px;

      li{
        margin-bottom: 10px;

        &:last-of-type{
          margin-bottom: 0;
        }

        a{
          cursor: pointer;
        }
      }
    }
  }
`;





export default function Admin() {
  return (
    <Main>
      <Header/>
      <div>
        <div className="wrapper">
          <h2><strong>관리</strong></h2>
          <ul>
            <li>
              <Link href="/admin/read">읽음처리</Link>
            </li>
            <li>
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
        
      </div>
    </Main>
  );
}
