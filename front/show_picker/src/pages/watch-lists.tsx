import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import {Box, Button, IconButton, TextField } from '@mui/material';
import axios from '../config/client.ts';
import { useForm } from 'react-hook-form';
import { fetchUserWatchLists } from "../api/fetchUserWatchLists.ts";
import type { WatchList } from "../utilities/types.tsx";
import {Delete, Edit } from "@mui/icons-material";

type WatchListForm = {
    name: string;
};

export function WatchLists() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [userLists, setUserLists] = useState<Array<WatchList> | null>(null);
    const [viewUserLists, setUserViewLists] = useState<boolean>(false);

    const {
        register,
        watch,
        formState: { errors },
    } = useForm<WatchListForm>({
        mode: 'onChange',
        defaultValues: {
            name: '',
        },
    });

    const list_name = watch('name');

    useEffect(() => {
        async function viewLists() {
            return await axios
                .get('/watchlist', { withCredentials: true })
                .then((res) => setUserLists(res.data))
                .catch((err) => err.message);
        }
        viewLists();
    }, []);

    async function viewLists() {
        setUserViewLists(!viewUserLists)
        return setUserLists(await fetchUserWatchLists())
    }

    async function newWatchList(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        return await axios
            .post('/watchlist', { list_name }, { withCredentials: true })
            .then((res) => console.log(res.data))
            .catch((err) => err.message);
    }

    const initialRows = [
        { id: 1, name: 'Severance', year: 2023 },
        { id: 2, name: 'Silo', year: 2018 },
    ];

    const columns: GridColDef<{ id: number; name: string; year: number }>[] = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 250,
            renderCell: (params: { value: string }) => {
                return <Button>{params.value}</Button>;
            },
        },
        { field: 'year', headerName: 'Year', width: 100 },
    ];

    const [rows, setRows] = useState(initialRows);


    return (
        <Box className="register" style={{ width: '100%' }}>
            <Button onClick={() => setIsVisible(!isVisible)}>Create a watch list</Button>
            {isVisible ?
                <form
                    onSubmit={(event) => {
                        newWatchList(event);
                        setIsVisible(!isVisible);
                    }}
                >
                    <TextField
                        label="Watch list name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...register('name', {
                            required: true,
                            pattern: {
                                value: /^.{0,40}$/,
                                message: 'Max 40 characters',
                            },
                        })}
                    />
                </form>
             : []
            }
            <Button onClick={viewLists}>viewLists</Button>
            {
                viewUserLists ?
                    <Box sx={{ display: 'inline-table' }}>
                       { userLists!.map((list: WatchList, index: number) => {
                        return (
                        <Button key={list.id} sx={{ color: '#0b929b', justifyContent: 'space-between' }}>
                            {index + 1}. {list.name}
                            <IconButton sx={{mr: 1, ml: 1}}>
                                <Edit/>
                            </IconButton>
                            <IconButton>
                                <Delete/>
                            </IconButton>
                        </Button>)
                        })}
                    </Box>
                 : []
            }
            <DataGrid rows={rows} columns={columns} />
        </Box>
    );
}
