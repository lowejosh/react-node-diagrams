import React, { createContext, useReducer, useMemo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ width?: number | string; height?: number | string }>(({ width, height }) => ({
  position: 'relative',
  backgroundColor: "lightgrey",
  width: width || '100%',
  height: height || '100%',
  overflow: "hidden"
}));

export interface DiagramProps {
  width?: number | string;
  height?: number | string;
}

export const diagramReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FIELD': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    default:
      return state;
  }
};

export const diagramInitialState = {
  isDraggingConnection: false,
  nodes: [] as any[],
};

export const DiagramContext = createContext({});
export const Diagram: React.FC<DiagramProps> = ({ children, width, height }) => {
  const [state, dispatch] = useReducer(diagramReducer, diagramInitialState);
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );
  console.log(contextValue);

  return (
    <DiagramContext.Provider value={contextValue}>
      <Wrapper width={width} height={height}>
        {children}
      </Wrapper>
    </DiagramContext.Provider>
  );
};
