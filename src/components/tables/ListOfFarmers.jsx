import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import { MaterialReactTable } from 'material-react-table'
import { theme } from '../tables/TableTheme'
import { useFetchFarmers } from '../../hooks/useFetchFarmers'

export default function ListOfFarmers() {

    const { data, loading, error } = useFetchFarmers()

    const renderCell = (value) => {
        return (
            <Chakra.Text color={value ? 'black' : 'gray.400'}>{value || 'N/A'}</Chakra.Text>
        )
    }

    const columns = React.useMemo(() => [
        {
            accessorKey: 'id',
            header: 'Farmer ID',
            Cell: ({ row }) => renderCell(row.original.id)
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
            Cell: ({ row }) => renderCell(row.original.firstName)
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
            Cell: ({ row }) => renderCell(row.original.lastName)
        },
        {
            accessorKey: 'suffix',
            header: 'Suffix',
            Cell: ({ row }) => renderCell(row.original.suffix)
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
            Cell: ({ row }) => renderCell(row.original.gender)
        },
        {
            accessorKey: 'civilStatus',
            header: 'Civil Status',
            Cell: ({ row }) => renderCell(row.original.civilStatus)
        },
        {
            header: 'Action',
            Cell: ({ row }) => renderCell(row.original.civilStatus)
        }
    ], [])



    return (
        <Chakra.Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center' overflow='auto'>
            {
                loading ? (
                    <Chakra.Spinner />
                ) : (
                    <>
                        {
                            error ? (
                                <Chakra.Text variant='error'>asd{error}</Chakra.Text>
                            ) : (
                                <Chakra.Box w='100%' h='100%'>
                                    <ThemeProvider theme={theme}>
                                        <MaterialReactTable
                                            columns={columns}
                                            data={data}
                                            muiTableHeadCellProps={{ sx: { fontSize: '.8vw', color: 'black' } }}
                                            muiTableBodyCellProps={{ sx: { fontSize: '.8vw', textTransform: 'capitalize' } }}
                                            muiTableBodyRowProps={{ sx: { background: 'blue', height: '2vw' } }}
                                            enablePagination={true}
                                            enableBottomToolbar={true}
                                            enableRowActions={false}
                                            initialState={{
                                                density: 'compact', pagination: { pageSize: '10' },
                                                columnVisibility: {
                                                    id: false,
                                                    firstName: true,
                                                    lastName: true,
                                                    suffix: true,
                                                    gender: true,
                                                    civilStatus: true,
                                                }
                                            }}
                                        />
                                    </ThemeProvider>
                                </Chakra.Box>
                            )
                        }
                    </>
                )
            }
        </Chakra.Box>
    )
}
