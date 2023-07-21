import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box sx={{ mt: "auto", pt: 6 }}>
      <IconButton
        component={Link}
        href="mailto:pierre.saumont@gmail.com"
        target="_blank"
        rel="noopener"
        color="inherit"
        aria-label="email"
      >
        <EmailIcon />
      </IconButton>
      <IconButton
        component={Link}
        href="https://github.com/ropie1981"
        target="_blank"
        rel="noopener"
        color="inherit"
        aria-label="GitHub"
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        component={Link}
        href="https://www.linkedin.com/in/pierre-saumont-87bba5182/"
        target="_blank"
        rel="noopener"
        color="inherit"
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
}
