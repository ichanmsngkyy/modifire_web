import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

function GunCard({ name, category, description, base_image_url }) {
  const imagePath =
    typeof base_image_url === "string" && base_image_url.trim() !== ""
      ? base_image_url.startsWith("http")
        ? base_image_url
        : `http://localhost:3000${base_image_url}`
      : "http://localhost:3000/images/guns/placeholder.png";

  return (
    <Card>
      <CardMedia
        component="img"
        image={imagePath}
        alt={name}
        title={name}
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          maxHeight: 240,
        }}
        onError={(e) => {
          console.error(`❌ Image failed to load for ${name}`);
          console.error("Failed path:", imagePath);
          e.target.src = "http://localhost:3000/images/guns/placeholder.png";
        }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{name}</Typography>
        <Typography color="textSecondary">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

GunCard.propTypes = {
  name: PropTypes.string.isRequired,
  base_image_url: PropTypes.string,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default GunCard;
