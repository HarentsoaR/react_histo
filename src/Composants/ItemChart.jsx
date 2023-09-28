import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/line-chart-connect-nulls-sqp96';

  render() {
    const { dataMat } = this.props;

    const data = dataMat ? dataMat.map((item, index) => {
      return {
        
        département: item.libelle_new,
        Année_de_basculement: item.date_basculement.substring(0, 4)
      };
    }): [];

    console.log(JSON.stringify(data));

    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={500} height={200} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="département" />
            <YAxis domain={[2010, 2030]} tickCount={8} />
            <Tooltip />
            <Line connectNulls type="monotone" dataKey="Année_de_basculement" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
