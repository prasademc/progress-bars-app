import React from "react";
import styled from "styled-components";
import { Store } from "./store";
import Progress from "./components/progressBar";

export default function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.progressBars.bars.length === 0 && fetchDdataAction();
  });

  const fetchDdataAction = async () => {
    const URL = "http://pb-api.herokuapp.com/bars";
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: "FETCH_DATA",
      payload: {
        bars: dataJSON.bars,
        buttons: dataJSON.buttons,
        limit: dataJSON.limit,
      },
    });
  };

  console.log(state);

  return (
    <Wrapper>
      <Heading>Progress Bar Demo</Heading>
      <PBContainer>
        {state.progressBars.bars &&
          state.progressBars.bars.map((bar: number, index: number) => {
            return state.selectedBar === index ? (
              <PBItem key={index}>
                <Precentage>{state.updateValue}%</Precentage>
                <Progress bar={state.updateValue} />
              </PBItem>
            ) : (
              <PBItem key={index}>
                <Precentage>{bar}%</Precentage>
                <Progress bar={bar} />
              </PBItem>
            );
          })}
      </PBContainer>
      <ControlContainer>
        <ControlItem>
          {state.progressBars.bars && (
            <SELECT
              onChange={(e) =>
                dispatch({
                  type: "SELECT_PROGRESS",
                  selectedBar: parseInt(e.currentTarget.value),
                })
              }
            >
              {state.progressBars.bars.map((bar: number, index: number) => {
                return (
                  <option key={index} value={index}>
                    Progress {index}
                  </option>
                );
              })}
            </SELECT>
          )}
        </ControlItem>
        {state.progressBars.buttons &&
          state.progressBars.buttons
            .slice(0)
            .reverse()
            .map((progressValue: number, index: number) => {
              return (
                <ControlItem key={index}>
                  {/-+/g.test(progressValue.toString()) ? (
                    <BUTTTON
                      onClick={() =>
                        dispatch({
                          type: "DECREASE",
                          updateValue: parseInt(
                            progressValue.toString().substr(1)
                          ),
                        })
                      }
                    >
                      {progressValue}
                    </BUTTTON>
                  ) : (
                    <BUTTTON
                      onClick={() =>
                        dispatch({
                          type: "INCREASE",
                          updateValue: progressValue,
                        })
                      }
                    >
                      +{progressValue}
                    </BUTTTON>
                  )}
                </ControlItem>
              );
            })}
      </ControlContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-self: center;
  width: 720px;
  height: auto;
  margin: auto;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #eeeeee;
  box-shadow: 0px 2px 2px #eeeeee;
  @media (max-width: 768px) {
    margin: auto 12px;
    padding: 12px;
    width: calc(100% - 48px);
  }
`;

const Heading = styled.h3`
  text-align: center;
  margin: 0;
  padding: 0 0 24px 0;
`;

const PBContainer = styled.ul`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const PBItem = styled.li`
  width: 100%;
  height: 40px;
  margin: 0 0 10px 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #eeeeee;
  box-shadow: 0px 1px 2px #eeeeee;
  position: relative;
  overflow: hidden;
`;

const Precentage = styled.span`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
  z-index: 1;
  color: #333333;
`;

const ControlContainer = styled.ul`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ControlItem = styled.li`
  width: auto;
  height: 40px;
  margin: 0 5px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:nth-child(1) {
    margin-left: 0;
  }
  &:nth-child(5) {
    margin-right: 0;
  }
`;

const SELECT = styled.select`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.6em 1.4em 0.5em 0.8em;
  width: 200px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
    linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;

  @media (max-width: 768px) {
    font-size: 14px;
    width: 140px;
  }

  @media (max-width: 492px) {
    font-size: 12px;
    width: 100px;
  }

  &::-ms-expand {
    display: none;
  }
  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
`;

const BUTTTON = styled.button`
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #444;
  line-height: 1.3;
  padding: 0.5em;
  width: 60px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  appearance: none;
  background-color: #fff;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
    width: 50px;
  }

  @media (max-width: 492px) {
    font-size: 12px;
    width: auto;
    padding: 0.5em 0.25em;
  }

  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
`;
