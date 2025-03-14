import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import { MaterialReactTable } from 'material-react-table'
import { theme } from '../tables/TableTheme'

export default function CropsPlanted({ cropFarmerCounts }) {

    const sortedData = React.useMemo(() => {
        return [...cropFarmerCounts].sort((a, b) => b.totalFarmer - a.totalFarmer)
    }, [cropFarmerCounts])

    const columns = React.useMemo(() => [
        {
            accessorKey: 'crop',
            header: 'Crop'
        },
        {
            accessorKey: 'totalFarmer',
            header: 'Total Farmer',
            muiTableHeadCellProps: { sx: { '& .Mui-TableHeadCell-Content': { fontSize: '.7vw', justifyContent: 'center' } } },
            Cell: ({ cell }) => (
                <Chakra.Box textAlign='center'>
                    {Number(cell.getValue()).toLocaleString()}
                </Chakra.Box>
            )
        }
    ], [])

    return (
        <Chakra.Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
            <Chakra.Box w='100%' h='100%'>
                <ThemeProvider theme={theme}>
                    <MaterialReactTable
                        columns={columns}
                        data={sortedData}
                        muiTableHeadCellProps={{ sx: { fontSize: '.7vw', color: 'black' } }}
                        muiTableBodyCellProps={{ sx: { fontSize: '.7vw', textTransform: 'capitalize' } }}
                        enablePagination={true}
                        enableBottomToolbar={true}
                        enableRowActions={false}
                        enableColumnActions={false}
                        muiTablePaperProps={{ sx: { display: 'flex', flexDirection: 'column', height: '100%' } }}
                        initialState={{
                            density: 'compact',
                            pagination: { pageSize: '5' }
                        }}
                    />
                </ThemeProvider>
            </Chakra.Box>
        </Chakra.Box>
    )
}