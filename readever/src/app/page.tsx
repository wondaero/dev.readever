'use client';

import Image from "next/image";
// import React from 'react';
import { useState, useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import Header from '@/components/Header';

import { RankItem } from '@/types/rank';

import { getRankList } from '@/api/rank';
import { getStageInfo } from '@/api/stage';


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
    background: linear-gradient(to bottom, #000, midnightblue);
  }
`;

const H2 = styled.h2`
  max-width: 640px;
  width: 100%;
  color: #fff;
  font-size: 20px;
  position: sticky;
  top: 0;
  color: #000;
  vertical-align: top;
  z-index: 2;
  margin: 0 auto 10px;
  padding-left: 20px;
  
  strong{
    border: 1px solid 000;
    box-shadow: 0 0 8px #fff;
    background: #fff;
    border-radius: 100px;
    padding: 5px 10px;
    vertical-align: top;
  }
  
`;

const Ul = styled.ul`

  --border-style: 1px solid rgba(255, 255, 255, .8);


  list-style: none;
  max-width: 640px;
  padding: 10px;
  padding-left: 50px;
  margin: 0 auto 100px;

  & > li{

    padding: 20px 0;
    border-left: var(--border-style);
    transform-origin: 0 50%;

    &:nth-of-type(2n - 1){
      transform: rotate(5deg);
    }
    &:nth-of-type(2n){
      transform: rotate(-5deg);
    }

    & > div{
      display: flex;
      align-items: center;
  
      strong{
        transform: translateX(-50%);
        height: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        background: linear-gradient(to right, #fff, transparent);
        color: #000;
        padding: 5px 10px;
        transform: translateX(-50%) rotate(-15deg);
      }
      strong.target-stage{
        box-shadow: 0 0 8px rgba(255, 255, 255, .8);
        background: #fff;
        transform: translateX(-50%) rotate(0);
        padding: 0;
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }

      ul{
        color: #fff;
        list-style: disc;
      }
    }

  } 
  
`;

const Label = styled.label`
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  height: 40px;
  width: 100px;
  border-radius: 40px;
  background: #fff;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(255, 255, 255, .9);


  input{
    display: none;
  }

  input:checked + b{
    transform: translateX(-60px);
  }
  input + b{
    width: 160px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: transform .5s;


    i{
      width: 36px;
      height: 36px;
      background: midnightblue;
      box-shadow: inset 0 0 8px rgba(255, 255, 255, 1);
      border-radius: 50%;
    }
    span{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      width: 62px;
      height: 100%;

      &:first-of-type{
        background: linear-gradient(to right, gray, #fff);
      }
      &:last-of-type{
        background: linear-gradient(to left, gray, #fff);

      }
    }


  }
`;



export default function Dashboard() {

  const [viewType, setViewType] = useState(false);

  const {
    data: stageInfo,
    isLoading: isLoadingStageInfo,
    error: errorStageInfo,
  } = useQuery({
    queryKey: ['getStageInfo'],
    queryFn: getStageInfo,
  });

  const {
    data: rankList,
    isLoading: isLoadingRankList,
    error: errorRankList,
  } = useQuery<RankItem[]>({
    queryKey: ['rankList'],
    queryFn: getRankList,
    enabled: !!stageInfo,
  });

  //가공(기능 따로 뺄 것)

  const newStage = useMemo(() => {
    if (!stageInfo || !rankList) return [];
  
    let totalCnt = 0;
    const stageWithTotal = stageInfo.map((s) => {
      totalCnt += s.bookCnt;
      return { ...s, list: [], totalCnt };
    }).reverse();

    console.log(stageWithTotal);
    console.log(rankList);
  
    rankList.forEach((itm) => {
      const targetIdx = stageWithTotal.findLastIndex((s) => itm.bookCnt <= s.totalCnt);
      if (targetIdx !== -1) {
        stageWithTotal[targetIdx].list.push(itm);
      }
    });
  
    const lastStage = stageWithTotal.findIndex((s) => s.list.length);
    console.log(stageWithTotal.filter((_, idx) => idx + 1 >= lastStage))
    return stageWithTotal.filter((_, idx) => idx + 1 >= lastStage);
  }, [stageInfo, rankList]); // ✅ 의존성 추가
  



  if (isLoadingRankList) return <p>불러오는 중...</p>;
  if (errorRankList instanceof Error) return <p>에러 발생: {errorRankList.message}</p>;

  return (
    <Main>
      <Header/>
      <div>
        {
          newStage && newStage.length && newStage.map(ns => (
            <div key={ns.stage}>
              <H2><strong>Stage. {ns.stage}</strong></H2>
              <Ul>
                {
                  ns && ns.bookCnt && Array.from({ length: ns.bookCnt }, (_, i) => i + 1).map((_, idx) => {
                    const stageIdx = ns.totalCnt - idx;
                    const userList = ns && ns.list && ns.list.filter(ns2 => ns2.bookCnt == stageIdx);
                    return (
                      <li key={idx}>
                        <div>
                          <strong className={userList.length ? 'target-stage' : ''}>{ userList.length ? stageIdx : stageIdx }</strong>
                          <ul>
                            {
                              userList.map(ns3 => (
                                <li key={ns3.id}>{ns3.name}</li>
                              )) 
                            }
                          </ul>
                        </div>
                      </li>
                    );
                  })
                }
              </Ul>
            </div>
          ))
        }
        
      </div>
      <Label>
        <input type="checkbox" />
        <b>
          <span>Stage</span>
          <i></i>
          <span>List</span>
        </b>
      </Label>
    </Main>
  );
}
