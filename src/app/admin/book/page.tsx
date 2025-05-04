'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import AdminTab from '@/components/AdminTab';
import Input1WithTitle from '@/components/Input1WithTitle';
import Link from "next/link";

import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import { BookItem } from '@/types/book';

import { getBookList } from '@/api/book';

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
            margin-right: 5px;
          }
          a{
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
          min-width: 1200px;
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


export default function adminBook() {
  const {
    data: fetchedBookList,
    isLoading: isLoadingBookList,
    error: errorBookList,
  } = useQuery<BookItem[]>({
    queryKey: ['bookList'],
    queryFn: getBookList,
  });

  const allChker = useRef(null);

  const [bookList, setBookList] = useState<(BookItem & { checked: boolean })[]>([]);

  useEffect(() => {
    if (fetchedBookList) {
      setBookList(
        fetchedBookList.map((book) => ({
          ...book,
          checked: false,
        }))
      );
    }
  }, [fetchedBookList]);

  useEffect(() => {
    const allChecked = bookList.length > 0 && bookList.every(book => book.checked);
    allChker.current.checked = allChecked;
  }, [bookList]);
  


  const toggleCheck = (id: number) => {
    setBookList((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, checked: !book.checked } : book
      )
    );
  };
  const toggleCheckAll = (e) => {
    
    setBookList((prev) => 
      prev.map((book) => ({
        ...book,
        checked: e.target.checked
      }))
    );
  };

  const delBook = () => {
    if(!bookList.some(book => book.checked)){
      alert('체크된 도서가 없습니다.');
      return;
    }

    alert();
  }

  return (
    <Main>
      <Header/>
      <div>
        <AdminTab active="book"></AdminTab>
        <div className="wrapper">
          <div className="search-field">
            <div className="search-wrapper">
              <Input1WithTitle title="서명" type="search"></Input1WithTitle>
              <Input1WithTitle title="저자" type="search"></Input1WithTitle>
              <Input1WithTitle title="출판사" type="search"></Input1WithTitle>
              <Input1WithTitle title="코드" type="search"></Input1WithTitle>
              <button>검색</button>
            </div>
          </div>
          <div className="list-field">
            <div className="list-top">
              <strong>총 <span>10</span>권</strong>
              <div>
                <button onClick={delBook}>삭제</button>
                <Link href={`/admin/book/add`}>추가</Link>
              </div>
            </div>
            <div className="table-wrapper">
              <table>
                <colgroup>
                  <col width="50"/>
                  <col width="50"/>
                  <col width="120"/>
                  <col width="40%"/>
                  <col width="30%"/>
                  <col width="30%"/>
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
                    <th>코드</th>
                    <th>서명</th>
                    <th>저자</th>
                    <th>출판사</th>
                    <th>승인</th>
                    <th>미승인</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {bookList && Array.isArray(bookList) && bookList.map((b, idx) => (
                    <tr key={b.id}>
                      <td className="txt-c">
                        <label>
                          <input type="checkbox"
                            checked={b.checked}
                            onChange={() => toggleCheck(b.id)}
                          />
                          <span></span>
                        </label>
                      </td>
                      <td className="txt-c">{ idx }</td>
                      <td className="txt-c">{ b.code }</td>
                      <td className="txt-c">
                        <Link href={`/admin/book/${b.id}`}>{b.title}</Link>
                      </td>
                      <td className="txt-c">{b.author}</td>
                      <td className="txt-c">{b.pub}</td>
                      <td className="txt-c">승인건</td>
                      <td className="txt-c"><Link href={`/admin/book/${b.id}`}>미승인건</Link></td>
                      <td className="txt-c">{ b.regDt }</td>
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
