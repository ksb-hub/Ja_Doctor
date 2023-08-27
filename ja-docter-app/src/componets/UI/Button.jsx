import React from "react";
import styled from "styled-components"


const StyleButton = styled.div`
  padding: 8px 16px;
  box-shadow: ${props => props.shadow && '3px 3px 3px #636262'};
  font-size: ${props => `${1 + props.size}px`};
  border-width: 1px;
  background-color: ${props => props.bgcolor || '#ffffff'};
  color: ${props => props.color || '#000000'};
  border-radius: ${props => `${props.radius}px` || '25px'};
  cursor: pointer;
  &:hover {
    ${props => props.hover && `
      background-color: ${props.hoverColor || '#85420b'};
    `}
  }
`;
/**
 * 
 * @param  props 
 * 1. size (폰트사이즈)
 * 2. title (버튼안에 들어갈 글자)
 * 3. bgcolor (버튼안에 배경색)
 * 4. color (글자 색)
 * 5. onClick(클릭했을때 동작하는 함수)
 * 6. radius
 * 7. hovercolor(마우스 오버 이벤트시 바뀔 배경색)
 * 8. hover (true / false 로 비/활성화)
 * @returns 
 */
function Button(props){


    const {size, title, bgcolor, color, onClick, radius, hovercolor, shadow, hover = false} = props;
    return (
        <StyleButton 
                size = {size}
                bgcolor = {bgcolor}
                color = {color}
                radius = {radius}
                hoverColor = {hovercolor}
                onClick= {onClick}
                shadow = {shadow}
                hover = {hover}
            >{title || {title}}</StyleButton>
    )
            
}

export default Button;