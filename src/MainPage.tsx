import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from './hooks/useOnClickOutside';
import initSqlJs from "sql.js";


type Props = {
}

const MainPage = ({}:Props) => {


  const nav = useNavigate();

  return (
    <>
      <Wrapper>
        <ContentWrapper>

          <Title>Drizzle ORM + sql.js Northwind Traders example</Title>
          <LeftContent>
            <Paragraphs>
              <Paragraph>
                This is a demo of the Northwind dataset, running on{' '}
                <a href="https://github.com/sql-js/sql.js/" target={'_blank'}>SQL.js</a> + <a href="https://www.sqlite.org/index.html" target={'_blank'}>sqlite</a> in your browser
              </Paragraph>
              <Paragraph>
                Check out{' '}
                <a href="https://driz.li/sqljs" target={'_blank'}>
                 this sours code on our GitHub
                </a>
              </Paragraph>
              <Paragraph>
                This dataset was sourced from{' '}
                  northwind-SQLite3, UI design from <a href="https://northwind.d1sql.com/" target={'_blank'}>Cloudflare D1 example</a>.
              </Paragraph>
              <Paragraph>
                You can use the UI to explore Supplies, Orders, Customers,
                Employees and Products, or you can use search if you know what
                you're looking for.
              </Paragraph>
            </Paragraphs>

            <Image
              src="https://imagedelivery.net/4wj01aQOZZ0hemsvbxWAvA/763bcbcd-da6d-46ec-f5e1-70c1c1a33d00/public"
              alt="image"
            />
          </LeftContent>
        </ContentWrapper>
      </Wrapper>
      <ChooseDBWrapper>
        <ChooseDBContentWrapper>
          <InstructionWrapper>
            <InputWrapper>
              {/*<input type="file" onChange={(e) => setFile(e.target.files[0])} />*/}
            </InputWrapper>
          </InstructionWrapper>
        </ChooseDBContentWrapper>
      </ChooseDBWrapper>
    </>
  );
};

export default MainPage;

const Link = styled.span`
  color: #2f80ed;
  cursor: pointer;
`;

const Icon = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapperr = styled.div<{ active: boolean }>`
  display: flex;
  color: black;
  border: ${({ active }) =>
    active ? '2px solid cadetblue' : '2px solid rgba(156, 163, 175, 1)'};
  width: 400px;
  padding: 5px 0;
  border-radius: 0.25rem;
  margin-bottom: 12px;
`;

const Input = styled.input`
  border: none;
  padding: 5px 5px;
  font-size: 16px;
  width: 100%;

  &::placeholder {
    color: rgba(156, 163, 175, 1);
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const InfoBlockWrapper = styled.div`
  background-color: #fff;
  padding: 10px;
  position: absolute;
  top: -83px;
  cursor: default;
  left: -123px;
  z-index: 4;
  width: 320px;
  border-radius: 5px;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
`;

const SaveButtonDB = styled.button<{ active: boolean }>`
  margin-top: 4px;
  margin-left: 15px;
  background-color: ${({ active }) => (active ? '#37b737' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
`;
const SaveButtonDomain = styled.button<{ active: boolean; change?: boolean }>`
  margin-top: 4px;
  margin-left: 15px;
  background-color: ${({ active, change }) =>
    // eslint-disable-next-line no-nested-ternary
    active && !change ? '#37b737' : change ? '#bf3945' : '#fff'};
  color: ${({ active }) => (active ? '#fff' : '#000')};
`;

const ParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InstructionParagraph = styled.p``;

const InstructionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Instruction = styled.div`
  padding-top: 35px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InstructionTitle = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  font-size: 21px;
`;

const Container = styled.div``;

const InputWrapper = styled.div`
  padding-top: 15px;
  display: flex;
  //width: 300px;
  align-content: center;
`;

const Label = styled.label`
  position: absolute;
  background: #121212;
  color: #fff;
  font-family: sans-serif;
  left: 1em;
  top: 0.75em;
  cursor: text;
  transition: top 350ms ease-in, font-size 350ms ease-in;
`;

const Button = styled.button``;

const CheckBox = styled.div`
  padding-top: 5px;
`;

const Database = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 30px;

  &:nth-child(1) {
    padding-left: 0px;
  }
`;

const DatabasesWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 15px;
`;

const ChooseDBWrapper = styled.div`
  padding: 24px;
`;
const ChooseDBContentWrapper = styled.div`
  padding: 24px;
`;

const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img<{ src: string }>`
  width: 24rem;
`;

const LeftContent = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  color: black;
  padding: 24px;
`;

const ContentWrapper = styled.div`
  padding: 24px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Subtitle = styled.div`
  font-size: 18px;
  color: #9ca3af;
  padding-top: 8px;
`;

const Paragraph = styled.div`
  padding-top: 16px;
`;
