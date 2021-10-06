import { Body, Card, Text } from "native-base";
import React, { useEffect } from "react";
import ListItens from "../List";
import api from '../../services/Api';
import CardReclamacaoUser from "../reclamacoes/CardReclamaçõesUser";
import { useAuth } from "../../context/Auth";



export default function ListReclamacoes({ data, emptyMessage }) {
    const {deleteReclamacao} = useAuth()
    return (
        <ListItens
            renderItem={({ item }) =>
                <CardReclamacaoUser onPress={() => deleteReclamacao(item.id)} item={item} />
            }
            data={data}
            empty={<Card><Body><Text>{emptyMessage}</Text></Body></Card>}

        />
    )
}