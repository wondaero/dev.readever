'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import AdminTab from '@/components/AdminTab';
import Input from '@/components/atoms/Input1';

import { useQuery } from '@tanstack/react-query';

import { useState, useEffect } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

import { RankItem } from '@/types/rank';
import { getStageInfo } from '@/api/stage';
import { CSS } from '@dnd-kit/utilities';

const Main = styled.main`
  height: 100%;
  min-width: 280px;
  z-index: 1;
  display: flex;
  flex-direction: column;

  & > div {
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, .5);
    padding: 20px;
    flex: 1;
    overflow-y: auto;
    background: linear-gradient(to bottom, #fff, #ccc);

    .wrapper{
      margin-top: 20px;

      .list-field{
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #eee;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
  
        .list-top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
  
          button{
            cursor: pointer;
            background: indigo;
            color: #fff;
            display: inline-flex;
            align-items: center;
            padding: 8px 20px;
            border: 0;
            border-radius: 5px;
            font-size: 16px;
          }
        }
  
  
        .table-wrapper{
          overflow-x: auto;
        }
  
        table{
          table-layout: fixed;
          min-width: 720px;
          width: 100%;
          border-collapse: collapse;
          border-top: 1px solid #888;
          border-bottom: 1px solid #888;
    
          thead{
            border-bottom: 1px solid #888;
            background: #eeeaee;
            
            th{
              padding: 10px;
            }
          }
    
          tbody{
            tr{
              &:nth-of-type(2n){
                background: #faf7fa;
              }
              &:hover{
                color: #fff;
                background: indigo;
                a{
                  color: #fff;
                }
    
                .drag-icon{
                  &:before, &:after{
                    background: #fff;
                  }
                }
              }
              td{
                padding: 8px 10px;
    
                .drag-icon{
                  width: 24px;
                  height: 15px;
                  display: inline-flex;
                  vertical-align: middle;
                  position: relative;
                  cursor: move;
    
                  &:before, &:after{
                    position: absolute;
                    content: '';
                    height: 4px;
                    left: 0;
                    right: 0;
                    border-radius: 4px;
                    background: #000;  
                  }
                  &:before{
                    top: 0;
                  }
                  &:after{
                    bottom: 0;
                  }
                }
    
                input{
                  width: 100%;
                  border: 0;
                  border-radius: 5px;
                  border: 1px solid #ddd;
                  padding: 5px;
                  height: 36px;
                  font-size: 18px;
                }
    
                button{
                  cursor: pointer;
                  background: indianred;
                  color: #fff;
                  display: inline-flex;
                  align-items: center;
                  padding: 8px 20px;
                  border: 0;
                  border-radius: 5px;
                  font-size: 16px;
                  margin-right: 10px;
                }
              }
            }
          }
    
          .txt-c{
            text-align: center;
          }
          .txt-r{
            text-align: right;
          }
        }
      }

      .btns{
        text-align: right;
        margin-top: 10px;
        button{
          cursor: pointer;
          background: indigo;
          color: #fff;
          display: inline-flex;
          vertical-align: top;
          justify-content: center;
          align-items: center;
          jusitify-content: center;
          width: 120px;
          height: 40px;
          border: 0;
          border-radius: 5px;
          font-size: 24px;
          margin-right: 5px;
        }
      }
    }
  }
`;

// ✅ 1. 각각 드래그 가능한 아이템 컴포넌트 만들기
// function SortableItem({ id, content }: { id: string; content: string }) {
  const SortableItem = ({ id, content }: { id: string; content: string }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      userSelect: "none",
    };
  
    return (
      <tr ref={setNodeRef} style={style} {...attributes}>
        <td className="txt-c">Stage.{id}</td>
        <td>
          <input type="number" className="txt-r" value={content} onChange={() => {}} />
        </td>
        <td><input type="text" value={'메모'} onChange={() => {}} /></td>
        <td className="txt-r">
          <button>삭제</button>
          <span className="drag-icon" {...listeners}></span>
        </td>
      </tr>
    );
  };
  

export default function AdminMission() {
  const {
    data: stageInfo,
    isLoading: isLoadingStageInfo,
    error: errorStageInfo,
  } = useQuery({
    queryKey: ['getStageInfo'],
    queryFn: getStageInfo,
  });

  // 각 stage의 bookCnt 값을 관리할 상태 변수 (useState 사용)
  const [stageInfo2, setStageInfo2] = useState<{ [key: string]: number }>({});


  // useEffect(() => {
  //   if (stageInfo) {
  //     const initialValues = stageInfo.reduce((acc, item) => {
  //       acc[item.stage] = item.bookCnt;
  //       return acc;
  //     }, {} as { [key: string]: number });

  //     setInputValues(initialValues);
  //   }
  // }, [stageInfo]);


  const [items, setItems] = useState([
    { id: "1", content: "아이템 1", isDragEnabled: false },
    { id: "2", content: "아이템 2", isDragEnabled: false },
    { id: "3", content: "아이템 3", isDragEnabled: false },
  ]);

  // 드래그 종료 처리 함수
  // function handleDragEnd(event: any) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex); // 아이템 순서 변경
      });
    }
  }


  // 드래그 아이콘 클릭 시 해당 아이템만 드래그 가능하도록 설정
  const handleDragIconClick = (id: string) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isDragEnabled: !item.isDragEnabled } : item
      )
    );
  }

  

  return (
    <Main>
      <Header />
      <div>
        <AdminTab active="mission" />

        <div className="wrapper">
          <div className="list-field">
            <div className="list-top">
              <strong>총 <span>10</span> Stage</strong>
              <div>
                <button>추가</button>
              </div>
            </div>
            <div className="table-wrapper">
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                  <table>
                    <colgroup>
                      <col width="100" />
                      <col width="100" />
                      <col />
                      <col width="130" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>스테이지</th>
                        <th>독서량</th>
                        <th>메모</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <SortableItem
                          key={item.id}
                          id={item.id}
                          content={item.content}
                          isDragEnabled={item.isDragEnabled}
                          onDragIconClick={() => handleDragIconClick(item.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </SortableContext>
              </DndContext>
            </div>
          </div>
          <div className="btns">
            <button>저장</button>
          </div>
        </div>


      </div>
    </Main>
  );
}
