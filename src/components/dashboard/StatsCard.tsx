import type { ElementType } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ElementType;
  color: string;
  bgColor: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: StatsCardProps) {
  return (
    <Card
      component="article"
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
        transition: "box-shadow 160ms ease, transform 160ms ease",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
          <div>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" component="p" fontWeight={800}>
              {value}
            </Typography>
          </div>
          <Avatar sx={{ bgcolor: bgColor, color, width: 48, height: 48 }}>
            <Icon />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
