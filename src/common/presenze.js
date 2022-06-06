import React, {Component} from "react"
import moment from 'moment';

const Presenze = ({ data, mese, anno }) => {

    let startD = moment(anno+"-"+mese+"-01");
    let endD = moment(anno+"-"+mese+"-01").add(1, 'month');

    let giorni = [startD.format('DD-MM-YYYY')]

    let currentD = startD
    while ( currentD < endD) {
        currentD = currentD.add(1, 'day');
        giorni.push(currentD.format('DD-MM-YYYY'));
    }

    const cfs = [...new Set(data.map(item => item.cf))];

    const dataForTable = [];

    cfs.forEach( cf => {
        let dip = {"cf": cf};
        data.forEach(d => {
            if(d.cf === cf){
                dip[d.data] = d.ore;
            }
        })
        dataForTable.push(dip);
    }
    );

    return (

        <table className="table" width="100%">
            <thead>
                <tr>
                    <th key='cf'>
                        Codice fiscale
                    </th>
                    {giorni.map((giorno) => <th key={giorno}> {giorno}</th>)}
                </tr>
            </thead>
            <tbody >
            {dataForTable.map( row =>
                <TableRow row={row} />
            )}
            </tbody>
        </table>

    )

}

class TableRow extends Component {
    render() {
        var row = this.props.row;
        return (
            <tr key={row.cf}>
                {Object.values(row).map(val => <td>{val}</td>)}
            </tr>
        )
    }
}

export default Presenze