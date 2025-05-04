'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import AdminTab from '@/components/AdminTab';
import Input1WithTitle from '@/components/Input1WithTitle';
import Link from "next/link";

import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { UserItem } from '@/types/user';

import { getUserList } from '@/api/user';
import { getStageInfo } from '@/api/stage';

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
    
    @media(max-width: 480px){
      padding: 10px;
    }

    .wrapper{
      margin-top: 20px;

      .search-field{
        background: #fff;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #eee;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
        margin-bottom: 10px;

        .search-wrapper{
          max-width: 320px;
        }

        label{
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          strong{
            width: 60px;
          }
          input{
            width: 100%;
            flex: 1;
          }
        }

        button{
          border: 0;
          background: indigo;
          display: flex;
          width: 100%;
          height: 40px;
          color: #fff;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border-radius: 5px;
        }
      }

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
            background: indianred;
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
          min-width: 960px;
          width: 100%;
          border-collapse: collapse;
          border-top: 1px solid #888;
          border-bottom: 1px solid #888;

          label{
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            input{
              display: none;
            }

            span{
              border: 1px solid #888;
              background: #fff;
              display: inline-block;
              vertical-align: top;
              width: 24px;
              height: 24px;
              border-radius: 5px;
              position: relative;

              &:after{
                content: '';
                position: absolute;
                display: inline-block;
                vertical-align: top;
                width: 15px;
                height: 5px;
                border: 3px solid indigo;
                border-top: 0;
                border-right: 0;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -12px) rotate(-45deg);
                opacity: 0;
                transition: opacity .3s, transform .3s;
              }
            }
            
            input:checked + span:after{
              opacity: 1;
              transform: translate(-50%, -6px) rotate(-45deg);
            }
          }

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
              }
              td{
                padding: 8px 0;
                a{
                  color: indigo;
                }

              }
            }
          }

          .txt-c{
            text-align: center;
          }
        }


      }
    }

  }
`;


export default function adminUser() {
  const {
    data: stageInfo,
    isLoading: isLoadingStageInfo,
    error: errorStageInfo,
  } = useQuery({
    queryKey: ['getStageInfo'],
    queryFn: getStageInfo,
  });

  const {
    data: fetchedUserList,
    isLoading: isLoadingUserList,
    error: errorUserList,
  } = useQuery<UserItem[]>({
    queryKey: ['userList'],
    queryFn: getUserList,
    enabled: !!stageInfo,
  });

  const allChker = useRef(null);

  const [userList, setUserList] = useState<(UserItem & { checked: boolean })[]>([]);

  useEffect(() => {
    if (fetchedUserList) {
      setUserList(
        fetchedUserList.map((user) => ({
          ...user,
          checked: false,
        }))
      );
    }
  }, [fetchedUserList]);

  useEffect(() => {
    const allChecked = userList.length > 0 && userList.every(user => user.checked);
    allChker.current.checked = allChecked;
  }, [userList]);
  


  const toggleCheck = (id: number) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, checked: !user.checked } : user
      )
    );
  };
  const toggleCheckAll = (e) => {
    
    setUserList((prev) => 
      prev.map((user) => ({
        ...user,
        checked: e.target.checked
      }))
    );
  };

  const delUser = () => {
    if(!userList.some(user => user.checked)){
      alert('체크된 유저가 없습니다.');
      return;
    }

    alert();
  }


  return (
    <Main>
      <Header/>
      <div>
        <AdminTab active="user"></AdminTab>
        <div className="wrapper">
          <div className="search-field">
            <div className="search-wrapper">
              <Input1WithTitle title="이름" type="search"></Input1WithTitle>
              <Input1WithTitle title="연락처" type="search"></Input1WithTitle>
              <Input1WithTitle title="아이디" type="search"></Input1WithTitle>
              <button>검색</button>
            </div>
          </div>
          <div className="list-field">
            <div className="list-top">
              <strong>총 <span>10</span>명</strong>
              <div>
                <button onClick={delUser}>삭제</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table>
                <colgroup>
                  <col width="50"/>
                  <col width="50"/>
                  <col width="80"/>
                  <col />
                  <col width="150"/>
                  <col width="80"/>
                  <col width="80"/>
                  <col width="100"/>
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          ref={allChker}
                          onChange={toggleCheckAll}
                        />
                        <span></span>
                    </label>
                    </th>
                    <th>No.</th>
                    <th>이름</th>
                    <th>아이디</th>
                    <th>연락처</th>
                    <th>읽은 책</th>
                    <th>권한</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {userList && Array.isArray(userList) && userList.map((u, idx) => (
                    <tr key={u.id}>
                      <td className="txt-c">
                        <label>
                          <input type="checkbox"
                            checked={u.checked}
                            onChange={() => toggleCheck(u.id)}
                          />
                          <span></span>
                          </label>
                        </td>
                      <td className="txt-c">{ idx }</td>
                      <td className="txt-c">
                        <Link href={`/admin/user/${u.id}`}>{u.name}</Link>
                      </td>
                      <td className="txt-c">{ u.id }</td>
                      <td className="txt-c">{ u.phone }</td>
                      <td className="txt-c">{ u.bookCnt }</td>
                      <td className="txt-c">일반유저</td>
                      <td className="txt-c">{ u.regDt }</td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <div className="pagination"></div>
          </div>
        </div>

      </div>
    </Main>
  );
}
