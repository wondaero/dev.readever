'use client';

import { useParams } from 'next/navigation';
import styled from 'styled-components';
import Header from '@/components/Header';
import Input1WithTitle from '@/components/Input1WithTitle';


const Main = styled.main`
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

      .part-wrapper{
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);

        label{
          margin-bottom: 10px;

          &:last-of-type{
            margin-bottom: 0;
          }

          input{
            height: 42px;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            appearance: none;
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"]{
            -moz-appearance: textfield;
          }
        }

        .comments-field{

          margin-top: 10px;

          strong{
            display: inline-flex;
            align-items: center;
            vertical-align: top;
            margin-bottom: 10px;
          }

          textarea{
            width: 100%;
            border-radius: 6px;
            background: #fff;
            min-height: 200px;
            border: 1px solid #ccc;
            transition: border-color .3s;
            padding: 10px 14px;
            font-size: 14px;
            resize: none;

            &:focus {
              outline: none;
              border-color: #0070f3;
            }
          }

          p{
            color: indigo;
            opacity: .8;
            margin: 2px 0 0;
            font-size: 12px;
            padding-left: 4px;
          }
        }
      }
  

      .mod-btns{
        display: flex;
        button{
          display: flex;
          width: 50%;
          background: indianred;
          color: #fff;
          border: 0;
          border-radius: 5px;
          align-items: center;
          justify-content: center;
          height: 50px;
          font-size: 24px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
          cursor: pointer;
          margin-right: 10px;
          
          &:last-of-type{
            background: indigo;
            margin-right: 0;
          }
        }
      }
      .add-btns{
        display: flex;
        button{
          display: flex;
          width: 100%;
          color: #fff;
          border: 0;
          border-radius: 5px;
          align-items: center;
          justify-content: center;
          height: 50px;
          font-size: 24px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
          cursor: pointer;
          background: indigo;
        }
      }
    }

  }
`;





export default function adminBookDetail() {

  const params = useParams();
  const id = params?.id;

  const isAdd = id === 'add';

  return (
    <Main>
      <Header/>
      <div>
        <div className="wrapper">
          <h2><strong>{isAdd ? '도서추가' : '도서상세'}</strong></h2>
          <div className="part-wrapper">
            <Input1WithTitle
              title="코드"
              type="search"
              placeholder="코드를 입력해주세요."
              tip="코드가 있을 경우 입력해주세요."
            />
            <Input1WithTitle
              title="* 서명"
              type="search"
              placeholder="서명을 입력해주세요."
            />
            <Input1WithTitle
              title="저자"
              type="search"
              placeholder="저자를 입력해주세요."
            />
            <Input1WithTitle
              title="출판사"
              type="search"
              placeholder="출판사를 입력해주세요."
            />
            <div className="comments-field">
              <div>
                <strong>비고</strong>
                <textarea></textarea>
              </div>
            </div>
          </div>
          <div>

          <div>
            {
              isAdd ? (
                <div className="add-btns">
                  <button>추가</button>
                </div>
              ) : (
                <div className="mod-btns">
                  <button>삭제</button>
                  <button>수정</button>
                </div>
              )
            }
          </div>

          
          </div>
        </div>
        
      </div>
    </Main>
  );
}
