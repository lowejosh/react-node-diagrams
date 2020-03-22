import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useContainerWidth } from '../../hooks/useContainerWidth';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const Wrapper = styled.div.attrs<{ coords: { x: number | string; y: number | string } }>(({ coords }) => ({
  style: {
    left: coords.x,
    top: coords.y,
  },
}))<{ selected: boolean; coords: any }>(({ selected }) => ({
  userSelect: 'none',
  position: 'absolute',
  cursor: selected ? 'move' : 'pointer',
  ...(selected && { outline: '2px solid blue' }),
}));

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
    const node = wrapperRef.current;

    if (!selected && node) {
      node.onmousedown = null
    }

    if (node && selected) {
      node.onmousedown = function (event: MouseEvent) {
        let shiftX = event.clientX - node.getBoundingClientRect().left;
        let shiftY = event.clientY - node.getBoundingClientRect().top;

        node.style.position = 'absolute';

        moveAt(event.pageX, event.pageY);

        // moves the node at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX: number, pageY: number) {
          if (node) {
            setCoords({ x: pageX - shiftX, y: pageY - shiftY });
            // node.style.left = pageX - shiftX + 'px';
            // node.style.top = pageY - shiftY + 'px';
          }
        }

        function onMouseMove(event: MouseEvent) {
          moveAt(event.pageX, event.pageY);
        }

        // move the node on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the node, remove unneeded handlers
        node.onmouseup = function () {
          document.removeEventListener('mousemove', onMouseMove);
          node.onmouseup = null;
        };
      };

      node.ondragstart = function () {
        return false;
      };
    } 

    return () => {
      if (node) {
        node.onmouseup = null;
      }
    };
  }, [selected]);

  return (
    <Wrapper id="node" ref={wrapperRef} coords={coords} selected={selected} onClick={() => setSelected(true)}>
      {children}
    </Wrapper>
  );
};
