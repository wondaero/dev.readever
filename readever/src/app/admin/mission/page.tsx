'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import AdminTab from '@/components/AdminTab';
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

  }
`;





export default function adminMission() {
  return (
    <Main>
      <Header/>
      <div>
        <AdminTab active="mission"></AdminTab>
      </div>
    </Main>
  );
}
