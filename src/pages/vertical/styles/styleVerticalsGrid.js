import styled from 'styled-components';

export const GridCardContainer = styled.div`
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    cursor: pointer;
    height: 300px;
`;

export const GridCardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    object-position: top;
`;

export const GridCardOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px;
`;

export const GridCardIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const GridCardTitle = styled.div`
    font-weight: 600;
`;

export const GridCardExploreText = styled.div`
    font-size: 12px;
    color: #000;
`;
