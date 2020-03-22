import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useContainerWidth } from '../../hooks/useContainerWidth';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const Wrapper = styled.div.attrs<{coords: { x: number | string; y: number | string } }>(({coords}) => ({
  style: {
    left: coords.x,
    top: coords.y,
  } 
}))<{ selected: boolean, coords: any }>(
  ({ selected }) => ({
    userSelect: "none",
    position: 'absolute',
    cursor: selected ? 'move' : 'pointer',
    ...(selected && { outline: '2px solid blue' }),
  }),
);

export interface NodeProps {
  initialX?: number | string;
  initialY?: number | string;
}

export const Node: React.FC<NodeProps> = ({ children, initialX, initialY }) => {
  const [coords, setCoords] = useState({ x: initialX || '10%', y: initialY || '50%' });
  const [selected, setSelected] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dimensions = useContainerWidth(wrapperRef);
  useOutsideClick(wrapperRef, () => setSelected(false));

  console.log('rerendered');
  useEffect(() => {
    const ball = document.getElementById('ball');
    if (ball && selected) {
      ball.onmousedown = function (event) {
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;

        ball.style.position = 'absolute';

        moveAt(event.pageX, event.pageY);

        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX: number, pageY: number) {
          if (ball) {
            setCoords({ x: pageX - shiftX, y: pageY - shiftY });
            // ball.style.left = pageX - shiftX + 'px';
            // ball.style.top = pageY - shiftY + 'px';
          }
        }

        function onMouseMove(event: MouseEvent) {
          moveAt(event.pageX, event.pageY);
        }

        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the ball, remove unneeded handlers
        ball.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };
      };

      ball.ondragstart = function () {
        return false;
      };
    }
  }, [selected]);

  return (
    <Wrapper id="ball" ref={wrapperRef} coords={coords} selected={selected} onClick={() => setSelected(true)}>
      {children}
    </Wrapper>
  );
};
