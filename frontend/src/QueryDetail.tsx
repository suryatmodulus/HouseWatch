
// @ts-nocheck
import * as React from 'react';
import { usePollingEffect } from './PageCacheHits';
import { DataGrid } from '@mui/x-data-grid';
import { Line } from '@ant-design/plots';
import { Typography } from 'antd'
import { Code } from '@mui/icons-material';
const { Text, Paragraph } = Typography



export default function CollapsibleTable({match}) {

    const [queryDetail, setQueryDetail] = React.useState([]);


    const url = `http://localhost:8000/api/analyze/${match.params.query_hash}/query_detail`

    usePollingEffect(
    async () => setQueryDetail(await fetch(url)
    .then(response => {
        return response.json()
    }
    )
    .catch(err => {
        return []
    })),
    [],
    { interval: 3000 } // optional
    )
    if(!queryDetail) return null
  return (
    <div style={{ height: 300, width: '100%', paddingTop: '5rem', marginBottom: '10rem', textAlign: 'left' }}>
        <code style={{textAlign: 'left'}}>{queryDetail.query.replace(/(\?)/g, ()=>{
            index = index + 1
            return '$'+index
        })}</code>
        {queryDetail.execution_count && <Line data={queryDetail.execution_count}
            padding='auto'
        xField='day_start'
        yField='total'
        xAxis={{tickCount: 10}}
        
        />}
    </div>
  );
}