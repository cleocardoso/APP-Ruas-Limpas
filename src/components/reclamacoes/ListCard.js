import { Body, Card, Text } from "native-base";
import React from "react";
import ListItens from "../List";
import CardR from "./Card";

export default function ListCard({data, emptyMessage}) {
    return (
        <ListItens
            renderItem={({ item }) =>
                <CardR item={item} />
            }
            data={data}
            empty={emptyMessage}
        />
    )
}