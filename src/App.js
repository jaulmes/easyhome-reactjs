import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// --- Imports personnalisés ---
import Login from "components/login"; // Votre composant de connexion
import PrivateRoute from "components/privateRoute"; // Votre composant de route privée

// --- Imports RTL supprimés ---
// import themeRTL from "assets/theme/theme-rtl"; // Supprimé
// import themeDarkRTL from "assets/theme-dark/theme-rtl"; // Supprimé
// import rtlPlugin from "stylis-plugin-rtl"; // Supprimé
// import { CacheProvider } from "@emotion/react"; // Supprimé
// import createCache from "@emotion/cache"; // Supprimé

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    // direction, // Supprimé, car forcé en LTR
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  // const [rtlCache, setRtlCache] = useState(null); // Supprimé
  const { pathname } = useLocation();

  // Vérifie si on est sur la page de login
  const isLoginPage = pathname === "/";

  // --- Cache RTL supprimé ---
  // useMemo(() => { ... }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Handle the configurator function
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body
  useEffect(() => {
    // Force la direction LTR (gauche à droite) en permanence
    document.body.setAttribute("dir", "ltr");
  }, []); // Ne s'exécute qu'une fois

  // Scroll to top when route changes
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  // Thème simplifié : choisit uniquement entre dark et light (le RTL est supprimé)
  const themeUsed = darkMode ? themeDark : theme;

  // Le CacheProvider a été retiré
  return (
    <ThemeProvider theme={themeUsed}>
      <CssBaseline />

      {/* Si ce n’est pas la page de login, on affiche le layout complet */}
      {!isLoginPage && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}

      {/* Définition des routes */}
      <Routes>
        {/* Page de login = page d’accueil */}
        <Route path="/" element={<Login />} />

        {/* Routes protégées */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              {/* Le layout (Sidenav, etc.) est géré au-dessus */}
              <Routes>
                {getRoutes(routes)}
                {/* Redirection par défaut pour les routes protégées */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </PrivateRoute>
          }
        />

        {/* Redirection par défaut (si aucune route ne correspond) */}
        {/* Note: Cette route est peut-être redondante avec la gestion de PrivateRoute */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}
