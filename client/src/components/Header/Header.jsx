import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "@mui/material";
import './Header.css';

const StyledApp = styled(AppBar)`
  background: #000;
  height: 70px;
  position: sticky;
  z-index: 1000;
  top:0;
`;

const Header = ({ onQueryChange }) => {
  return (
    <StyledApp position="relative">
      <Toolbar>
        <div className="search-box-container">
          &#128269;
          <input type="text" placeholder="Search..." onChange={e => onQueryChange(e.target.value)} className="search-box" />
        </div>
        <h2 style={{ margin: "auto" }}>
          Welcome to NewsApp
        </h2>
        <Link style={{ textAlign: "right", color: "#fff", height: "20px" }} href="https://github.com/user08121982/news-MERN" > About </Link>
      </Toolbar>
    </StyledApp>
  );
};

export default Header;