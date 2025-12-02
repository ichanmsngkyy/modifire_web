import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../assets/ModifireLOGO1.png";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Put shared styles here at the top
const NavButton = styled(Button)({
  color: "var(--text)",
  fontFamily: "Cairo",
  fontWeight: 800,
  "&:hover": {
    backgroundColor: "var(--red)",
    transform: "scale(1.05)",
  },
});

const HomeButton = styled(Button)({
  color: "var(--text)",
  backgroundColor: "var(--blackish)",
  padding: "1.2em",
  fontSize: "0.9em",
  "&:hover": {
    backgroundColor: "var(--red)",
    transform: "scale(1.05)",
  },
});

const handleOpenRegister = () => {
  setOpenLogin(false);
  setOpenRegister(true);
};

function HomePage() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { isAuthenticated, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Redirect based on user role (role is an integer: 0 = user, 1 = admin)
      if (user?.role === 1 || user?.role === "admin") {
        navigate("/modifire_web/admin", { replace: true });
      } else {
        navigate("/modifire_web/mybuilds", { replace: true });
      }
    }
  }, [isAuthenticated, loading, user, navigate]);

  if (loading) {
    // You can use a spinner from Material UI or just text
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="var(--primary)">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "var(--darkgray)", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{ bgcolor: "var(--blackish)", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            minHeight: 64,
            px: 0,
            py: 1,
            backgroundColor: "var(--blackish)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 900,
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Modifire"
              sx={{
                height: 80, // Reasonable size
                width: "auto",
                objectFit: "contain",
              }}
            />
            <Box sx={{ display: "flex", gap: 3 }}>
              <NavButton color="inherit">HOME</NavButton>
              <NavButton color="inherit">ABOUT US</NavButton>
              <NavButton color="inherit">CONTACT US</NavButton>
              <NavButton color="inherit">MODIFY</NavButton>
              <NavButton color="inherit" onClick={() => setOpenLogin(true)}>
                LOG IN / REGISTER
              </NavButton>
              <Dialog
                open={openLogin || openRegister}
                onClose={() => {
                  setOpenLogin(false);
                  setOpenRegister(false);
                }}
                BackdropProps={{
                  sx: {
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(0,0,0,0.3)",
                  },
                }}
                PaperProps={{
                  sx: {
                    boxShadow: "none",
                    outline: "none",
                    border: "none",
                    backgroundColor: "var(--darkgray)",
                    borderRadius: 2.5,
                  },
                }}
              >
                {openLogin && (
                  <LoginForm
                    onClose={() => setOpenLogin(false)}
                    onOpenRegister={() => {
                      setOpenLogin(false);
                      setOpenRegister(true);
                    }}
                  />
                )}
                {openRegister && (
                  <RegisterForm
                    onClose={() => setOpenRegister(false)}
                    onOpenLogin={() => {
                      setOpenRegister(false);
                      setOpenLogin(true);
                    }}
                  />
                )}
              </Dialog>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          pt: 8,
          pb: 4,
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "var(--darkgray)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "var(--primary)",
            mb: 2,
            lineHeight: 1.1,
            fontFamily: "Cairo",
          }}
        >
          MODIFY YOUR GUN
          <br />
          YOUR GUN{" "}
          <Box component="span" sx={{ color: "var(--red)" }}>
            YOUR RULES
          </Box>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "var(--text)",
            mb: 4,
            fontFamily: "Space Grotesk",
            fontSize: "1.2em",
          }}
        >
          Visualize your perfect firearm before you build it. Our intuitive
          platform lets you customize real-world firearms with authentic
          parts—drag, drop, and see your creation come to life in realistic
          detail.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
          <HomeButton>START NOW</HomeButton>
          <HomeButton>CONTACT US</HomeButton>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "var(--blackish)",
          py: 8,
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: 900, mx: "auto", px: 3 }}>
          <Typography
            variant="overline"
            sx={{ color: "var(--red)", fontWeight: 700, mb: 2 }}
          >
            ABOUT US
          </Typography>

          <Typography
            variant="h3"
            sx={{
              color: "var(--primary)",
              fontWeight: 700,
              mb: 6,
              borderBottom: "2px dotted var(--red)",
              pb: 2,
            }}
          >
            DISCOVER OUR COMMITMENT TO EXCELLENCE IN FIREARMS CUSTOMIZATION
          </Typography>
          {/* Left side - Description */}
          <Typography
            variant="h6"
            sx={{
              color: "var(--primary)",
              fontWeight: 800,
              mb: 2,
              fontFamily: "Cairo",
            }}
          >
            WHERE PRECISION MEETS VISUALIZATION
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text)",
              mb: 3,
              fontFamily: "Space Grotesk",
              fontWeight: 500,
            }}
          >
            At Modifire, we understand that building your ideal firearm
            shouldn't involve guesswork. Our platform combines cutting-edge
            visualization technology with comprehensive compatibility checks and
            instant pricing to give you complete control over your customization
            journey. Whether you're a competitive shooter optimizing performance
            or an enthusiast exploring tactical configurations, Modifire
            provides the tools, accuracy, and confidence you need to bring your
            vision to life.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--red)",
              color: "var(--primary)",
              fontWeight: 700,
              "&:hover": { bgcolor: "var(--darkred)" },
            }}
          >
            JOIN NOW
          </Button>
        </Box>
      </Box>

      {/* Newsletter Section */}
      <Box
        sx={{
          bgcolor: "var(--darkgray)",
          py: 6,
          minHeight: "25vh",
          display: "flex",
          justifyContents: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Box
            sx={{
              maxWidth: 700,
              mx: "auto",
              px: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "var(--primary)", fontWeight: 700, mb: 1 }}
            >
              SUBSCRIBE TO NEWSLETTER
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--text)" }}>
              Receive notifications about new customization options and platform
              improvements.
            </Typography>
          </Box>

          <Box>
            {" "}
            {/* Add sm={7} */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Box
                component="input"
                type="email"
                placeholder="Enter your Email..."
                sx={{
                  flex: 1,
                  padding: "12px 20px",
                  bgcolor: "var(--primary)",
                  borderRadius: "4px",
                  fontSize: "0.95rem",
                  minWidth: 500,
                  "&:focus": {
                    border: "solid var(--red)",
                    outline: "var(--red)",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "var(--red)",
                  color: "var(--primary)",
                  fontWeight: 700,
                  px: 4,
                  "&:hover": { bgcolor: "var(--darkred)" },
                }}
              >
                SUBSCRIBE
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "var(--blackish)", py: 6 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3 }}>
          <Grid container spacing={60} alignItems="flex-start">
            {/* Logo and Description */}
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Modifire"
                  sx={{ height: 100, width: "auto", objectFit: "contain" }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "var(--text)", mb: 2, fontSize: 20 }}
              >
                YOUR BUILD{" "}
                <Box component="span" sx={{ color: "var(--red)" }}>
                  YOUR RULES
                </Box>
              </Typography>
            </Grid>

            <Grid container spacing={10}>
              {/* Company Links */}
              <Grid item xs={6} sm={3} md={2}>
                <Typography
                  variant="h6"
                  sx={{ color: "var(--primary)", fontWeight: 700, mb: 2 }}
                >
                  COMPANY
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    Home
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    About Us
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    Services
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    Events
                  </Typography>
                </Box>
              </Grid>

              {/* Help Links */}
              <Grid item xs={6} sm={3} md={2}>
                <Typography
                  variant="h6"
                  sx={{ color: "var(--primary)", fontWeight: 700, mb: 2 }}
                >
                  HELP
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    Customer Support
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    How It Works
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    Terms & Condition
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text)",
                      cursor: "pointer",
                      "&:hover": { color: "var(--red)" },
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
