import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import { MaterialReactTable } from 'material-react-table'
import { theme } from '../tables/TableTheme'
import { LuTrash2, LuFilePenLine, LuExternalLink } from "react-icons/lu"

export default function ListOfFarmers({ onOpen, data, farmerId, loading, error }) {

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
            muiTableHeadCellProps: { sx: { '& .Mui-TableHeadCell-Content': { fontSize: '.7vw', justifyContent: 'center' } } },
            Cell: ({ row }) => (
                <Chakra.Box display='flex' justifyContent='center'>
                    <Chakra.Button mr='.5vw' bg='#EA5455' color='#E8E8E8' p='.2vw .7vw .2vw .7vw' borderRadius='.7vw' _hover={{ bg: '#fe7778' }} leftIcon={<Chakra.Icon as={LuTrash2} strokeWidth='.2vw' />} transition='.3s'>Delete</Chakra.Button>
                    <Chakra.Button mr='.5vw' bg='#495464' color='#E8E8E8' p='.2vw .7vw .2vw .7vw' borderRadius='.7vw' _hover={{ bg: '#606f84' }} leftIcon={<Chakra.Icon as={LuFilePenLine} strokeWidth='.2vw' />} transition='.3s'>Edit</Chakra.Button>
                    <Chakra.Button
                        onClick={() => {
                            farmerId(row.original.id)
                            onOpen()
                        }
                        } bg='#00ADB5' color='#E8E8E8'
                        p='.2vw .7vw .2vw .7vw' fontSize='.7vw'
                        borderRadius='.7vw' _hover={{ bg: '#00c0c8' }}
                        leftIcon={<Chakra.Icon as={LuExternalLink} strokeWidth='.2vw' />}
                        transition='.3s'>
                        View
                    </Chakra.Button>
                </Chakra.Box>
            )
        }
    ], [farmerId, onOpen])

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
                                            muiTableHeadCellProps={{ sx: { fontSize: '.7vw', color: 'black' } }}
                                            muiTableBodyCellProps={{ sx: { fontSize: '.7vw', textTransform: 'capitalize' } }}
                                            enablePagination={true}
                                            enableBottomToolbar={true}
                                            enableRowActions={false}
                                            enableColumnActions={false}
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
