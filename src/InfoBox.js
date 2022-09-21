import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({
    title,
    cases,
    total,
    active,
    isRed,
    infoBox__casess,
    ...props
}) {
    return (
        <Card
            className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
            }`}
            onClick={props.onClick}
        >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    <h3>{title}</h3>
                </Typography>
                <h2
                    className={`infoBox__cases ${
                        !isRed && "infoBox__cases--green"
                    }`}
                >
                    {cases}
                </h2>
                <Typography className="infoBox__total" color="textSecondary">
                    <h3>{total} Total</h3>
                </Typography>
            </CardContent>
        </Card>
    );
}

export default InfoBox;
