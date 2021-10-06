import { Body, Card, Text } from "native-base";
import React, { useEffect } from "react";
import ListItens from "../List";
import api from '../../services/Api';
import CardReclamacao from "./CardReclamacao";



export default function ListReclamacoes({ data, emptyMessage, isSwitch }) {

    function onToggle(status, id) {
        console.log(status, id)
        const data = {
            status_concluido: status
        }
        const params = new URLSearchParams();
        params.append('status_concluido', status);
        api.put(`/api/solicitacoes/atualizarSolicitacoes/?id=${id}`, params).then(() => {
            console.log("DEU CERTO!")
        }).catch(() => {
            console.log("DEU ERRO!")
        })
    }


    return (
        <ListItens
            renderItem={({ item }) =>
                <>
                    {isSwitch && (
                        <CardReclamacao item={item} item={item} item={item} item={item} onPress={(status) => onToggle(status, item.id)} />
                    )}
                    {!isSwitch && (
                        <CardReclamacao item={item} />
                    )}
                </>
            }
            data={data}
            empty={<Card><Body><Text>{emptyMessage}</Text></Body></Card>}

        />
    )
}