import Slider from 'react-slick';
import { useRef } from 'react';
import styled from 'styled-components';
import { colors } from '@/assets/styles/theme';

export const CarouselProvider = ({ children }: { children: React.ReactNode }) => {
    const sliderRef = useRef(null);
    const setting = {
        dots: true,
        infinite: true,
        speed: 1000,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3 * 1000,
    };

    return (
        <S_Slider {...setting} ref={sliderRef}>
            {children}
        </S_Slider>
    );
};

const S_Slider = styled(Slider)`
    .slick-dots {
        .slick-active {
            button::before {
                color: ${colors.purple_light_30};
            }
        }
        button::before {
            color: ${colors.purple_light_10};
            font-size: 10px;
        }
    }
`;
