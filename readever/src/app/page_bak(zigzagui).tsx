'use client';

import Image from "next/image";
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import styled from 'styled-components';
import Header from '@/components/Header';

import { RankItem } from '@/types/rank';

import { getRankList } from '@/api/rank';
import { getStageInfo } from '@/api/stage';


const Main = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 280px;
  z-index: 1;
  display: flex;
  flex-direction: column;

  & > div{
    flex: 1;
    overflow-y: auto;
    background: linear-gradient(to bottom, #fff, #cbebd3);
  }
`;


const Ul = styled.ul`

  --border-style: 1px dashed rgba(0, 0, 0, .2);


  list-style: none;
  max-width: 640px;
  padding: 10px;
  margin: 0 auto;

  & > li{

    & > div{
      display: flex;
      align-items: center;
  
      strong{
        padding: 10px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 2px rgba(0, 0, 0, .2);
      }

      ul{
        list-style: none;
      }
    }

    &:last-of-type:after{
      border-bottom: var(--border-style);
    }
  } 
  & > li:nth-of-type(2n - 1){
    // position: relative;
    // top: -1px;

    & > div{
      justify-content: flex-start;
      border-left: var(--border-style);
      margin-left: 50px;

      & > strong{
        position: relative;
        left: -25px;
      }
    }
    
    &:before{
      content: '';
      display: block;
      border-radius: 30px 0 0 0;
      height: 30px;
      border-left: var(--border-style);
      border-top: var(--border-style);
      margin: 0 50px;
      margin-right: 75px;
    } 
    &:after{
      content: '';
      display: block;
      border-radius: 0 0 0 30px;
      height: 30px;
      // border-bottom: var(--border-style);
      border-left: var(--border-style);
      margin: 0 50px;
      margin-right: 75px;
    }
    & > ul{
      border-radius: 5px;
      border: var(--border-style);
      padding: 10px;
    }
  }
  
  & > li:nth-of-type(2n){
    & > div{
      justify-content: flex-end;
      border-right: var(--border-style);
      margin-right: 50px;

      & > strong{
        order: 1;
        position: relative;
        left: 25px;
      }
      & > ul{
        order: 0;
      }
    }
    &:before{
      content: '';
      display: block;
      border-radius: 0 30px 0 0;
      height: 30px;
      margin: 0 50px;
      margin-left: 75px;
      border-top: var(--border-style);
      border-right: var(--border-style);
    } 
    &:after{
      content: '';
      display: block;
      border-radius: 0 0 30px 0;
      height: 30px;
      margin: 0 50px;
      margin-left: 75px;
      // border-bottom: var(--border-style);
      border-right: var(--border-style);
    }
     & > ul{
      border-radius: 5px;
      border: var(--border-style);
      padding: 10px;
     }
  }
`;

const Label = styled.label`
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  height: 50px;
  width: 120px;
  paddding: 5px;
  border-radius: 50px;
  background: #fff;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .5);

  input{
    display: none;
  }

  input:checked + b{
    transform: translateX(-60px);
  }
  input + b{
    width: 180px;
    height: 100%;
    display: flex;
    align-items: center;
    transition: transform .5s;


    i{
      width: 40px;
      height: 40px;
      background: green;
      border-radius: 50%;
    }
    span{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      width: 70px;
      height: 100%;
      background: red;

      &:first-of-type{
        background: linear-gradient(to right, green, #fff);
      }
      &:last-of-type{
        background: linear-gradient(to left, green, #fff);

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
            <Ul key={ns.stage}>
              {
                ns && ns.bookCnt && Array.from({ length: ns.bookCnt }, (_, i) => i + 1).map((_, idx) => (
                  <li key={idx}>
                    <div>
                      <strong>{ ns.totalCnt - idx }</strong>
                      <ul>
                        {
                          ns && ns.list && ns.list.filter(ns2 => ns2.bookCnt == (ns.totalCnt - idx)).map(ns3 => (
                            <li key={ns3.id}>{ns3.name}</li>
                          )) 
                        }
                      </ul>
                    </div>
                  </li>
                ))
              }
            </Ul>
          )
        )
        }
        
        {/* <Ul>
          <li>
            <div>
              <strong></strong>
              <ul>
                <li>원대로1</li>
                <li>원대로2</li>
                <li>원대로3</li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <strong></strong>
              <ul>
                <li>원대로1</li>
                <li>원대로2</li>
                <li>원대로3</li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <strong></strong>
              <ul>
                <li>원대로1</li>
                <li>원대로1</li>
                <li>원대로1</li>
                <li>원대로1</li>
                <li>원대로1</li>
                <li>원대로1</li>
                <li>원대로2</li>
                <li>원대로3</li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <strong></strong>
              <ul>
                <li>원대로1</li>
                <li>원대로2</li>
                <li>원대로3</li>
              </ul>
            </div>
          </li>
          <li>
            <div>
              <strong></strong>
              <ul>
              </ul>
            </div>
          </li>
        </Ul> */}
      </div>
      <Label>
        <input type="checkbox" />
        <b>
          <span>시각화</span>
          <i></i>
          <span>리스트화</span>
        </b>
      </Label>
    </Main>
  );
}
