import { Body, Card, Text } from "native-base";
import React, { useEffect } from "react";
import ListItens from "../List";
import api from '../../services/Api';
import CardReclamacaoUser from "../reclamacoes/CardReclamaçõesUser";



export default function ListReclamacoes({ data, emptyMessage }) {
    return (
        <ListItens
            renderItem={({ item }) =>
                <CardReclamacaoUser item={item} />
            }
            data={data}
            empty={<Card><Body><Text>{emptyMessage}</Text></Body></Card>}

        />
    )
}