import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const InfoBox = ({ title, cases, total }) => {
    return (
        <Card>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__info">{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
