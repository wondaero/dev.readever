'use client';

import styled from 'styled-components';
import Input from '@/components/atoms/Input1';

interface Input1WithTitleProps {
  title: string;
  tip?: string | number;
  [key: string]: any; // 나머지 props도 받을 수 있도록
}

const StyledLabel = styled.label`
  display: block;

  strong{
    display: inline-block;
    vertical-align: top;
    margin-bottom: 5px;
  }
  
  p{
    color: indigo;
    opacity: .8;
    margin: 2px 0 0;
    font-size: 12px;
    padding-left: 4px;
  }
`;


export default function Input1WithTitle({title, tip, ...inputProps}: Input1WithTitleProps) {
  return (
      <StyledLabel>
        <strong>{title}</strong>
        <Input {...inputProps}/>
        {
          tip !== undefined && <p>{tip}</p>
        }
      </StyledLabel>
  );
}
