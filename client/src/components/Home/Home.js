import { StyledLink } from "../../styles/Header/Header.styled";
import { HomeWrapper } from "../../styles/Home/Home.styled";

export const Home = () => {
    return (
        <HomeWrapper>
            <h1>Welcome to LuxeLiving!</h1>
            <p>At LuxeLiving, we don’t just sell properties; we craft experiences.
                Join us in the pursuit of unparalleled luxury, where every day feels like an extraordinary indulgence.
                Your journey to finding the perfect luxury property starts here.
                Welcome to a world where your desires are our top priority.
                Welcome to LuxeLiving, where luxury meets lifestyle in the most extraordinary way.</p>
            <div>
            <StyledLink>Check the catalog</StyledLink>
            <StyledLink>Register</StyledLink>
            </div>
        </HomeWrapper>
    );
};