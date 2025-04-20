'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import AdminTab from '@/components/AdminTab';
import Input1WithTitle from '@/components//Input1WithTitle';
import Link from "next/link";

import { useState } from 'react';

const Main = styled.main`
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

    .wrapper{
      margin-top: 20px;

      .search-field{
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #eee;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .1);

        label{
          margin-bottom: 10px;
          strong{
            width: 60px;
            vertical-align: middle;
          }
          input{
            max-width: 320px;
          }
        }

        button{
          border: 0;
          background: indigo;
          display: flex;
          max-width: 380px;
          width: 100%;
          height: 40px;
          color: #fff;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border-radius: 5px;
        }
      }

    }

  }
`;





export default function AdminRead() {
  return (
    <Main>
      <Header/>
      <div>
        <AdminTab active="read"></AdminTab>

      </div>
    </Main>
  );
}
