import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div({
  position: 'relative',
});

export interface DiagramProps {}

export const Diagram: React.FC<DiagramProps> = ({ children }) => <Wrapper>{children}</Wrapper>;
