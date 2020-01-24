import React from 'react'
import Rest from '../utils/rest'
import {Link, Redirect} from 'react-router-dom'

const baseUrl = 'https://mymoney-reactjs-curso.firebaseio.com/'

const {useGet} = Rest(baseUrl)

const Meses = () => {
    const data = useGet('meses')
    //console.log(Object.keys(data.data))
    if(data.loading){
        return <span>Carregando...</span>
    }
    if(data.error && data.error === 'Permission denied'){
        return <Redirect to='/login' />
    }
    //return <pre>{JSON.stringify(data)}</pre>
    if(Object.keys(data.data).length>0){
        return(
            <table className='table'>
                <thead>
                    <tr>
                        <th>mês</th>
                        <th>Previsão entrada</th>
                        <th>Entrada</th>
                        <th>Previsão saída</th>                
                        <th>Saída</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Object
                        .keys(data.data)
                        .map(mes => {
                        return(
                            <tr key={mes}>
                                <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td> 
                                <td>{data.data[mes].previsao_entrada}</td>
                                <td>{data.data[mes].entradas}</td>
                                <td>{data.data[mes].previsao_saida}</td>
                                <td>{data.data[mes].saidas}</td>
                            </tr>
                        )
                        })
                    }

                </tbody>
            </table>
        )        
    }   
    return null
}

export default Meses