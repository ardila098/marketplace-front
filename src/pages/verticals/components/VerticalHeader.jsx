import { Spin } from "antd";
import { UPLOAD_ROUTES } from "../../../constants/uploadRoutes";
import {
    BannerContainer,
    BannerOverlay,
    BannerContent,
    IconWrapper,
    TitleSection,
    BannerTitle,
    BannerSubtitle
} from "../styles/styleVerticalPage";

const VerticalHeader = ({ dataVertical, loadingProducts, productsCount }) => {
    if (!dataVertical) return null;

    const bannerUrl = `${UPLOAD_ROUTES.verticals.banners}/${dataVertical.banner}`;
    const iconUrl = `${UPLOAD_ROUTES.verticals.icons}/${dataVertical.icon}`;

    return (
        <BannerContainer $bgImage={bannerUrl}>
            <BannerOverlay>
                <BannerContent>
                    <IconWrapper>
                        <img src={iconUrl} alt={`Icono de ${dataVertical.name}`} />
                    </IconWrapper>
                    <TitleSection>
                        <BannerTitle>{dataVertical.name}</BannerTitle>
                        <BannerSubtitle>
                            {loadingProducts
                                ? "Buscando productos..."
                                : `${productsCount} productos disponibles`}
                        </BannerSubtitle>
                    </TitleSection>
                </BannerContent>
            </BannerOverlay>
        </BannerContainer>
    );
};

export default VerticalHeader;