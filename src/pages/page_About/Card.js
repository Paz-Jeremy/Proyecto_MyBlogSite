import React from 'react';
import styled from 'styled-components';

const Card = ({title, description}) => {
    return (
        <StyledWrapper>
        <div className="card-container">
            <div className="card">
                <div className="front-content">
                    <p>{title}</p>
                </div>
                <div className="content">
                    <p className="heading">{title}</p>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .card-container {
        width: 300px;
        height: 300px;
        position: relative;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        
    }

    .card {
        width: 100%;
        height: 100%;
        border-radius: inherit;
        background:rgba(248, 249, 250, 0.2);
    }

    .card .front-content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1)
    }

    .card .front-content p {
        font-size: 32px;
        font-weight: 700;
        opacity: 1;
        background: #FFF;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1)
    }

    .card .content {
        position: absolute;
        top: -2px;
        left: -2px;
        width: 101%;
        height: 101%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 10px;
        background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        color: #e8e8e8;
        padding: 20px;
        line-height: 1.5;
        border-radius: 5px;
        pointer-events: none;
        transform: translateY(-96%);
        transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .card .content .heading {
        font-size: 32px;
        font-weight: 700;
    }

    .card:hover .content {
        transform: translateY(0);
    }

    .card:hover .front-content {
        transform: translateY(30%);
    }

    .card:hover .front-content p {
        opacity: 0;
    }`;

export default Card;
